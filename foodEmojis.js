// Categorized food emoji picker data. Each category has a nav icon/label and
// a list of { emoji, name, searchOn, gramsPortion, descriptors } items:
//   - "name" is the label displayed under each emoji in the picker grid.
//   - "searchOn" is the actual term typed into the search box and passed to
//     handleScan()/handleNameSearch() when the item is tapped - same code
//     path as if the user had typed a food name themselves.
//   - "gramsPortion" is the portion weight (in grams) that gets pre-filled
//     into the "Portion (g)" field once a lookup from this item completes,
//     overriding the usual label-serving-size default.
//   - "descriptors" is a list of variant labels (e.g. "Whole", "Skim") shown
//     in the long-press popup for more specific searches. Selecting one
//     searches on "<name>, <descriptor>" (e.g. "Milk, Skim"). Only the first
//     MAX_DESCRIPTOR_CHOICES entries are shown, so trimming the list per-item
//     isn't required - just reorder so the most useful ones come first.
//     Currently placeholder text for all items ("Descriptor #1" etc.) -
//     replace with real per-food variants as needed.
//
// Note: a couple of source entries were missing their emoji glyph or had an
// inconsistent name/emoji order; those were corrected by hand below (Bento
// Box, Dumpling, Bacon).

// How many descriptor choices show in the long-press popup, at most (a
// single place to change this later, per request).
const MAX_DESCRIPTOR_CHOICES = 7;
const FOOD_EMOJI_CATEGORIES = [
    {
        label: "Fruits",
        icon: "🍎",
        items: [
            { emoji: "🍇", name: "Grapes", searchOn: "Grapes", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍈", name: "Melon", searchOn: "Melon", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍉", name: "Watermelon", searchOn: "Watermelon", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍊", name: "Tangerine", searchOn: "Tangerine", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍋", name: "Lemon", searchOn: "Lemon", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍋‍🟩", name: "Lime", searchOn: "Lime", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍌", name: "Banana", searchOn: "Banana", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍍", name: "Pineapple", searchOn: "Pineapple", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥭", name: "Mango", searchOn: "Mango", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍎", name: "Red Apple", searchOn: "Red Apple", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍏", name: "Green Apple", searchOn: "Green Apple", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍐", name: "Pear", searchOn: "Pear", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍑", name: "Peach", searchOn: "Peach", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍒", name: "Cherries", searchOn: "Cherries", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍓", name: "Strawberry", searchOn: "Strawberry", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫐", name: "Blueberries", searchOn: "Blueberries", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥝", name: "Kiwifruit", searchOn: "Kiwifruit", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥥", name: "Coconut", searchOn: "Coconut", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍅", name: "Tomato", searchOn: "Tomato", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥑", name: "Avocado", searchOn: "Avocado", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] }
        ]
    },
    {
        label: "Veggies+",
        icon: "🥕",
        items: [
            { emoji: "🫒", name: "Olive", searchOn: "Olive", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍆", name: "Eggplant", searchOn: "Eggplant", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥔", name: "Potato", searchOn: "Potato", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍠", name: "Sweet Potato", searchOn: "Sweet Potato", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥕", name: "Carrot", searchOn: "Carrot", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🌽", name: "Corn", searchOn: "Corn", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🌶️", name: "Hot Pepper", searchOn: "Hot Pepper", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫑", name: "Bell Pepper", searchOn: "Bell Pepper", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥒", name: "Cucumber", searchOn: "Cucumber", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥬", name: "Leafy Green", searchOn: "Leafy Green", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥦", name: "Broccoli", searchOn: "Broccoli", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧄", name: "Garlic", searchOn: "Garlic", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧅", name: "Onion", searchOn: "Onion", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫚", name: "Ginger Root", searchOn: "Ginger Root", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫛", name: "Peapod", searchOn: "Peapod", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍄‍🟫", name: "Brown Mushroom", searchOn: "Brown Mushroom", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫜", name: "Root Vegetable", searchOn: "Root Vegetable", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍄", name: "Mushroom", searchOn: "Mushroom", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥜", name: "Peanut", searchOn: "Peanut", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫘", name: "Beans", searchOn: "Beans", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🌰", name: "Chestnut", searchOn: "Chestnut", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] }
        ]
    },
    {
        label: "Prepared Foods",
        icon: "🍔",
        items: [
            { emoji: "🍞", name: "Bread", searchOn: "Bread", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥐", name: "Croissant", searchOn: "Croissant", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥖", name: "Baguette", searchOn: "Baguette", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫓", name: "Flatbread", searchOn: "Flatbread", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥨", name: "Pretzel", searchOn: "Pretzel", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥯", name: "Bagel", searchOn: "Bagel", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥞", name: "Pancakes", searchOn: "Pancakes", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧇", name: "Waffle", searchOn: "Waffle", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧀", name: "Cheese", searchOn: "Cheese", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍖", name: "Meat", searchOn: "Meat", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍗", name: "Poultry", searchOn: "Poultry", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🐟", name: "Fish", searchOn: "Fish", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥩", name: "Steak", searchOn: "Steak", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥓", name: "Bacon", searchOn: "Bacon", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍔", name: "Hamburger", searchOn: "Hamburger", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍟", name: "French Fries", searchOn: "French Fries", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍕", name: "Pizza", searchOn: "Pizza", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🌭", name: "Hot Dog", searchOn: "Hot Dog", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥪", name: "Sandwich", searchOn: "Sandwich", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🌮", name: "Taco", searchOn: "Taco", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🌯", name: "Burrito", searchOn: "Burrito", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫔", name: "Tamale", searchOn: "Tamale", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥙", name: "Pita", searchOn: "Pita", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧆", name: "Falafel", searchOn: "Falafel", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥚", name: "Egg", searchOn: "Eggs, Grade A, Large, egg whole", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥘", name: "Stew", searchOn: "Stew", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫕", name: "Fondue", searchOn: "Fondue", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥣", name: "Cereal", searchOn: "Cereal", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥗", name: "Salad", searchOn: "Salad", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍿", name: "Popcorn", searchOn: "Popcorn", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧈", name: "Butter", searchOn: "Butter", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥫", name: "Sauce", searchOn: "Sauce", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] }
        ]
    },
    {
        label: "Seafood",
        icon: "🦀",
        items: [
            { emoji: "🦀", name: "Crab", searchOn: "Crab", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🦞", name: "Lobster", searchOn: "Lobster", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🦐", name: "Shrimp", searchOn: "Shrimp", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🦑", name: "Squid", searchOn: "Squid", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🦪", name: "Oyster", searchOn: "Oyster", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] }
        ]
    },
    {
        label: "Global Dishes",
        icon: "🍜",
        items: [
            { emoji: "🍱", name: "Bento Box", searchOn: "Bento Box", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍘", name: "Rice Cracker", searchOn: "Rice Cracker", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍙", name: "Rice Ball", searchOn: "Rice Ball", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍚", name: "Rice", searchOn: "Rice", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍛", name: "Curry And Rice", searchOn: "Curry And Rice", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍜", name: "Ramen", searchOn: "Ramen", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍲", name: "Soup", searchOn: "Soup", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍝", name: "Spaghetti", searchOn: "Spaghetti", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍢", name: "Oden", searchOn: "Oden", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍣", name: "Sushi", searchOn: "Sushi", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍤", name: "Fried Shrimp", searchOn: "Fried Shrimp", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍥", name: "Fish Cake", searchOn: "Fish Cake", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥮", name: "Mooncake", searchOn: "Mooncake", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍡", name: "Dango", searchOn: "Dango", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥟", name: "Dumpling", searchOn: "Dumpling", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥠", name: "Fortune Cookie", searchOn: "Fortune Cookie", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥡", name: "Fried Rice", searchOn: "Fried Rice", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] }
        ]
    },
    {
        label: "Sweets & Desserts",
        icon: "🍩",
        items: [
            { emoji: "🍦", name: "Ice Cream", searchOn: "Ice Cream, soft serve, vanilla", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍧", name: "Shaved Ice", searchOn: "Shaved Ice", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍧", name: "Italian Ice", searchOn: "Italian Ice", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍨", name: "Hard Ice Cream", searchOn: "Ice cream, vanilla", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍩", name: "Doughnut", searchOn: "Doughnut, chocolate", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍪", name: "Cookie", searchOn: "Cookie, chocolate chip", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🎂", name: "Cake", searchOn: "CAKE", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍰", name: "Cheesecake", searchOn: "Cheesecake, plain", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧁", name: "Cupcake", searchOn: "Cupcake", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥧", name: "Pie", searchOn: "Pie, apple", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍫", name: "Chocolate Bar", searchOn: "HERSHEY'S, MILK CHOCOLATE", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍬", name: "Hard Candy", searchOn: "Candies, butterscotch", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍭", name: "Lollipop", searchOn: "Candy, lollipop", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍮", name: "Flan", searchOn: "Flan", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍯", name: "Honey", searchOn: "Honey", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] }
        ]
    },
    {
        label: "Drinks",
        icon: "🍹",
        items: [
            { emoji: "🥛", name: "Milk", searchOn: "Milk, whole", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "☕", name: "Coffee", searchOn: "Coffee", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫖", name: "Tea", searchOn: "Tea", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍵", name: "Green Tea", searchOn: "Green Tea", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍶", name: "Sake", searchOn: "Sake", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍾", name: "Vodka", searchOn: "Vodka", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍷", name: "Wine", searchOn: "Wine", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍸", name: "Martini", searchOn: "Martini", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍹", name: "Tropical Drink", searchOn: "Tropical Drink", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍺", name: "Beer", searchOn: "Beer", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍻", name: "Beers", searchOn: "Beers", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥂", name: "Champagne", searchOn: "Champagne", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥃", name: "Whiskey", searchOn: "Whiskey", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫗", name: "Rum", searchOn: "Rum", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥤", name: "Soda", searchOn: "Soda", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧋", name: "Milkshake", searchOn: "Milkshake", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧃", name: "Juice", searchOn: "Juice", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧉", name: "Mate", searchOn: "Mate", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🧊", name: "Ice", searchOn: "Ice", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] }
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
            { emoji: "🥢", name: "Chopsticks", searchOn: "Chopsticks", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍽️", name: "Plate", searchOn: "Plate", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🍴", name: "Fork & Knife", searchOn: "Fork & Knife", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🥄", name: "Spoon", searchOn: "Spoon", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🔪", name: "Steak Knife", searchOn: "Steak Knife", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🫙", name: "Jar", searchOn: "Jar", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] },
            { emoji: "🏺", name: "Amphora", searchOn: "Amphora", gramsPortion: 100, descriptors: ["Descriptor #1", "Descriptor #2", "Descriptor #3", "Descriptor #4", "Descriptor #5", "Descriptor #6", "Descriptor #7"] }
        ]
    }
];
