export type Language = 'he' | 'en' | 'ar';

export interface Translations {
  // Start Screen
  gameTitle: string;
  gameSubtitle: string;
  restaurantNameLabel: string;
  restaurantNamePlaceholder: string;
  startButton: string;
  
  // Language Selection
  selectLanguage: string;
  hebrew: string;
  english: string;
  arabic: string;
  
  // Status Bar
  money: string;
  satisfaction: string;
  inventory: string;
  
  // Customer Area
  customerArea: string;
  noCustomers: string;
  serve: string;
  notReady: string;
  
  // Kitchen Area
  kitchen: string;
  inventoryComputer: string;
  cook: string;
  collect: string;
  cooking: string;
  noStock: string;
  busy: string;
  
  // Inventory Computer
  inventoryTitle: string;
  youHave: string;
  inStock: string;
  buy: string;
  notEnoughMoney: string;
  
  // Menu Items
  hamburger: string;
  chips: string;
  sausage: string;
  juice: string;
  
  // Game Over
  gameOver: string;
  satisfactionZero: string;
  noMoneyNoStock: string;
  gameRestarting: string;
  restart: string;
  
  // Time units
  seconds: string;
  
  // Creator credit
  createdBy: string;
  creator: string;
  
  // Level system
  level: string;
  levelComplete: string;
  finalLevel: string;

  // Settings
  settings: string;
  pause: string;
  resume: string;
  volume: string;

  // Game completion
  congratulations: string;
  gameCompleted: string;
  playAgain: string;

  // Shop
  shop: string;
  shopUpgradeDescription: string;
  shopUpgradeBuy: string;
  shopUpgradePurchased: string;
  autoCooking: string;
  autoCookingDescription: string;
  autoCookingBuy: string;
  notEnoughMoney: string;
}

