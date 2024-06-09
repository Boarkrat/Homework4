const fs = require('fs');
const path = require('path');
const processMenu = require('../index');

// Чтение аргумента командной строки для пути к файлу
const filePath = process.argv[2];

if (!filePath) {
    // Вывод ошибки, если аргумент не передан
    console.error('Usage: node bin/menu.js <path-to-csv-file>');
    process.exit(1);
}

// Чтение содержимого файла
const content = fs.readFileSync(path.resolve(__dirname, '..', filePath), 'utf8');
// Вызов функции для обработки данных меню
processMenu(content);
