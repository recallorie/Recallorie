const DB_NAME = 'RecallorieDB';
const DB_VERSION = 6; // Upgraded version to support water logging and dashboard section settings
const STORE_NAME = 'food_history';
const LOG_STORE_NAME = 'daily_log';
const MEALS_STORE_NAME = 'saved_meals';
const METRICS_STORE_NAME = 'health_metrics';
const EXERCISE_STORE_NAME = 'exercise_log';
const NOTES_STORE_NAME = 'daily_notes';
const WATER_STORE_NAME = 'water_log';
const SETTINGS_STORE_NAME = 'app_settings';

let db = null;

// Initialize the database with both object stores
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const database = event.target.result;

            // 1. Barcode history store
            if (!database.objectStoreNames.contains(STORE_NAME)) {
                const store = database.createObjectStore(STORE_NAME, { keyPath: 'upc' });
                store.createIndex('description', 'description', { unique: false });
            }

            // 2. New store to keep track of daily logged meals
            if (!database.objectStoreNames.contains(LOG_STORE_NAME)) {
                const logStore = database.createObjectStore(LOG_STORE_NAME, { keyPath: 'id', autoIncrement: true });
                logStore.createIndex('dateStr', 'dateStr', { unique: false }); // Index by YYYY-MM-DD
            }

            // 3. Saved "meals" - a named bundle of already-scaled food entries
            // (same shape as a daily_log entry, minus the date) that can be
            // logged all at once with one tap, instead of one food at a time.
            if (!database.objectStoreNames.contains(MEALS_STORE_NAME)) {
                database.createObjectStore(MEALS_STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }

            // 4. Health metrics - weight, blood pressure, or a user-defined
            // custom metric, tracked per day alongside food.
            if (!database.objectStoreNames.contains(METRICS_STORE_NAME)) {
                const metricsStore = database.createObjectStore(METRICS_STORE_NAME, { keyPath: 'id', autoIncrement: true });
                metricsStore.createIndex('dateStr', 'dateStr', { unique: false });
            }

            // 5. Exercise log - one entry per workout, tracked per day.
            if (!database.objectStoreNames.contains(EXERCISE_STORE_NAME)) {
                const exerciseStore = database.createObjectStore(EXERCISE_STORE_NAME, { keyPath: 'id', autoIncrement: true });
                exerciseStore.createIndex('dateStr', 'dateStr', { unique: false });
            }

            // 6. Daily notes - free-text notes, exactly one per day, so this
            // is keyed directly by the date string rather than autoIncrement.
            if (!database.objectStoreNames.contains(NOTES_STORE_NAME)) {
                database.createObjectStore(NOTES_STORE_NAME, { keyPath: 'dateStr' });
            }

            // 7. Water intake log - one entry per glass/bottle/etc, tracked
            // per day.
            if (!database.objectStoreNames.contains(WATER_STORE_NAME)) {
                const waterStore = database.createObjectStore(WATER_STORE_NAME, { keyPath: 'id', autoIncrement: true });
                waterStore.createIndex('dateStr', 'dateStr', { unique: false });
            }

            // 8. Generic app settings - simple key/value pairs (currently
            // just the dashboard section order/visibility config).
            if (!database.objectStoreNames.contains(SETTINGS_STORE_NAME)) {
                database.createObjectStore(SETTINGS_STORE_NAME, { keyPath: 'key' });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;

            // If a NEWER tab (e.g. after this app gets updated again) tries
            // to open a higher DB version while this tab is still open, this
            // fires here first - close this tab's connection right away so
            // the new tab's upgrade can proceed immediately instead of
            // hanging in onblocked the way it just did. This is the standard
            // fix for the exact stuck-startup problem you just hit.
            db.onversionchange = () => {
                db.close();
                db = null;
                alert('Recallorie was updated in another tab. Please reload this page to keep using it.');
            };

            resolve(db);
        };

        request.onerror = (event) => reject(event.target.error);

        // Fires if another tab/window has this same site open on an older
        // DB version - that connection has to close before this one can
        // upgrade, so without this handler the request just hangs forever
        // with no error and no success, meaning nothing ever loads or saves
        // and there's no indication why. Surfacing it lets the person know
        // to close other tabs instead of just seeing everything fail.
        request.onblocked = () => {
            console.warn('IndexedDB upgrade blocked - another tab has this app open on an older version.');
            alert('Recallorie needs to update its local database, but another open tab/window of this app is blocking it. Please close any other tabs with this app open, then reload this page.');
        };
    });
}