export const translations: Record<Language, Translations> = {
  he: {
    // Start Screen
    gameTitle: '🍽️ משחק המסעדה',
    gameSubtitle: 'נהל את המסעדה שלך בצורה מושלמת!',
    restaurantNameLabel: 'איך תרצה לקרוא למסעדה שלך?',
    restaurantNamePlaceholder: 'שם המסעדה...',
    startButton: '🚀 התחל לבשל!',
    
    // Language Selection
    selectLanguage: 'בחר שפה',
    hebrew: 'עברית',
    english: 'English',
    arabic: 'العربية',
    
    // Status Bar
    money: 'כסף',
    satisfaction: 'שביעות רצון',
    inventory: 'מלאי',
    
    // Customer Area
    customerArea: '🧍 אזור הלקוחות',
    noCustomers: 'אין לקוחות כרגע...',
    serve: '🍽️ הגש',
    notReady: '⏳ לא מוכן',
    
    // Kitchen Area
    kitchen: '🍳 המטבח',
    inventoryComputer: '🖥️ מחשב מלאי',
    cook: '🔥 בשל',
    collect: '🍽️ הגש',
    cooking: '⏳ מבשל...',
    noStock: '📦 אין מלאי',
    busy: '⏳ תפוס',
    
    // Inventory Computer
    inventoryTitle: '🖥️ מחשב המלאי',
    youHave: '💰 יש לך:',
    inStock: 'במלאי:',
    buy: 'קנה',
    notEnoughMoney: 'אין מספיק כסף',
    
    // Menu Items
    hamburger: 'המבורגר',
    chips: 'צ\'יפס',
    sausage: 'נקניקיה בלחמניה',
    juice: 'מיץ',
    
    // Game Over
    gameOver: '❌ המסעדה פשטה רגל!',
    satisfactionZero: 'שביעות הרצון הגיעה ל-0%!',
    noMoneyNoStock: 'נגמר הכסף והמלאי!',
    gameRestarting: 'המשחק מתחיל מחדש...',
    restart: '🔄 התחל מחדש',
    
    // Time units
    seconds: 'ש',
    
    // Creator credit
    createdBy: 'יוצר – GuligulT',
    creator: 'יוצר – GuligulT',
    
    // Level system
    level: 'שלב',
    levelComplete: 'שלב הושלם!',
    finalLevel: 'שלב אחרון!',

    // Settings
    settings: 'הגדרות',
    pause: 'עצור',
    resume: 'המשך',
    volume: 'עוצמת שמע',

    // Game completion
    congratulations: 'כל הכבוד!',
    gameCompleted: 'גמרת את המשחק!',
    playAgain: 'שחק מחדש',

    // Shop
    shop: 'חנות',
    shopUpgradeDescription: 'כל פעם שגומרים לקוח מקבלים מוצר רנדומלי',
    shopUpgradeBuy: 'לקניה 300₪',
    shopUpgradePurchased: 'נרכש',
    randomProduct: 'קבלת מוצר רנדומלי',
    randomProductBuy: 'לקניה 300₪',
    autoCooking: 'מבשל אוטומטי',
    autoCookingDescription: 'בשול אוטומטי לכל המוצרים במלאי',
    autoCookingBuy: 'לקניה 600₪',
    fasterCooking: 'בישול פי שתיים יותר מהר',
    fasterCookingDescription: 'בישול כל המוצרים בחצי הזמן',
    fasterCookingBuy: 'לקניה 250₪',
  },
  
  en: {
    // Start Screen
    gameTitle: '🍽️ Restaurant Game',
    gameSubtitle: 'Manage your restaurant perfectly!',
    restaurantNameLabel: 'What would you like to name your restaurant?',
    restaurantNamePlaceholder: 'Restaurant name...',
    startButton: '🚀 Start Cooking!',
    
    // Language Selection
    selectLanguage: 'Select Language',
    hebrew: 'עברית',
    english: 'English',
    arabic: 'العربية',
    
    // Status Bar
    money: 'Money',
    satisfaction: 'Satisfaction',
    inventory: 'Inventory',
    
    // Customer Area
    customerArea: '🧍 Customer Area',
    noCustomers: 'No customers right now...',
    serve: '🍽️ Serve',
    notReady: '⏳ Not Ready',
    
    // Kitchen Area
    kitchen: '🍳 Kitchen',
    inventoryComputer: '🖥️ Inventory Computer',
    cook: '🔥 Cook',
    collect: '🍽️ Serve',
    cooking: '⏳ Cooking...',
    noStock: '📦 No Stock',
    busy: '⏳ Busy',
    
    // Inventory Computer
    inventoryTitle: '🖥️ Inventory Computer',
    youHave: '💰 You have:',
    inStock: 'In stock:',
    buy: 'Buy',
    notEnoughMoney: 'Not enough money',
    
    // Menu Items
    hamburger: 'Hamburger',
    chips: 'Fries',
    sausage: 'Hot Dog',
    juice: 'Juice',
    
    // Game Over
    gameOver: '❌ Restaurant Bankrupt!',
    satisfactionZero: 'Satisfaction reached 0%!',
    noMoneyNoStock: 'Out of money and stock!',
    gameRestarting: 'Game restarting...',
    restart: '🔄 Restart',
    
    // Time units
    seconds: 's',
    
    // Creator credit
    createdBy: 'Created by – GuligulT',
    creator: 'Creator – GuligulT',
    
    // Level system
    level: 'Level',
    levelComplete: 'Level Complete!',
    finalLevel: 'Final Level!',

    // Settings
    settings: 'Settings',
    pause: 'Pause',
    resume: 'Resume',
    volume: 'Volume',

    // Game completion
    congratulations: 'Congratulations!',
    gameCompleted: 'You completed the game!',
    playAgain: 'Play Again',

    // Shop
    shop: 'Shop',
    shopUpgradeDescription: 'Each time you finish serving a customer, you receive a random item',
    shopUpgradeBuy: 'Buy for $300',
    shopUpgradePurchased: 'Purchased',
    randomProduct: 'Random Product',
    randomProductBuy: 'Buy for $300',
    autoCooking: 'Auto Cook',
    autoCookingDescription: 'Automatically cook all items in your inventory',
    autoCookingBuy: 'Buy for $600',
    fasterCooking: 'Cook 2x Faster',
    fasterCookingDescription: 'Cook all items in half the time',
    fasterCookingBuy: 'Buy for $250',
  },
  
  ar: {
    // Start Screen
    gameTitle: '🍽️ لعبة المطعم',
    gameSubtitle: 'أدر مطعمك بشكل مثالي!',
    restaurantNameLabel: 'ماذا تريد أن تسمي مطعمك؟',
    restaurantNamePlaceholder: 'اسم المطعم...',
    startButton: '🚀 ابدأ الطبخ!',
    
    // Language Selection
    selectLanguage: 'اختر اللغة',
    hebrew: 'עברית',
    english: 'English',
    arabic: 'العربية',
    
    // Status Bar
    money: 'المال',
    satisfaction: 'الرضا',
    inventory: 'المخزون',
    
    // Customer Area
    customerArea: '🧍 منطقة العملاء',
    noCustomers: 'لا يوجد عملاء الآن...',
    serve: '🍽️ قدم',
    notReady: '⏳ غير جاهز',
    
    // Kitchen Area
    kitchen: '🍳 المطبخ',
    inventoryComputer: '🖥️ كمبيوتر المخزون',
    cook: '🔥 اطبخ',
    collect: '🍽️ قدم',
    cooking: '⏳ يطبخ...',
    noStock: '📦 لا يوجد مخزون',
    busy: '⏳ مشغول',
    
    // Inventory Computer
    inventoryTitle: '🖥️ كمبيوتر المخزون',
    youHave: '💰 لديك:',
    inStock: 'في المخزون:',
    buy: 'اشتري',
    notEnoughMoney: 'لا يوجد مال كافي',
    
    // Menu Items
    hamburger: 'همبرغر',
    chips: 'بطاطس مقلية',
    sausage: 'هوت دوغ',
    juice: 'عصير',
    
    // Game Over
    gameOver: '❌ المطعم مفلس!',
    satisfactionZero: 'الرضا وصل إلى 0%!',
    noMoneyNoStock: 'نفد المال والمخزون!',
    gameRestarting: 'اللعبة تعيد البدء...',
    restart: '🔄 ابدأ من جديد',
    
    // Time units
    seconds: 'ث',
    
    // Creator credit
    createdBy: 'إنشاء – GuligulT',
    creator: 'المنشئ – GuligulT',
    
    // Level system
    level: 'مستوى',
    levelComplete: 'مستوى مكتمل!',
    finalLevel: 'المستوى الأخير!',

    // Settings
    settings: 'الإعدادات',
    pause: 'إيقاف مؤقت',
    resume: 'استئناف',
    volume: 'مستوى الصوت',

    // Game completion
    congratulations: 'تهانينا!',
    gameCompleted: 'لقد أكملت اللعبة!',
    playAgain: 'العب مرة أخرى',

    // Shop
    shop: 'متجر',
    shopUpgradeDescription: 'في كل مرة تنتهي من خدمة زبون، تحصل على منتج عشوائي',
    shopUpgradeBuy: 'للشراء 300₪',
    shopUpgradePurchased: 'تم الشراء',
    randomProduct: 'منتج عشوائي',
    randomProductBuy: 'للشراء 300₪',
    autoCooking: 'الطهي التلقائي',
    autoCookingDescription: 'طهي جميع المنتجات في مخزونك تلقائياً',
    autoCookingBuy: 'للشراء 600₪',
    fasterCooking: 'الطهي أسرع مرتين',
    fasterCookingDescription: 'طهي جميع المنتجات في نصف الوقت',
    fasterCookingBuy: 'للشراء 250₪',
  },
};