// Categorized food emoji picker data. Each category has a nav icon/label and
// a list of { emoji, name, searchOn, portionAmount, portionUnit, descriptors }
// items:
//   - "name" is the label displayed under each emoji in the picker grid.
//   - "searchOn" is the actual term typed into the search box and passed to
//     handleScan()/handleNameSearch() when the item is tapped - same code
//     path as if the user had typed a food name themselves.
//   - "portionAmount" + "portionUnit" together describe this item's default
//     portion in whatever unit makes sense for it (e.g. 12 "fl oz", 3 "oz",
//     1 "cup") - see UNIT_TO_GRAMS below for supported units. Once a lookup
//     from this item completes, these two values pre-fill the portion-unit
//     picker in the food card, and the "Portion (g)" field gets computed
//     from them automatically (portionAmount * UNIT_TO_GRAMS[portionUnit]),
//     overriding the usual label-serving-size default.
//   - "unitGrams" (optional) covers two cases:
//     1) portionUnit is a COUNT-based unit with no universal conversion
//        factor - "each", "slice", "cookie", etc. There's no single "grams
//        per slice" that works for every food, so unitGrams gives the
//        grams-per-1-unit specific to THIS food (e.g. Egg uses portionUnit:
//        "each", unitGrams: 50 - one large egg is about 50g). The
//        portion-unit dropdown adds this as an extra option alongside the
//        standard ones.
//     2) portionUnit IS one of the standard measurable units in
//        UNIT_TO_GRAMS, but that unit's generic conversion is wrong for this
//        food. UNIT_TO_GRAMS's volume units (cup/tbsp/tsp/ml/l/fl oz) assume
//        water-like density, which is a bad assumption for something like
//        Grapes (1 cup of grapes is ~152g, not water's 236.588g/cup). In
//        this case unitGrams overrides that one standard option's
//        grams-per-unit for this food specifically, rather than adding a
//        new option.
//   - "descriptors" is a list of { label, searchOn, portionAmount,
//     portionUnit } variant entries (e.g. Milk's "Milk, whole" / "Milk,
//     reduced fat (2%)" / etc.) shown in the long-press popup for more
//     specific searches. Selecting one searches directly on its own
//     "searchOn" (each descriptor is a full search phrase in its own right,
//     not a modifier appended to the parent's name) and pre-fills its own
//     portionAmount/portionUnit the same way the parent item does. Only the
//     first MAX_DESCRIPTOR_CHOICES entries are shown, so trimming the list
//     per-item isn't required - just reorder so the most useful ones come
//     first. Currently most items still have placeholder descriptor text
//     ("" etc.) - replace with real per-food variants as needed (Milk
//     has been done as a worked example).
//
// Note: a couple of source entries were missing their emoji glyph or had an
// inconsistent name/emoji order; those were corrected by hand below (Bento
// Box, Dumpling, Bacon).
//
// PINNING searchOn TO AN EXACT USDA FOOD ("fdc-<fdcId>"):
// By default "searchOn" is a plain text phrase that goes through the normal
// ambiguous name search (USDA + Open Food Facts), which can return a whole
// list of candidates to pick through. If you already know exactly which
// USDA food you always want (e.g. you always log "Lemon, raw" and don't
// want to scroll past every other lemon entry every time), set searchOn to
// "fdc-<fdcId>" instead - e.g. "fdc-2709168". Recallorie.html detects that
// pattern and fetches that single food record directly by ID, skipping the
// results list entirely and dropping you straight into the food card ready
// to log. Find a food's fdcId via a normal search first (it's shown/cached
// per result), then hardcode it here once you know it's the right one.
// This same convention works in "descriptors" entries too.

// How many descriptor choices show in the long-press popup, at most (a
// single place to change this later, per request).
const MAX_DESCRIPTOR_CHOICES = 7;

