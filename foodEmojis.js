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
//   - "unitGrams" (optional) is only needed when portionUnit is a COUNT-based
//     unit with no universal conversion factor - "each", "slice", "cookie",
//     etc. There's no single "grams per slice" that works for every food, so
//     for these, unitGrams gives the grams-per-1-unit specific to THIS food
//     (e.g. Egg uses portionUnit: "each", unitGrams: 50 - one large egg is
//     about 50g). When portionUnit is one of the standard measurable units
//     in UNIT_TO_GRAMS (g/kg/oz/lb/ml/l/fl oz/cup/tbsp/tsp), unitGrams is
//     ignored/unnecessary. The portion-unit dropdown in the food card adds
//     this custom unit as an extra option (alongside the standard ones)
//     whenever the active food has one.
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
//     ("Desc1" etc.) - replace with real per-food variants as needed (Milk
//     has been done as a worked example).
//
// Note: a couple of source entries were missing their emoji glyph or had an
// inconsistent name/emoji order; those were corrected by hand below (Bento
// Box, Dumpling, Bacon).

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
        label: "Fruits",
        icon: "🍎",
        items: [
            { emoji: "🍇", name: "Grapes", searchOn: "Grapes", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍈", name: "Melon", searchOn: "Melon", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍉", name: "Watermelon", searchOn: "Watermelon", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍊", name: "Tangerine", searchOn: "Tangerine", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍋", name: "Lemon", searchOn: "Lemon", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍋‍🟩", name: "Lime", searchOn: "Lime", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍌", name: "Banana", searchOn: "Banana", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍍", name: "Pineapple", searchOn: "Pineapple", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥭", name: "Mango", searchOn: "Mango", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍎", name: "Red Apple", searchOn: "Red Apple", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍏", name: "Green Apple", searchOn: "Green Apple", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍐", name: "Pear", searchOn: "Pear", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍑", name: "Peach", searchOn: "Peach", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍒", name: "Cherries", searchOn: "Cherries", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍓", name: "Strawberry", searchOn: "Strawberry", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫐", name: "Blueberries", searchOn: "Blueberries", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥝", name: "Kiwifruit", searchOn: "Kiwifruit", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥥", name: "Coconut", searchOn: "Coconut", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍅", name: "Tomato", searchOn: "Tomato", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥑", name: "Avocado", searchOn: "Avocado", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] }
        ]
    },
    {
        label: "Veggies+",
        icon: "🥕",
        items: [
            { emoji: "🫒", name: "Olive", searchOn: "Olive", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍆", name: "Eggplant", searchOn: "Eggplant", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥔", name: "Potato", searchOn: "Potato", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍠", name: "Sweet Potato", searchOn: "Sweet Potato", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥕", name: "Carrot", searchOn: "Carrot", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🌽", name: "Corn", searchOn: "Corn", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🌶️", name: "Hot Pepper", searchOn: "Hot Pepper", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫑", name: "Bell Pepper", searchOn: "Bell Pepper", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥒", name: "Cucumber", searchOn: "Cucumber", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥬", name: "Leafy Green", searchOn: "Leafy Green", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥦", name: "Broccoli", searchOn: "Broccoli", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧄", name: "Garlic", searchOn: "Garlic", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧅", name: "Onion", searchOn: "Onion", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫚", name: "Ginger Root", searchOn: "Ginger Root", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫛", name: "Peapod", searchOn: "Peapod", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍄‍🟫", name: "Brown Mushroom", searchOn: "Brown Mushroom", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫜", name: "Root Vegetable", searchOn: "Root Vegetable", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍄", name: "Mushroom", searchOn: "Mushroom", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥜", name: "Peanut", searchOn: "Peanut", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫘", name: "Beans", searchOn: "Beans", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🌰", name: "Chestnut", searchOn: "Chestnut", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] }
        ]
    },
    {
        label: "Prepared Foods",
        icon: "🍔",
        items: [
            { emoji: "🍞", name: "Bread", searchOn: "Bread", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥐", name: "Croissant", searchOn: "Croissant", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥖", name: "Baguette", searchOn: "Baguette", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫓", name: "Flatbread", searchOn: "Flatbread", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥨", name: "Pretzel", searchOn: "Pretzel", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥯", name: "Bagel", searchOn: "Bagel", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥞", name: "Pancakes", searchOn: "Pancakes", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧇", name: "Waffle", searchOn: "Waffle", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧀", name: "Cheese", searchOn: "Cheese", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍖", name: "Meat", searchOn: "Meat", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍗", name: "Poultry", searchOn: "Poultry", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🐟", name: "Fish", searchOn: "Fish", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥩", name: "Steak", searchOn: "Steak", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥓", name: "Bacon", searchOn: "Bacon", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍔", name: "Hamburger", searchOn: "Hamburger", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍟", name: "French Fries", searchOn: "French Fries", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍕", name: "Pizza", searchOn: "Pizza", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🌭", name: "Hot Dog", searchOn: "Hot Dog", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥪", name: "Sandwich", searchOn: "Sandwich", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🌮", name: "Taco", searchOn: "Taco", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🌯", name: "Burrito", searchOn: "Burrito", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫔", name: "Tamale", searchOn: "Tamale", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥙", name: "Pita", searchOn: "Pita", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧆", name: "Falafel", searchOn: "Falafel", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥚", name: "Egg", searchOn: "Eggs, Grade A, Large, egg whole", portionAmount: 1, portionUnit: "each", unitGrams: 50, descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥘", name: "Stew", searchOn: "Stew", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫕", name: "Fondue", searchOn: "Fondue", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥣", name: "Cereal", searchOn: "Cereal", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥗", name: "Salad", searchOn: "Salad", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍿", name: "Popcorn", searchOn: "Popcorn", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧈", name: "Butter", searchOn: "Butter", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥫", name: "Sauce", searchOn: "Sauce", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] }
        ]
    },
    {
        label: "Seafood",
        icon: "🦀",
        items: [
            { emoji: "🦀", name: "Crab", searchOn: "Crab", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🦞", name: "Lobster", searchOn: "Lobster", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🦐", name: "Shrimp", searchOn: "Shrimp", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🦑", name: "Squid", searchOn: "Squid", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🦪", name: "Oyster", searchOn: "Oyster", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] }
        ]
    },
    {
        label: "Global Dishes",
        icon: "🍜",
        items: [
            { emoji: "🍱", name: "Bento Box", searchOn: "Bento Box", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍘", name: "Rice Cracker", searchOn: "Rice Cracker", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍙", name: "Rice Ball", searchOn: "Rice Ball", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍚", name: "Rice", searchOn: "Rice", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍛", name: "Curry And Rice", searchOn: "Curry And Rice", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍜", name: "Ramen", searchOn: "Ramen", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍲", name: "Soup", searchOn: "Soup", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍝", name: "Spaghetti", searchOn: "Spaghetti", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍢", name: "Oden", searchOn: "Oden", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍣", name: "Sushi", searchOn: "Sushi", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍤", name: "Fried Shrimp", searchOn: "Fried Shrimp", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍥", name: "Fish Cake", searchOn: "Fish Cake", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥮", name: "Mooncake", searchOn: "Mooncake", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍡", name: "Dango", searchOn: "Dango", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥟", name: "Dumpling", searchOn: "Dumpling", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥠", name: "Fortune Cookie", searchOn: "Fortune Cookie", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥡", name: "Fried Rice", searchOn: "Fried Rice", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] }
        ]
    },
    {
        label: "Sweets & Desserts",
        icon: "🍩",
        items: [
            { emoji: "🍦", name: "Ice Cream", searchOn: "Ice Cream, soft serve, vanilla", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍧", name: "Shaved Ice", searchOn: "Shaved Ice", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍧", name: "Italian Ice", searchOn: "Italian Ice", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍨", name: "Hard Ice Cream", searchOn: "Ice cream, vanilla", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍩", name: "Doughnut", searchOn: "Doughnut, chocolate", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍪", name: "Cookie", searchOn: "Cookie, chocolate chip", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🎂", name: "Cake", searchOn: "CAKE", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍰", name: "Cheesecake", searchOn: "Cheesecake, plain", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧁", name: "Cupcake", searchOn: "Cupcake", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥧", name: "Pie", searchOn: "Pie, apple", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍫", name: "Chocolate Bar", searchOn: "HERSHEY'S, MILK CHOCOLATE", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍬", name: "Hard Candy", searchOn: "Candies, butterscotch", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍭", name: "Lollipop", searchOn: "Candy, lollipop", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍮", name: "Flan", searchOn: "Flan", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍯", name: "Honey", searchOn: "Honey", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] }
        ]
    },
    {
        label: "Drinks",
        icon: "🍹",
        items: [
            { emoji: "🥛", name: "Milk", searchOn: "Milk, whole", portionAmount: 340, portionUnit: "g", descriptors: [
                { label: "Milk, whole", searchOn: "Milk, whole", portionAmount: 340, portionUnit: "g" },
                { label: "Milk, reduced fat (2%)", searchOn: "Milk, reduced fat (2%)", portionAmount: 340, portionUnit: "g" },
                { label: "Milk, low fat (1%)", searchOn: "Milk, low fat (1%)", portionAmount: 340, portionUnit: "g" },
                { label: "Milk, fat free (skim)", searchOn: "Milk, fat free (skim)", portionAmount: 340, portionUnit: "g" },
                { label: "Chocolate milk, low fat (1%)", searchOn: "Chocolate milk, low fat (1%)", portionAmount: 340, portionUnit: "g" },
                { label: "Strawberry Milk", searchOn: "Strawberry Milk", portionAmount: 340, portionUnit: "g" },
                { label: "Milk, evaporated, whole", searchOn: "Milk, evaporated, whole", portionAmount: 340, portionUnit: "g" }
            ] },
            { emoji: "☕", name: "Coffee", searchOn: "Coffee", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫖", name: "Tea", searchOn: "Tea", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍵", name: "Green Tea", searchOn: "Green Tea", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍶", name: "Sake", searchOn: "Sake", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍾", name: "Vodka", searchOn: "Vodka", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍷", name: "Wine", searchOn: "Wine", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍸", name: "Martini", searchOn: "Martini", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍹", name: "Tropical Drink", searchOn: "Tropical Drink", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍺", name: "Beer", searchOn: "Beer", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍻", name: "Beers", searchOn: "Beers", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥂", name: "Champagne", searchOn: "Champagne", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥃", name: "Whiskey", searchOn: "Whiskey", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫗", name: "Rum", searchOn: "Rum", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥤", name: "Soda", searchOn: "Soda", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧋", name: "Milkshake", searchOn: "Milkshake", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧃", name: "Juice", searchOn: "Juice", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧉", name: "Mate", searchOn: "Mate", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🧊", name: "Ice", searchOn: "Ice", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
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
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍽️", name: "Plate", searchOn: "Plate", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🍴", name: "Fork & Knife", searchOn: "Fork & Knife", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🥄", name: "Spoon", searchOn: "Spoon", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🔪", name: "Steak Knife", searchOn: "Steak Knife", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🫙", name: "Jar", searchOn: "Jar", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] },
            { emoji: "🏺", name: "Amphora", searchOn: "Amphora", portionAmount: 100, portionUnit: "g", descriptors: [
                { label: "Desc1", searchOn: "Desc1", portionAmount: 100, portionUnit: "g" },
                { label: "Desc2", searchOn: "Desc2", portionAmount: 100, portionUnit: "g" },
                { label: "Desc3", searchOn: "Desc3", portionAmount: 100, portionUnit: "g" },
                { label: "Desc4", searchOn: "Desc4", portionAmount: 100, portionUnit: "g" },
                { label: "Desc5", searchOn: "Desc5", portionAmount: 100, portionUnit: "g" },
                { label: "Desc6", searchOn: "Desc6", portionAmount: 100, portionUnit: "g" },
                { label: "Desc7", searchOn: "Desc7", portionAmount: 100, portionUnit: "g" }
            ] }
        ]
    }
];