// Formats a Date as YYYY-MM-DD using LOCAL time components (not UTC, unlike
// toISOString()). Using toISOString() here would be a real bug: logging a
// meal in the evening in US timezones could get filed under tomorrow's date
// once converted to UTC.
function toLocalDateStr(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// Save a scanned food item to the local barcode cache
function saveFoodToLocalCache(upc, foodData) {
    if (!db) return;
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const itemToSave = { upc, ...foodData, timestamp: Date.now() };
    store.put(itemToSave);
}

// Bumps a cached food's usage tally by 1 - called every time that food is
// actually logged (not just viewed), so the Quick Recall list can show and
// sort by "how often is this actually eaten" rather than just recency.
function incrementFoodUseCount(upc) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const getRequest = store.get(upc);

        getRequest.onsuccess = () => {
            const existing = getRequest.result;
            if (!existing) {
                // Nothing cached under this key (e.g. a manual-entry food
                // that was never barcode/name-cached) - nothing to tally.
                resolve(0);
                return;
            }
            const newCount = (existing.useCount || 0) + 1;
            const putRequest = store.put({ ...existing, useCount: newCount });
            putRequest.onsuccess = () => resolve(newCount);
            putRequest.onerror = () => reject(putRequest.error);
        };
        getRequest.onerror = () => reject(getRequest.error);
    });
}

// Removes a food from the local Quick Recall cache (does not touch any past
// logged meals - those live in a separate object store).
function deleteCachedFoodFromDB(upc) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(upc);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Retrieve all barcode-cached foods
function getAllCachedFoods() {
    return new Promise((resolve, reject) => {
        if (!db) return resolve([]);
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const sorted = request.result.sort((a, b) => b.timestamp - a.timestamp);
            resolve(sorted);
        };
        request.onerror = () => reject(request.error);
    });
}

