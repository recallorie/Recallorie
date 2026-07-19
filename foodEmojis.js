// Categorized food emoji picker data. Each category has a nav icon/label and
// a list of { emoji, name } items. "name" is what gets typed into the search
// box and passed to handleScan()/handleNameSearch() when an item is tapped -
// same code path as if the user had typed the food name themselves.
//
// Note: a couple of source entries were missing their emoji glyph or had an
// inconsistent name/emoji order; those were corrected by hand below (Bento
// Box, Dumpling, Bacon).
const FOOD_EMOJI_CATEGORIES = [
    {
        label: "Fruits",
        icon: "🍎",
        items: [
            { emoji: "🍇", name: "Grapes" },
            { emoji: "🍈", name: "Melon" },
            { emoji: "🍉", name: "Watermelon" },
            { emoji: "🍊", name: "Tangerine" },
            { emoji: "🍋", name: "Lemon" },
            { emoji: "🍋‍🟩", name: "Lime" },
            { emoji: "🍌", name: "Banana" },
            { emoji: "🍍", name: "Pineapple" },
            { emoji: "🥭", name: "Mango" },
            { emoji: "🍎", name: "Red Apple" },
            { emoji: "🍏", name: "Green Apple" },
            { emoji: "🍐", name: "Pear" },
            { emoji: "🍑", name: "Peach" },
            { emoji: "🍒", name: "Cherries" },
            { emoji: "🍓", name: "Strawberry" },
            { emoji: "🫐", name: "Blueberries" },
            { emoji: "🥝", name: "Kiwifruit" },
            { emoji: "🥥", name: "Coconut" },
            { emoji: "🍅", name: "Tomato" },
            { emoji: "🥑", name: "Avocado" }
        ]
    },
    {
        label: "Veggies+",
        icon: "🥕",
        items: [
            { emoji: "🫒", name: "Olive" },
            { emoji: "🍆", name: "Eggplant" },
            { emoji: "🥔", name: "Potato" },
            { emoji: "🍠", name: "Sweet Potato" },
            { emoji: "🥕", name: "Carrot" },
            { emoji: "🌽", name: "Corn" },
            { emoji: "🌶️", name: "Hot Pepper" },
            { emoji: "🫑", name: "Bell Pepper" },
            { emoji: "🥒", name: "Cucumber" },
            { emoji: "🥬", name: "Leafy Green" },
            { emoji: "🥦", name: "Broccoli" },
            { emoji: "🧄", name: "Garlic" },
            { emoji: "🧅", name: "Onion" },
            { emoji: "🫚", name: "Ginger Root" },
            { emoji: "🫛", name: "Peapod" },
            { emoji: "🍄‍🟫", name: "Brown Mushroom" },
            { emoji: "🫜", name: "Root Vegetable" },
            { emoji: "🍄", name: "Mushroom" },
            { emoji: "🥜", name: "Peanut" },
            { emoji: "🫘", name: "Beans" },
            { emoji: "🌰", name: "Chestnut" }
        ]
    },
    {
        label: "Prepared Foods",
        icon: "🍔",
        items: [
            { emoji: "🍞", name: "Bread" },
            { emoji: "🥐", name: "Croissant" },
            { emoji: "🥖", name: "Baguette" },
            { emoji: "🫓", name: "Flatbread" },
            { emoji: "🥨", name: "Pretzel" },
            { emoji: "🥯", name: "Bagel" },
            { emoji: "🥞", name: "Pancakes" },
            { emoji: "🧇", name: "Waffle" },
            { emoji: "🧀", name: "Cheese" },
            { emoji: "🍖", name: "Meat" },
            { emoji: "🍗", name: "Poultry" },
            { emoji: "🐟", name: "Fish" },
            { emoji: "🥩", name: "Steak" },
            { emoji: "🥓", name: "Bacon" },
            { emoji: "🍔", name: "Hamburger" },
            { emoji: "🍟", name: "French Fries" },
            { emoji: "🍕", name: "Pizza" },
            { emoji: "🌭", name: "Hot Dog" },
            { emoji: "🥪", name: "Sandwich" },
            { emoji: "🌮", name: "Taco" },
            { emoji: "🌯", name: "Burrito" },
            { emoji: "🫔", name: "Tamale" },
            { emoji: "🥙", name: "Pita" },
            { emoji: "🧆", name: "Falafel" },
            { emoji: "🥚", name: "Egg" },
            { emoji: "🥘", name: "Stew" },
            { emoji: "🫕", name: "Fondue" },
            { emoji: "🥣", name: "Cereal" },
            { emoji: "🥗", name: "Salad" },
            { emoji: "🍿", name: "Popcorn" },
            { emoji: "🧈", name: "Butter" },
            { emoji: "🥫", name: "Sauce" }
        ]
    },
    {
        label: "Seafood",
        icon: "🦀",
        items: [
            { emoji: "🦀", name: "Crab" },
            { emoji: "🦞", name: "Lobster" },
            { emoji: "🦐", name: "Shrimp" },
            { emoji: "🦑", name: "Squid" },
            { emoji: "🦪", name: "Oyster" }
        ]
    },
    {
        label: "Global Dishes",
        icon: "🍜",
        items: [
            { emoji: "🍱", name: "Bento Box" },
            { emoji: "🍘", name: "Rice Cracker" },
            { emoji: "🍙", name: "Rice Ball" },
            { emoji: "🍚", name: "Rice" },
            { emoji: "🍛", name: "Curry And Rice" },
            { emoji: "🍜", name: "Ramen" },
            { emoji: "🍲", name: "Soup" },
            { emoji: "🍝", name: "Spaghetti" },
            { emoji: "🍢", name: "Oden" },
            { emoji: "🍣", name: "Sushi" },
            { emoji: "🍤", name: "Fried Shrimp" },
            { emoji: "🍥", name: "Fish Cake" },
            { emoji: "🥮", name: "Mooncake" },
            { emoji: "🍡", name: "Dango" },
            { emoji: "🥟", name: "Dumpling" },
            { emoji: "🥠", name: "Fortune Cookie" },
            { emoji: "🥡", name: "Fried Rice" }
        ]
    },
    {
        label: "Sweets & Desserts",
        icon: "🍩",
        items: [
            { emoji: "🍦", name: "Ice Cream" },
            { emoji: "🍧", name: "Shaved Ice" },
            { emoji: "🍨", name: "Hard Ice Cream" },
            { emoji: "🍩", name: "Doughnut" },
            { emoji: "🍪", name: "Cookie" },
            { emoji: "🎂", name: "Cake" },
            { emoji: "🍰", name: "Cheesecake" },
            { emoji: "🧁", name: "Cupcake" },
            { emoji: "🥧", name: "Pie" },
            { emoji: "🍫", name: "Chocolate Bar" },
            { emoji: "🍬", name: "Hard Candy" },
            { emoji: "🍭", name: "Lollipop" },
            { emoji: "🍮", name: "Flan" },
            { emoji: "🍯", name: "Honey" }
        ]
    },
    {
        label: "Drinks",
        icon: "🍹",
        items: [
            { emoji: "🥛", name: "Milk" },
            { emoji: "☕",  name: "Coffee" },
            { emoji: "🫖", name: "Tea" },
            { emoji: "🍵", name: "Green Tea" },
            { emoji: "🍶", name: "Sake" },
            { emoji: "🍾", name: "Vodka" },
            { emoji: "🍷", name: "Wine" },
            { emoji: "🍸", name: "Martini" },
            { emoji: "🍹", name: "Tropical Drink" },
            { emoji: "🍺", name: "Beer" },
            { emoji: "🍻", name: "Beers" },
            { emoji: "🥂", name: "Champagne" },
            { emoji: "🥃", name: "Whiskey" },
            { emoji: "🫗", name: "Rum" },
            { emoji: "🥤", name: "Soda" },
            { emoji: "🧋", name: "Milkshake" },
            { emoji: "🧃", name: "Juice" },
            { emoji: "🧉", name: "Mate" },
            { emoji: "🧊", name: "Ice" }
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
            { emoji: "🥢", name: "Chopsticks" },
            { emoji: "🍽️", name: "Plate" },
            { emoji: "🍴", name: "Fork & Knife" },
            { emoji: "🥄", name: "Spoon" },
            { emoji: "🔪", name: "Steak Knife" },
            { emoji: "🫙", name: "Jar" },
            { emoji: "🏺", name: "Amphora" }
        ]
    }
];