// Grams-per-1-unit for every supported portionUnit value. Weight-based units
// (g/kg/oz/lb) are exact. Volume-based units (ml/l/fl oz/cup/tbsp/tsp) all
// assume water-like density (1 mL = 1 g) since we don't track a per-food
// density - fine for milk/coffee/soda/etc., but a real caveat for anything
// notably denser or oilier (honey, syrup, oil), where a volume portion and
// its true gram weight will diverge measurably.
const UNIT_TO_GRAMS = {
    "g": 1,
    "kg": 1000,
    "oz": 28.3495,
    "lb": 453.592,
    "ml": 1,
    "l": 1000,
    "fl oz": 29.5735,
    "cup": 236.588,
    "tbsp": 14.7868,
    "tsp": 4.92892
};

const FOOD_EMOJI_CATEGORIES = [
    {
        label: "Fruits, Veggies, &Nuts",
        icon: "🍅",
        items: [
            { emoji: "🍇", name: "Grapes", searchOn: "fdc-174683", portionAmount: 1, portionUnit: "cup", unitGrams: 152, descriptors: [
                { label: "Green Grapes", searchOn: "Grapes, green", portionAmount: 1, portionUnit: "cup", unitGrams: 152 },
                { label: "Red Grapes", searchOn: "Grapes, red", portionAmount: 1, portionUnit: "cup", unitGrams: 152 }
            ] },
            { emoji: "🍈", name: "Melons, cantaloupe", searchOn: "fdc-169092", portionAmount: 4, portionUnit: "oz", descriptors: [
                { label: "Honeydew melon", searchOn: "Honeydew melon", portionAmount: 4, portionUnit: "oz" },
                { label: "Melons, casaba", searchOn: "Melons, casaba", portionAmount: 4, portionUnit: "oz" },
                { label: "Horned melon (Kiwano)", searchOn: "Horned melon", portionAmount: 4, portionUnit: "oz" }
            ] },
            { emoji: "🍉", name: "Watermelon", searchOn: "fdc-167765", portionAmount: 1, portionUnit: "cup", unitGrams: 152, descriptors: [
            ] },
            { emoji: "🍊", name: "Orange", searchOn: "fdc-2709171", portionAmount: 1, portionUnit: "each", unitGrams: 131, descriptors: [
                { label: "Tangerine", searchOn: "fdc-169105", portionAmount: 1, portionUnit: "each", unitGrams: 88 }
            ] },
            { emoji: "🍋", name: "Lemon", searchOn: "fdc-2709168", portionAmount: 1, portionUnit: "each", unitGrams: 84, descriptors: [
                { label: "Lemon juice", searchOn: "fdc-167747", portionAmount: 1, portionUnit: "oz", unitGrams: 47 },
                { label: "Lemon peel", searchOn: "fdc-167749", portionAmount: 1, portionUnit: "oz", unitGrams: 58 }
            ] },
            { emoji: "🍋‍🟩", name: "Lime", searchOn: "fdc-168155", portionAmount: 1, portionUnit: "each", unitGrams: 67, descriptors: [
                { label: "Lime juice", searchOn: "fdc-168156", portionAmount: 1, portionUnit: "oz", unitGrams: 8 },
                { label: "Lime peel", searchOn: "fdc-168157", portionAmount: 1, portionUnit: "oz", unitGrams: 8}
            ] },
            { emoji: "🍌", name: "Banana", searchOn: "fdc-173944", portionAmount: 1, portionUnit: "each", unitGrams: 118, descriptors: [
            ] },
            { emoji: "🍍", name: "Pineapple", searchOn: "fdc-169124", portionAmount: 1, portionUnit: "cup", unitGrams: 165, descriptors: [
            ] },
            { emoji: "🥭", name: "Mango", searchOn: "fdc-169910", portionAmount: 1, portionUnit: "each", unitGrams: 207, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍎", name: "Red Apple", searchOn: "fdc-171688", portionAmount: 1, portionUnit: "each", unitGrams: 182, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 },
            ] },
            { emoji: "🍏", name: "Green Apple", searchOn: "fdc-168203", portionAmount: 1, portionUnit: "each", unitGrams: 182, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍐", name: "Pear", searchOn: "fdc-169118", portionAmount: 1, portionUnit: "each", unitGrams: 178, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍑", name: "Peach", searchOn: "fdc-169928", portionAmount: 1, portionUnit: "each", unitGrams: 150, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍒", name: "Cherries", searchOn: "fdc-2346399", portionAmount: 1, portionUnit: "cup", unitGrams: 154, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍓", name: "Strawberry", searchOn: "fdc-167762", portionAmount: 1, portionUnit: "cup", unitGrams: 152, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🫐", name: "Blueberries", searchOn: "fdc-171711", portionAmount: 1, portionUnit: "cup", unitGrams: 148, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥝", name: "Kiwifruit", searchOn: "fdc-168153", portionAmount: 1, portionUnit: "each", unitGrams: 69, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥥", name: "Coconut", searchOn: "fdc-170169", portionAmount: 1, portionUnit: "cup", unitGrams: 80, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍅", name: "Tomato", searchOn: "fdc-170457", portionAmount: 1, portionUnit: "each", unitGrams: 123, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥑", name: "Avocado", searchOn: "fdc-171705", portionAmount: 1, portionUnit: "each", unitGrams: 201, descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥔", name: "Potato", searchOn: "fdc-170093", portionAmount: 1, portionUnit: "each", unitGrams: 173, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫒", name: "Olive", searchOn: "fdc-169094", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍆", name: "Eggplant", searchOn: "fdc-169228", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍠", name: "Sweet Potato", searchOn: "fdc-168483", portionAmount: 1, portionUnit: "each", unitGrams: 114, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥕", name: "Carrot", searchOn: "fdc-170393", portionAmount: 1, portionUnit: "each", unitGrams: 61, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🌽", name: "Corn", searchOn: "fdc-169999", portionAmount: 1, portionUnit: "each", unitGrams: 90, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🌶️", name: "Hot Pepper", searchOn: "fdc-168576", portionAmount: 1, portionUnit: "each", unitGrams: 14, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫑", name: "Bell Pepper", searchOn: "fdc-170427", portionAmount: 1, portionUnit: "each", unitGrams: 119, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥒", name: "Cucumber", searchOn: "fdc-168409", portionAmount: 1, portionUnit: "cup", unitGrams: 119, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥬", name: "Leafy Green", searchOn: "fdc-168462", portionAmount: 1, portionUnit: "cup", unitGrams: 30, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥦", name: "Broccoli", searchOn: "fdc-170379", portionAmount: 1, portionUnit: "cup", unitGrams: 91, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🧄", name: "Garlic", searchOn: "fdc-169230", portionAmount: 1, portionUnit: "each", unitGrams: 3, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🧅", name: "Onion", searchOn: "fdc-170000", portionAmount: 1, portionUnit: "each", unitGrams: 110, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫚", name: "Ginger Root", searchOn: "fdc-169231", portionAmount: 1, portionUnit: "tsp", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫛", name: "Peapod", searchOn: "Peapod", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍄‍🟫", name: "Mushroom", searchOn: "Mushroom", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫜", name: "Root Vegetable", searchOn: "Root Vegetable", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍄", name: "Mushroom", searchOn: "fdc-169251", portionAmount: 1, portionUnit: "cup", unitGrams: 96, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫘", name: "Beans", searchOn: "fdc-173740", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥜", name: "Peanut", searchOn: "fdc-172430", portionAmount: 1, portionUnit: "oz", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🌰", name: "Chestnut", searchOn: "fdc-170168", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] }
        ]
    },
    {
        label: "Prepared Foods",
        icon: "🍔",
        items: [
            { emoji: "🍞", name: "Bread", searchOn: "fdc-174924", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥐", name: "Croissant", searchOn: "fdc-174987", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥖", name: "Baguette", searchOn: "fdc-174911", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫓", name: "Flatbread", searchOn: "Flatbread", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥨", name: "Pretzel", searchOn: "fdc-167555", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥯", name: "Bagel", searchOn: "fdc-167533", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥞", name: "Pancakes", searchOn: "Pancakes", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🧇", name: "Waffle", searchOn: "Waffle", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍔", name: "Hamburger", searchOn: "Hamburger", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍟", name: "French Fries", searchOn: "fdc-170698", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍕", name: "Pizza", searchOn: "Pizza", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🌭", name: "Hot Dog", searchOn: "Hot Dog", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥪", name: "Sandwich", searchOn: "Sandwich", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🌮", name: "Taco", searchOn: "Taco", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🌯", name: "Burrito", searchOn: "Burrito", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫔", name: "Tamale", searchOn: "Tamale", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥙", name: "Pita", searchOn: "Pita", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🧆", name: "Falafel", searchOn: "Falafel", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥘", name: "Stew", searchOn: "Stew", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🫕", name: "Fondue", searchOn: "Fondue", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥣", name: "Cereal", searchOn: "Cereal", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥗", name: "Salad", searchOn: "Salad", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍿", name: "Popcorn", searchOn: "fdc-167959", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥫", name: "Sauce", searchOn: "Sauce", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] }
        ]
    },
    {
        label: "Farm",
        icon: "🥩",
        items: [
            { emoji: "🐄", name: "Beef", searchOn: "Ground Beef", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🦌", name: "Elk & Deer", searchOn: "Venison", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "Venison", searchOn: "Venison", portionAmount: 8, portionUnit: "oz", unitGrams: 237 },
                    { label: "elk", searchOn: "Elk", portionAmount: 8, portionUnit: "oz", unitGrams: 237 }
                ] },
            { emoji: "🦬", name: "Bison", searchOn: "Bison", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🦆", name: "Duck", searchOn: "Duck", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🦃", name: "Turkey", searchOn: "Turkey", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🐔", name: "Chicken", searchOn: "Chicken", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🐖", name: "Pork", searchOn: "Pork", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🐑", name: "Mutton", searchOn: "Mutton", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🐐", name: "Chevon", searchOn: "Chevon", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍗", name: "Poultry", searchOn: "Poultry", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥩", name: "Steak", searchOn: "Steak", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🍖", name: "Meat", searchOn: "Meat", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥓", name: "Bacon", searchOn: "fdc-168322", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🧈", name: "Butter", searchOn: "Butter", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] },
            { emoji: "🥚", name: "Egg", searchOn: "Eggs, Grade A, Large, egg whole", portionAmount: 1, portionUnit: "each", unitGrams: 50, descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
                ] }
        ]
    },
    {
        label: "Seafood",
        icon: "🦀",
        items: [
            { emoji: "🐟", name: "Fish", searchOn: "Fish", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🦀", name: "Crab", searchOn: "fdc-174202", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🦞", name: "Lobster", searchOn: "fdc-174208", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🦐", name: "Shrimp", searchOn: "fdc-171971", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🐙", name: "Octopus", searchOn: "Octopus", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🦑", name: "Squid", searchOn: "fdc-172010", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🦪", name: "Oyster", searchOn: "fdc-174219", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] }
        ]
    },
    {
        label: "Global Dishes",
        icon: "🍜",
        items: [
            { emoji: "🍱", name: "Bento Box", searchOn: "Bento Box", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍘", name: "Rice Cracker", searchOn: "fdc-167967", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍙", name: "Rice Ball", searchOn: "Rice Ball", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍚", name: "Rice", searchOn: "fdc-168878", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍛", name: "Curry And Rice", searchOn: "Curry And Rice", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍜", name: "Ramen", searchOn: "Ramen", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍲", name: "Soup", searchOn: "Soup", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍝", name: "Spaghetti", searchOn: "fdc-168928", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍢", name: "Oden", searchOn: "Oden", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍣", name: "Sushi", searchOn: "Sushi", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍤", name: "Fried Shrimp", searchOn: "Fried Shrimp", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍥", name: "Fish Cake", searchOn: "Fish Cake", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥮", name: "Mooncake", searchOn: "Mooncake", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍡", name: "Dango", searchOn: "Dango", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥟", name: "Dumpling", searchOn: "Dumpling", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥠", name: "Fortune Cookie", searchOn: "fdc-172722", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥡", name: "Fried Rice", searchOn: "Fried Rice", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] }
        ]
    },
    {
        label: "Sweets& Desserts",
        icon: "🍩",
        items: [
            { emoji: "🍦", name: "Ice Cream", searchOn: "fdc-173465", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍧", name: "Shaved Ice", searchOn: "Shaved Ice", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍧", name: "Italian Ice", searchOn: "Italian Ice", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍨", name: "Hard Ice Cream", searchOn: "fdc-167575", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍩", name: "Doughnut", searchOn: "fdc-174990", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍪", name: "Cookie", searchOn: "fdc-172808", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🎂", name: "Cake", searchOn: "fdc-172697", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍰", name: "Cheesecake", searchOn: "fdc-172711", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🧁", name: "Cupcake", searchOn: "Cupcake", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥧", name: "Pie", searchOn: "fdc-173239", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍫", name: "Chocolate Bar", searchOn: "HERSHEY'S, MILK CHOCOLATE", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍬", name: "Hard Candy", searchOn: "fdc-167972", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍭", name: "Lollipop", searchOn: "Candy, lollipop", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍮", name: "Flan", searchOn: "fdc-169602", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍯", name: "Honey", searchOn: "fdc-169640", portionAmount: 1, portionUnit: "tbsp", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] }
        ]
    },
    {
        label: "Drinks",
        icon: "🍹",
        items: [
            { emoji: "💧", name: "Water", searchOn: "Water", portionAmount: 237, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 8, portionUnit: "oz", unitGrams: 237 }
            ] },
            { emoji: "☕", name: "Coffee", searchOn: "fdc-171890", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🫖", name: "Tea", searchOn: "fdc-174873", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍵", name: "Green Tea", searchOn: "fdc-171883", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥛", name: "Milk", searchOn: "fdc-170872", portionAmount: 12, portionUnit: "fl oz", descriptors: [
                    { label: "Milk, whole", searchOn: "Milk, whole", portionAmount: 12, portionUnit: "fl oz" },
                    { label: "Milk, reduced fat (2%)", searchOn: "Milk, 2%", portionAmount: 12, portionUnit: "fl oz" },
                    { label: "Milk, low fat (1%)", searchOn: "Milk, 1%", portionAmount: 12, portionUnit: "fl oz" },
                    { label: "Milk, fat free (skim)", searchOn: "Milk, skim", portionAmount: 12, portionUnit: "fl oz" },
                    { label: "Chocolate milk", searchOn: "Chocolate milk", portionAmount: 12, portionUnit: "fl oz" },
                    { label: "Strawberry Milk", searchOn: "Strawberry Milk", portionAmount: 12, portionUnit: "fl oz" },
                    { label: "Milk, evaporated", searchOn: "Milk, evaporated", portionAmount: 12, portionUnit: "fl oz" }
            ] },
            { emoji: "🥤", name: "Soda", searchOn: "Soda", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🧋", name: "Milkshake", searchOn: "Milkshake", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🧃", name: "Juice", searchOn: "Juice", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🧉", name: "Mate", searchOn: "Mate", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🧊", name: "Ice", searchOn: "Ice", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍶", name: "Sake", searchOn: "fdc-167723", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍾", name: "Vodka", searchOn: "fdc-174818", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🏺", name: "Wine", searchOn: "fdc-173185", portionAmount: 100, portionUnit: "g", descriptors: [
                    { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍷", name: "Brandy & Cognac", searchOn: "Brandy", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍸", name: "Martini", searchOn: "Martini", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍹", name: "Tropical Drink", searchOn: "Tropical Drink", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍺", name: "Beer", searchOn: "fdc-168746", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍻", name: "Craft Beer", searchOn: "fdc-174141", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥂", name: "Champagne", searchOn: "Champagne", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥃", name: "Whiskey", searchOn: "fdc-174819", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🫗", name: "Rum", searchOn: "fdc-174817", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] }
        ]
    },
    {
        // Not actually food - kept in the data for future reference, but
        // hidden from the category button row (see renderEmojiCategoryButtons
        // in Recallorie.html, which filters out any category with hidden: true).
        label: "Utensils",
        icon: "🍴",
        hidden: true,
        items: [
            { emoji: "🥢", name: "Chopsticks", searchOn: "Chopsticks", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍽️", name: "Plate", searchOn: "Plate", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🍴", name: "Fork & Knife", searchOn: "Fork & Knife", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🥄", name: "Spoon", searchOn: "Spoon", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🔪", name: "Steak Knife", searchOn: "Steak Knife", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] },
            { emoji: "🫙", name: "Jar", searchOn: "Jar", portionAmount: 100, portionUnit: "g", descriptors: [
               { label: "", searchOn: "", portionAmount: 1, portionUnit: "oz", unitGrams: 123 }
            ] }
        ]
    }
];
