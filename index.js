// Функция для разбора CSV содержимого в объект
function parseCSV(content) {
    // Разделение содержимого на строки
    const lines = content.trim().split('\n');
    // Получение заголовков из первой строки
    const headers = lines[0].split(',');
    // Преобразование строк данных в объекты
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index].trim();
            return obj;
        }, {});
    });
}

// Функция для подсчета количества записей
function getCount(data) {
    return data.length;
}

// Функция для получения уникальных категорий
function getCategories(data) {
    const categories = new Set(data.map(item => item['Категория']));
    return Array.from(categories).join(', ');
}

// Функция для вычисления средней цены
function getAveragePrice(data) {
    const total = data.reduce((sum, item) => sum + parseFloat(item['Цена']), 0);
    return Math.round(total / data.length);
}

// Функция для получения блюда с минимальными и максимальными калориями
function getCaloriesExtremes(data) {
    let minDish = data[0];
    let maxDish = data[0];

    data.forEach(item => {
        if (parseInt(item['Калории']) < parseInt(minDish['Калории'])) {
            minDish = item;
        }
        if (parseInt(item['Калории']) > parseInt(maxDish['Калории'])) {
            maxDish = item;
        }
    });

    return {
        min: minDish['Название блюда'],
        max: maxDish['Название блюда'],
    };
}

// Функция для получения наиболее выгодного блюда (минимальная стоимость за грамм)
function getMostProfitableDish(data) {
    let mostProfitable = data[0];
    let bestRatio = parseFloat(mostProfitable['Цена']) / parseFloat(mostProfitable['Граммовка']);

    data.forEach(item => {
        const ratio = parseFloat(item['Цена']) / parseFloat(item['Граммовка']);
        if (ratio < bestRatio) {
            mostProfitable = item;
            bestRatio = ratio;
        }
    });

    return mostProfitable['Название блюда'];
}

// Главная функция для обработки содержимого меню
function processMenu(content) {
    // Разбор содержимого CSV в массив объектов
    const data = parseCSV(content);

    // Вывод результатов в консоль
    console.log(`Count: ${getCount(data)}`);
    console.log(`Categories: ${getCategories(data)}`);
    console.log(`Average price: ${getAveragePrice(data)}`);
    const extremes = getCaloriesExtremes(data);
    console.log(`Calories: min - ${extremes.min}, max - ${extremes.max}`);
    console.log(`Most profitable dish: ${getMostProfitableDish(data)}`);
}

// Экспорт главной функции
module.exports = processMenu;
