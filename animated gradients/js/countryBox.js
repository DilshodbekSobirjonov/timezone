// Функция для создания .country-box с изменяемыми данными
function createCountryBox(cityName, imgSrc, gmtOffset) {
    // Получаем ссылку на элемент с id "second"
    var second = document.getElementById("second");

    // Создаем элемент div с классом "country-box"
    var countryBox = document.createElement("div");
    countryBox.className = "country-box";

    // Создаем элемент div с классом "country-flag" и внутренним элементом img
    var countryFlag = document.createElement("div");
    countryFlag.className = "country-flag";
    var flagImg = document.createElement("img");
    flagImg.src = imgSrc; // Устанавливаем src из параметра
    flagImg.alt = "";
    countryFlag.appendChild(flagImg);

    // Создаем элемент div с классом "country-name" и внутренним элементом h1
    var countryName = document.createElement("div");
    countryName.className = "country-name";
    var nameHeading = document.createElement("h1");
    nameHeading.textContent = cityName; // Устанавливаем название города из параметра
    countryName.appendChild(nameHeading);

    // Создаем элемент div с классом "country-time" и внутренним элементом h1
    var countryTime = document.createElement("div");
    countryTime.className = "country-time";
    var timeHeading = document.createElement("h1");
    countryTime.appendChild(timeHeading);

    // Добавляем созданные элементы в .country-box
    countryBox.appendChild(countryFlag);
    countryBox.appendChild(countryName);
    countryBox.appendChild(countryTime);

    // Добавляем .country-box в элемент с id "second"
    second.appendChild(countryBox);

    // Функция для обновления времени в .country-box
    function updateTime() {
        var currentTime = new Date();
        var gmtTime = new Date(currentTime.getTime() + gmtOffset * 60 * 60 * 1000);
        var hours = gmtTime.getUTCHours();
        var minutes = gmtTime.getUTCMinutes();
        var seconds = gmtTime.getUTCSeconds();

        // Форматируем время в "чч:мм:сс"
        var formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        timeHeading.textContent = formattedTime; // Обновляем текущее время с учетом смещения по GMT
    }

    // Вызываем updateTime при создании .country-box и устанавливаем интервал обновления
    updateTime();
    setInterval(updateTime, 1000); // Обновляем каждую секунду
}

// Пример использования функции с разными данными и смещениями
createCountryBox("Uzbekistan", "img/uzb.png", 5); // GMT+5
createCountryBox("France", "img/rus.png", 1); // GMT+1
createCountryBox("Germany", "germany-flag.jpg", 2); // GMT+2 
createCountryBox("Korea", "germany-flag.jpg", 9); // GMT+9 


// navbar

// Получаем все элементы <h4>
var menuItems = document.querySelectorAll('.navbar h4');
var hoverElement = document.querySelector('.hover');

// Добавляем обработчик события mouseover для каждого <h4>
menuItems.forEach(function(item, index) {
    item.addEventListener('mouseover', function() {
        // Получаем ширину текущего <h4> и его позицию
        var width = item.offsetWidth;
        var left = item.offsetLeft;

        // Устанавливаем ширину и позицию hover элемента
        hoverElement.style.width = width + 'px';
        hoverElement.style.left = left + 'px';

        // Добавляем класс "active" для анимации
        hoverElement.classList.add('active');
    });

    item.addEventListener('mouseout', function() {
        // Убираем класс "active" при уходе мыши с <h4>
        hoverElement.classList.remove('active');
        
        // Возвращаем .hover к первому <h4>
        var firstItem = menuItems[0];
        var width = firstItem.offsetWidth;
        var left = firstItem.offsetLeft;
        hoverElement.style.width = width + 'px';
        hoverElement.style.left = left + 'px';
    });
});

