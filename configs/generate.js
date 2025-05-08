// configs/generate-config.js
const fs = require('fs');
const path = require('path');

// 1. Загружаем исходные данные
// const home = require('./home.json');
// const catalog = require('./catalog.json');
// const { generateLargeConfig } = require('./largeDemoConfig');

const home = require("./home.json");
const login = require("./login.json");
const catalog = require("./catalog.json");
const dashboard = require("./dashboard.json");
const headerConfig = require('./components/header.json');
const footerConfig = require('./components/footer.json'); 
const heroSection = require('./components/heroSection.json'); 

const fullConfig = {
  [home.path]: {
    ...home,
    main: [
      ...home.layout,
      { ...heroSection },
    ],
    layout: [
      { ...headerConfig },
      { ...footerConfig },
    ]
  },
  [catalog.path]: {
    main: [
      ...home.layout,
    ],
    layout: [
      { ...headerConfig },
      { ...footerConfig },
    ]
  },
  [dashboard.path]: {
    ...dashboard
  },
  "/login": {
    main: login.main
  },
  "/category": {
    main: []
  }
};

// 3. Определяем путь для сохранения
const outputDir = path.join(__dirname, '../public');
const outputPath = path.join(outputDir, 'full-config.json');

// 4. Создаем папку public если её нет
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 5. Сохраняем конфиг в файл
fs.writeFileSync(
  outputPath,
  JSON.stringify(fullConfig, null, 2), // Красивое форматирование с отступами 2 пробела
  'utf-8'
);

// 6. Проверяем размер файла
const stats = fs.statSync(outputPath);
const fileSize = (stats.size / 1024 / 1024).toFixed(2); // Размер в MB

console.log(`
✅ Конфиг успешно сгенерирован!
📍 Путь: ${outputPath}
📏 Размер: ${fileSize} MB
🔄 Количество роутов: ${Object.keys(fullConfig).length}
`);

// 7. Валидация конфига (опционально)
try {
  JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
  console.log('🔍 Валидация: JSON синтаксис корректен');
} catch (e) {
  console.error('❌ Ошибка валидации JSON:', e.message);
}