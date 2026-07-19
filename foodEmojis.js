// Categorized food emoji picker data. Each category has a nav icon/label and
// a list of { emoji, name, searchOn } items:
//   - "name" is the label displayed under each emoji in the picker grid.
//   - "searchOn" is the actual term typed into the search box and passed to
//     handleScan()/handleNameSearch() when the item is tapped - same code
//     path as if the user had typed a food name themselves. It currently
//     duplicates "name" for every item, but can be edited independently to
//     point a display label at a more specific/different lookup term.
//
// Note: a couple of source entries were missing their emoji glyph or had an
// inconsistent name/emoji order; those were corrected by hand below (Bento
// Box, Dumpling, Bacon).
const FOOD_EMOJI_CATEGORIES = [
    {
        label: "Fruits",
        icon: "🍎",
        items: [
            { emoji: "🍇", name: "Grapes", searchOn: "Grapes" },
            { emoji: "🍈", name: "Melon", searchOn: "Melon" },
            { emoji: "🍉", name: "Watermelon", searchOn: "Watermelon" },
            { emoji: "🍊", name: "Tangerine", searchOn: "Tangerine" },
            { emoji: "🍋", name: "Lemon", searchOn: "Lemon" },
            { emoji: "🍋‍🟩", name: "Lime", searchOn: "Lime" },
            { emoji: "🍌", name: "Banana", searchOn: "Banana" },
            { emoji: "🍍", name: "Pineapple", searchOn: "Pineapple" },
            { emoji: "🥭", name: "Mango", searchOn: "Mango" },
            { emoji: "🍎", name: "Red Apple", searchOn: "Red Apple" },
            { emoji: "🍏", name: "Green Apple", searchOn: "Green Apple" },
            { emoji: "🍐", name: "Pear", searchOn: "Pear" },
            { emoji: "🍑", name: "Peach", searchOn: "Peach" },
            { emoji: "🍒", name: "Cherries", searchOn: "Cherries" },
            { emoji: "🍓", name: "Strawberry", searchOn: "Strawberry" },
            { emoji: "🫐", name: "Blueberries", searchOn: "Blueberries" },
            { emoji: "🥝", name: "Kiwifruit", searchOn: "Kiwifruit" },
            { emoji: "🥥", name: "Coconut", searchOn: "Coconut" },
            { emoji: "🍅", name: "Tomato", searchOn: "Tomato" },
            { emoji: "🥑", name: "Avocado", searchOn: "Avocado" }
        ]
    },
    {
        label: "Veggies+",
        icon: "🥕",
        items: [
            { emoji: "🫒", name: "Olive", searchOn: "Olive" },
            { emoji: "🍆", name: "Eggplant", searchOn: "Eggplant" },
            { emoji: "🥔", name: "Potato", searchOn: "Potato" },
            { emoji: "🍠", name: "Sweet Potato", searchOn: "Sweet Potato" },
            { emoji: "🥕", name: "Carrot", searchOn: "Carrot" },
            { emoji: "🌽", name: "Corn", searchOn: "Corn" },
            { emoji: "🌶️", name: "Hot Pepper", searchOn: "Hot Pepper" },
            { emoji: "🫑", name: "Bell Pepper", searchOn: "Bell Pepper" },
            { emoji: "🥒", name: "Cucumber", searchOn: "Cucumber" },
            { emoji: "🥬", name: "Leafy Green", searchOn: "Leafy Green" },
            { emoji: "🥦", name: "Broccoli", searchOn: "Broccoli" },
            { emoji: "🧄", name: "Garlic", searchOn: "Garlic" },
            { emoji: "🧅", name: "Onion", searchOn: "Onion" },
            { emoji: "🫚", name: "Ginger Root", searchOn: "Ginger Root" },
            { emoji: "🫛", name: "Peapod", searchOn: "Peapod" },
            { emoji: "🍄‍🟫", name: "Brown Mushroom", searchOn: "Brown Mushroom" },
            { emoji: "🫜", name: "Root Vegetable", searchOn: "Root Vegetable" },
            { emoji: "🍄", name: "Mushroom", searchOn: "Mushroom" },
            { emoji: "🥜", name: "Peanut", searchOn: "Peanut" },
            { emoji: "🫘", name: "Beans", searchOn: "Beans" },
            { emoji: "🌰", name: "Chestnut", searchOn: "Chestnut" }
        ]
    },
    {
        label: "Prepared Foods",
        icon: "🍔",
        items: [
            { emoji: "🍞", name: "Bread", searchOn: "Bread" },
            { emoji: "🥐", name: "Croissant", searchOn: "Croissant" },
            { emoji: "🥖", name: "Baguette", searchOn: "Baguette" },
            { emoji: "🫓", name: "Flatbread", searchOn: "Flatbread" },
            { emoji: "🥨", name: "Pretzel", searchOn: "Pretzel" },
            { emoji: "🥯", name: "Bagel", searchOn: "Bagel" },
            { emoji: "🥞", name: "Pancakes", searchOn: "Pancakes" },
            { emoji: "🧇", name: "Waffle", searchOn: "Waffle" },
            { emoji: "🧀", name: "Cheese", searchOn: "Cheese" },
            { emoji: "🍖", name: "Meat", searchOn: "Meat" },
            { emoji: "🍗", name: "Poultry", searchOn: "Poultry" },
            { emoji: "🐟", name: "Fish", searchOn: "Fish" },
            { emoji: "🥩", name: "Steak", searchOn: "Steak" },
            { emoji: "🥓", name: "Bacon", searchOn: "Bacon" },
            { emoji: "🍔", name: "Hamburger", searchOn: "Hamburger" },
            { emoji: "🍟", name: "French Fries", searchOn: "French Fries" },
            { emoji: "🍕", name: "Pizza", searchOn: "Pizza" },
            { emoji: "🌭", name: "Hot Dog", searchOn: "Hot Dog" },
            { emoji: "🥪", name: "Sandwich", searchOn: "Sandwich" },
            { emoji: "🌮", name: "Taco", searchOn: "Taco" },
            { emoji: "🌯", name: "Burrito", searchOn: "Burrito" },
            { emoji: "🫔", name: "Tamale", searchOn: "Tamale" },
            { emoji: "🥙", name: "Pita", searchOn: "Pita" },
            { emoji: "🧆", name: "Falafel", searchOn: "Falafel" },
            { emoji: "🥚", name: "Egg", searchOn: "Egg" },
            { emoji: "🥘", name: "Stew", searchOn: "Stew" },
            { emoji: "🫕", name: "Fondue", searchOn: "Fondue" },
            { emoji: "🥣", name: "Cereal", searchOn: "Cereal" },
            { emoji: "🥗", name: "Salad", searchOn: "Salad" },
            { emoji: "🍿", name: "Popcorn", searchOn: "Popcorn" },
            { emoji: "🧈", name: "Butter", searchOn: "Butter" },
            { emoji: "🥫", name: "Sauce", searchOn: "Sauce" }
        ]
    },
    {
        label: "Seafood",
        icon: "🦀",
        items: [
            { emoji: "🦀", name: "Crab", searchOn: "Crab" },
            { emoji: "🦞", name: "Lobster", searchOn: "Lobster" },
            { emoji: "🦐", name: "Shrimp", searchOn: "Shrimp" },
            { emoji: "🦑", name: "Squid", searchOn: "Squid" },
            { emoji: "🦪", name: "Oyster", searchOn: "Oyster" }
        ]
    },
    {
        label: "Global Dishes",
        icon: "🍜",
        items: [
            { emoji: "🍱", name: "Bento Box", searchOn: "Bento Box" },
            { emoji: "🍘", name: "Rice Cracker", searchOn: "Rice Cracker" },
            { emoji: "🍙", name: "Rice Ball", searchOn: "Rice Ball" },
            { emoji: "🍚", name: "Rice", searchOn: "Rice" },
            { emoji: "🍛", name: "Curry And Rice", searchOn: "Curry And Rice" },
            { emoji: "🍜", name: "Ramen", searchOn: "Ramen" },
            { emoji: "🍲", name: "Soup", searchOn: "Soup" },
            { emoji: "🍝", name: "Spaghetti", searchOn: "Spaghetti" },
            { emoji: "🍢", name: "Oden", searchOn: "Oden" },
            { emoji: "🍣", name: "Sushi", searchOn: "Sushi" },
            { emoji: "🍤", name: "Fried Shrimp", searchOn: "Fried Shrimp" },
            { emoji: "🍥", name: "Fish Cake", searchOn: "Fish Cake" },
            { emoji: "🥮", name: "Mooncake", searchOn: "Mooncake" },
            { emoji: "🍡", name: "Dango", searchOn: "Dango" },
            { emoji: "🥟", name: "Dumpling", searchOn: "Dumpling" },
            { emoji: "🥠", name: "Fortune Cookie", searchOn: "Fortune Cookie" },
            { emoji: "🥡", name: "Fried Rice", searchOn: "Fried Rice" }
        ]
    },
    {
        label: "Sweets & Desserts",
        icon: "🍩",
        items: [
            { emoji: "🍦", name: "Ice Cream", searchOn: "Ice Cream, soft serve, vanilla" },
            { emoji: "🍧", name: "Shaved Ice", searchOn: "Shaved Ice" },
            { emoji: "🍧", name: "Italian Ice", searchOn: "Italian Ice" },
            { emoji: "🍨", name: "Hard Ice Cream", searchOn: "Ice cream, vanilla" },
            { emoji: "🍩", name: "Doughnut", searchOn: "Doughnut, chocolate" },
            { emoji: "🍪", name: "Cookie", searchOn: "Cookie, chocolate chip" },
            { emoji: "🎂", name: "Cake", searchOn: "CAKE" },
            { emoji: "🍰", name: "Cheesecake", searchOn: "Cheesecake, plain" },
            { emoji: "🧁", name: "Cupcake", searchOn: "Cupcake" },
            { emoji: "🥧", name: "Pie", searchOn: "Pie, apple" },
            { emoji: "🍫", name: "Chocolate Bar", searchOn: "HERSHEY'S, MILK CHOCOLATE" },
            { emoji: "🍬", name: "Hard Candy", searchOn: "Candies, butterscotch" },
            { emoji: "🍭", name: "Lollipop", searchOn: "Candy, lollipop\n" },
            { emoji: "🍮", name: "Flan", searchOn: "Flan" },
            { emoji: "🍯", name: "Honey", searchOn: "Honey" }
        ]
    },
    {
        label: "Drinks",
        icon: "🍹",
        items: [
            { emoji: "🥛", name: "Milk", searchOn: "Milk, whole" },
            { emoji: "☕", name: "Coffee", searchOn: "Coffee" },
            { emoji: "🫖", name: "Tea", searchOn: "Tea" },
            { emoji: "🍵", name: "Green Tea", searchOn: "Green Tea" },
            { emoji: "🍶", name: "Sake", searchOn: "Sake" },
            { emoji: "🍾", name: "Vodka", searchOn: "Vodka" },
            { emoji: "🍷", name: "Wine", searchOn: "Wine" },
            { emoji: "🍸", name: "Martini", searchOn: "Martini" },
            { emoji: "🍹", name: "Tropical Drink", searchOn: "Tropical Drink" },
            { emoji: "🍺", name: "Beer", searchOn: "Beer" },
            { emoji: "🍻", name: "Beers", searchOn: "Beers" },
            { emoji: "🥂", name: "Champagne", searchOn: "Champagne" },
            { emoji: "🥃", name: "Whiskey", searchOn: "Whiskey" },
            { emoji: "🫗", name: "Rum", searchOn: "Rum" },
            { emoji: "🥤", name: "Soda", searchOn: "Soda" },
            { emoji: "🧋", name: "Milkshake", searchOn: "Milkshake" },
            { emoji: "🧃", name: "Juice", searchOn: "Juice" },
            { emoji: "🧉", name: "Mate", searchOn: "Mate" },
            { emoji: "🧊", name: "Ice", searchOn: "Ice" }
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
            { emoji: "🥢", name: "Chopsticks", searchOn: "Chopsticks" },
            { emoji: "🍽️", name: "Plate", searchOn: "Plate" },
            { emoji: "🍴", name: "Fork & Knife", searchOn: "Fork & Knife" },
            { emoji: "🥄", name: "Spoon", searchOn: "Spoon" },
            { emoji: "🔪", name: "Steak Knife", searchOn: "Steak Knife" },
            { emoji: "🫙", name: "Jar", searchOn: "Jar" },
            { emoji: "🏺", name: "Amphora", searchOn: "Amphora" }
        ]
    }
];