// Save an eaten meal log entry to IndexedDB. mealData.loggedAtMs is the
// epoch-ms timestamp the user chose for "when eaten" (defaults to now if
// not provided). This entry is never auto-deleted, so this store is
// effectively a permanent history of every food eaten - the "how much of X
// have I eaten over time" feature can later query this same store filtered
// by description, without needing any new plumbing.
function logMealToDB(mealData) {
    return new Promise((resolve, reject) => {
        if (!db) return reject("Database not ready");
        const transaction = db.transaction([LOG_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(LOG_STORE_NAME);

        const loggedAtMs = mealData.loggedAtMs || Date.now();
        const dateStr = toLocalDateStr(new Date(loggedAtMs));

        const entry = {
            ...mealData,
            dateStr: dateStr,
            timestamp: loggedAtMs // when the food was actually eaten, not when the record was saved
        };
        delete entry.loggedAtMs; // redundant with timestamp now that it's split out

        const request = store.add(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Overwrites an existing logged entry in place (same id) - used when editing
// a portion size after the fact, e.g. changing "1 cup rice" to "200g" for
// something already logged today.
function updateLoggedMealInDB(entry) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([LOG_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(LOG_STORE_NAME);
        const request = store.put(entry);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Get log entries for a specific day
function getMealsLoggedForDate(dateStr) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve([]);
        const transaction = db.transaction([LOG_STORE_NAME], 'readonly');
        const store = transaction.objectStore(LOG_STORE_NAME);
        const index = store.index('dateStr');
        const request = index.getAll(IDBKeyRange.only(dateStr));

        request.onsuccess = () => {
            const sorted = request.result.sort((a, b) => a.timestamp - b.timestamp);
            resolve(sorted);
        };
        request.onerror = () => reject(request.error);
    });
}

// FUTURE FEATURE: full eating history across all dates, for "how much of
// food X have I eaten over time" type views. Not wired into the UI yet.
function getAllLoggedMeals() {
    return new Promise((resolve, reject) => {
        if (!db) return resolve([]);
        const transaction = db.transaction([LOG_STORE_NAME], 'readonly');
        const store = transaction.objectStore(LOG_STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const sorted = request.result.sort((a, b) => b.timestamp - a.timestamp);
            resolve(sorted);
        };
        request.onerror = () => reject(request.error);
    });
}

// Delete a logged entry from daily timeline
function deleteLoggedMealFromDB(id) {
    return new Promise((resolve, reject) => {
        if (!db) return reject();
        const transaction = db.transaction([LOG_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(LOG_STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Saves a named bundle of food items (each already in the same
// {description, brand, calories, protein, carbs, fat, portionGrams} shape as
// a daily_log entry) as a reusable "meal" - e.g. "Breakfast" = eggs + toast +
// coffee, logged all together with one tap instead of one food at a time.
function saveMealToDB(name, items) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([MEALS_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(MEALS_STORE_NAME);
        const request = store.add({ name, items, createdAt: Date.now() });

        request.onsuccess = () => resolve(request.result); // new meal's id
        request.onerror = () => reject(request.error);
    });
}

// Retrieve all saved meals, most-recently-created first.
function getAllSavedMeals() {
    return new Promise((resolve, reject) => {
        if (!db) return resolve([]);
        const transaction = db.transaction([MEALS_STORE_NAME], 'readonly');
        const store = transaction.objectStore(MEALS_STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const sorted = request.result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            resolve(sorted);
        };
        request.onerror = () => reject(request.error);
    });
}

// Deletes a saved meal (does not touch any past logged meals created from
// it - those already live independently in daily_log).
function deleteMealFromDB(id) {
    return new Promise((resolve, reject) => {
        if (!db) return reject();
        const transaction = db.transaction([MEALS_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(MEALS_STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Saves a health metric entry - weight, blood pressure, or a user-defined
// custom metric. Shape varies by type:
//   weight:         { type: 'weight', value, unit ('lb'|'kg') }
//   blood_pressure: { type: 'blood_pressure', systolic, diastolic }
//   custom:         { type: 'custom', label, value, unit (optional) }
// plus dateStr/timestamp on all of them, same convention as daily_log.
function saveMetricToDB(entry) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([METRICS_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(METRICS_STORE_NAME);
        const request = store.add(entry);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Retrieve health metrics logged on a specific day, chronological.
function getMetricsForDate(dateStr) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve([]);
        const transaction = db.transaction([METRICS_STORE_NAME], 'readonly');
        const store = transaction.objectStore(METRICS_STORE_NAME);
        const index = store.index('dateStr');
        const request = index.getAll(IDBKeyRange.only(dateStr));

        request.onsuccess = () => {
            const sorted = request.result.sort((a, b) => a.timestamp - b.timestamp);
            resolve(sorted);
        };
        request.onerror = () => reject(request.error);
    });
}

// Deletes a single health metric entry.
function deleteMetricFromDB(id) {
    return new Promise((resolve, reject) => {
        if (!db) return reject();
        const transaction = db.transaction([METRICS_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(METRICS_STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Saves an exercise log entry: { activity, emoji, durationMinutes,
// caloriesBurned (optional), dateStr, timestamp }.
function saveExerciseToDB(entry) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([EXERCISE_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(EXERCISE_STORE_NAME);
        const request = store.add(entry);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Retrieve exercise entries logged on a specific day, chronological.
function getExerciseForDate(dateStr) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve([]);
        const transaction = db.transaction([EXERCISE_STORE_NAME], 'readonly');
        const store = transaction.objectStore(EXERCISE_STORE_NAME);
        const index = store.index('dateStr');
        const request = index.getAll(IDBKeyRange.only(dateStr));

        request.onsuccess = () => {
            const sorted = request.result.sort((a, b) => a.timestamp - b.timestamp);
            resolve(sorted);
        };
        request.onerror = () => reject(request.error);
    });
}

// Deletes a single exercise log entry.
function deleteExerciseFromDB(id) {
    return new Promise((resolve, reject) => {
        if (!db) return reject();
        const transaction = db.transaction([EXERCISE_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(EXERCISE_STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Daily notes - exactly one free-text note per day, keyed directly by
// dateStr (no separate id needed, unlike the list-style stores above).
function saveNoteForDate(dateStr, text) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([NOTES_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(NOTES_STORE_NAME);
        // Empty note text just deletes the record rather than storing an
        // empty string, so a day with no notes has nothing to clean up.
        const request = text && text.trim() !== ''
            ? store.put({ dateStr, text })
            : store.delete(dateStr);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Retrieve the note for a specific day, or null if there isn't one.
function getNoteForDate(dateStr) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve(null);
        const transaction = db.transaction([NOTES_STORE_NAME], 'readonly');
        const store = transaction.objectStore(NOTES_STORE_NAME);
        const request = store.get(dateStr);

        request.onsuccess = () => resolve(request.result ? request.result.text : '');
        request.onerror = () => reject(request.error);
    });
}

// Saves a water intake entry: { amount, unit ('oz'|'cup'|'ml'|'l'), dateStr, timestamp }.
function saveWaterToDB(entry) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([WATER_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(WATER_STORE_NAME);
        const request = store.add(entry);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Retrieve water entries logged on a specific day, chronological.
function getWaterForDate(dateStr) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve([]);
        const transaction = db.transaction([WATER_STORE_NAME], 'readonly');
        const store = transaction.objectStore(WATER_STORE_NAME);
        const index = store.index('dateStr');
        const request = index.getAll(IDBKeyRange.only(dateStr));

        request.onsuccess = () => {
            const sorted = request.result.sort((a, b) => a.timestamp - b.timestamp);
            resolve(sorted);
        };
        request.onerror = () => reject(request.error);
    });
}

// Deletes a single water log entry.
function deleteWaterFromDB(id) {
    return new Promise((resolve, reject) => {
        if (!db) return reject();
        const transaction = db.transaction([WATER_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(WATER_STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Generic app settings - simple key/value storage (currently just the
// dashboard section order/visibility config, but usable for anything else
// later without needing another dedicated object store).
function saveSetting(key, value) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([SETTINGS_STORE_NAME], 'readwrite');
        const store = transaction.objectStore(SETTINGS_STORE_NAME);
        const request = store.put({ key, value });

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function getSetting(key) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve(null);
        const transaction = db.transaction([SETTINGS_STORE_NAME], 'readonly');
        const store = transaction.objectStore(SETTINGS_STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result ? request.result.value : null);
        request.onerror = () => reject(request.error);
    });
}

// ---- Generic helpers for full-database export/import/backup ----
// (Used alongside the store-specific functions above, not a replacement for
// them - these just avoid needing a bespoke getAll/clear/bulk-insert
// function for every single store when building a combined backup file.)

function getAllFromStore(storeName) {
    return new Promise((resolve, reject) => {
        if (!db) return resolve([]);
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function clearStore(storeName) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Writes records as-is, keeping their original key. Safe when the store was
// just cleared (replace mode), or for naturally-keyed stores (food_history's
// upc, daily_notes' dateStr) where overwriting a matching key on merge is
// the correct behavior - re-importing the same food or the same day's note
// should update it, not duplicate it.
function bulkPut(storeName, records) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        for (const record of records) {
            store.put(record);
        }

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}

// Re-inserts records as brand-new entries, stripping any existing
// autoIncrement id first. Used for merge mode on autoIncrement-keyed stores
// (daily_log, saved_meals, health_metrics, exercise_log, water_log) so an
// imported record can never collide with - and silently overwrite - an
// unrelated existing entry that happens to already occupy that same id.
function bulkAddStrippingId(storeName, records) {
    return new Promise((resolve, reject) => {
        if (!db) return reject('Database not ready');
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        for (const record of records) {
            const { id, ...rest } = record;
            store.add(rest);
        }

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}
