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
        icon: "🍓",
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
            { emoji: "🥑", name: "Avocado" }
        ]
    },
    {
        label: "Vegetables",
        icon: "🥕",
        items: [
            { emoji: "🍅", name: "Tomato" },
            { emoji: "🫒", name: "Olive" },
            { emoji: "🍆", name: "Eggplant" },
            { emoji: "🥔", name: "Potato" },
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
            { emoji: "🥖", name: "Baguette Bread" },
            { emoji: "🫓", name: "Flatbread" },
            { emoji: "🥨", name: "Pretzel" },
            { emoji: "🥯", name: "Bagel" },
            { emoji: "🥞", name: "Pancakes" },
            { emoji: "🧇", name: "Waffle" },
            { emoji: "🧀", name: "Cheese Wedge" },
            { emoji: "🍖", name: "Meat On Bone" },
            { emoji: "🍗", name: "Poultry Leg" },
            { emoji: "🥩", name: "Cut Of Meat" },
            { emoji: "🥓", name: "Bacon" },
            { emoji: "🍔", name: "Hamburger" },
            { emoji: "🍟", name: "French Fries" },
            { emoji: "🍕", name: "Slice Of Pizza" },
            { emoji: "🌭", name: "Hot Dog" },
            { emoji: "🥪", name: "Sandwich" },
            { emoji: "🌮", name: "Taco" },
            { emoji: "🌯", name: "Burrito" },
            { emoji: "🫔", name: "Tamale" },
            { emoji: "🥙", name: "Stuffed Flatbread" },
            { emoji: "🧆", name: "Falafel" },
            { emoji: "🥚", name: "Egg" },
            { emoji: "🍳", name: "Fried Egg" },
            { emoji: "🥘", name: "Shallow Pan Of Food" },
            { emoji: "🍲", name: "Pot Of Food" },
            { emoji: "🫕", name: "Fondue" },
            { emoji: "🥣", name: "Bowl With Spoon" },
            { emoji: "🥗", name: "Green Salad" },
            { emoji: "🍿", name: "Popcorn" },
            { emoji: "🧈", name: "Butter" },
            { emoji: "🧂", name: "Salt" },
            { emoji: "🥫", name: "Canned Food" }
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
        label: "Asian Cuisine & Specialty Dishes",
        icon: "🍜",
        items: [
            { emoji: "🍱", name: "Bento Box" },
            { emoji: "🍘", name: "Rice Cracker" },
            { emoji: "🍙", name: "Rice Ball" },
            { emoji: "🍚", name: "Cooked Rice" },
            { emoji: "🍛", name: "Curry And Rice" },
            { emoji: "🍜", name: "Ramen" },
            { emoji: "🍝", name: "Spaghetti" },
            { emoji: "🍠", name: "Roasted Sweet Potato" },
            { emoji: "🍢", name: "Oden" },
            { emoji: "🍣", name: "Sushi" },
            { emoji: "🍤", name: "Fried Shrimp" },
            { emoji: "🍥", name: "Fish Cake With Swirl Design" },
            { emoji: "🥮", name: "Mooncake" },
            { emoji: "🍡", name: "Dango" },
            { emoji: "🥟", name: "Dumpling" },
            { emoji: "🥠", name: "Fortune Cookie" },
            { emoji: "🥡", name: "Takeout Box" }
        ]
    },
    {
        label: "Sweets & Desserts",
        icon: "🍩",
        items: [
            { emoji: "🍦", name: "Soft Ice Cream" },
            { emoji: "🍧", name: "Shaved Ice" },
            { emoji: "🍨", name: "Ice Cream" },
            { emoji: "🍩", name: "Doughnut" },
            { emoji: "🍪", name: "Cookie" },
            { emoji: "🎂", name: "Birthday Cake" },
            { emoji: "🍰", name: "Shortcake" },
            { emoji: "🧁", name: "Cupcake" },
            { emoji: "🥧", name: "Pie" },
            { emoji: "🍫", name: "Chocolate Bar" },
            { emoji: "🍬", name: "Candy" },
            { emoji: "🍭", name: "Lollipop" },
            { emoji: "🍮", name: "Custard" },
            { emoji: "🍯", name: "Honey Pot" }
        ]
    },
    {
        label: "Beverages",
        icon: "🍹",
        items: [
            { emoji: "🍼", name: "Baby Bottle" },
            { emoji: "🥛", name: "Glass Of Milk" },
            { emoji: "☕", name: "Hot Beverage" },
            { emoji: "🫖", name: "Teapot" },
            { emoji: "🍵", name: "Teacup Without Handle" },
            { emoji: "🍶", name: "Sake Bottle And Cup" },
            { emoji: "🍾", name: "Bottle With Popping Cork" },
            { emoji: "🍷", name: "Wine Glass" },
            { emoji: "🍸", name: "Cocktail Glass" },
            { emoji: "🍹", name: "Tropical Drink" },
            { emoji: "🍺", name: "Beer Mug" },
            { emoji: "🍻", name: "Clinking Beer Mugs" },
            { emoji: "🥂", name: "Clinking Glasses" },
            { emoji: "🥃", name: "Tumbler Glass" },
            { emoji: "🫗", name: "Pouring Liquid" },
            { emoji: "🥤", name: "Cup With Straw" },
            { emoji: "🧋", name: "Bubble Tea" },
            { emoji: "🧃", name: "Beverage Box" },
            { emoji: "🧉", name: "Mate" },
            { emoji: "🧊", name: "Ice Cube" }
        ]
    },
    {
        // Not actually food - kept available for reference per request.
        label: "Dishware & Dining Utensils",
        icon: "🍴",
        items: [
            { emoji: "🥢", name: "Chopsticks" },
            { emoji: "🍽️", name: "Fork And Knife With Plate" },
            { emoji: "🍴", name: "Fork And Knife" },
            { emoji: "🥄", name: "Spoon" },
            { emoji: "🔪", name: "Kitchen Knife" },
            { emoji: "🫙", name: "Jar" },
            { emoji: "🏺", name: "Amphora" }
        ]
    }
];
