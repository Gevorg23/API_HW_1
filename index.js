// JSON данные
const scheduleData = [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
];

// Получение данных из Local Storage
const storedSchedule = JSON.parse(localStorage.getItem('schedule')) || scheduleData;

// Создание таблицы
function createTable() {
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ["Название", "Время", "Макс. участники", "Текущие участники", "Действия"];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    storedSchedule.forEach(item => {
        const row = table.insertRow();
        const { name, time, maxParticipants, currentParticipants } = item;

        [name, time, maxParticipants, currentParticipants].forEach((text, index) => {
            const cell = row.insertCell(index);
            cell.textContent = text;
        });

        const actionsCell = row.insertCell(4);
        const button = document.createElement('button');
        button.textContent = 'Записаться';
        button.addEventListener('click', () => handleEnroll(item));
        actionsCell.appendChild(button);

        if (currentParticipants >= maxParticipants) {
            button.disabled = true;
        }
    });

    document.body.appendChild(table);
}

// Обработчик для кнопки "Записаться"
function handleEnroll(item) {
    item.currentParticipants += 1;
    updateTable();
}

// Обновление таблицы
function updateTable() {
    // Сохранение изменений в Local Storage
    localStorage.setItem('schedule', JSON.stringify(storedSchedule));

    // Очистка и пересоздание таблицы
    const oldTable = document.querySelector('table');
    if (oldTable) {
        document.body.removeChild(oldTable);
    }
    createTable();
}

// Создание и отображение таблицы при загрузке страницы
createTable();
