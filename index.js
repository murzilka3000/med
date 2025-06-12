document.addEventListener('DOMContentLoaded', function () {
    const widget = document.querySelector('.appointments-widget');

    if (!widget) {
        return;
    }

    const tabs = widget.querySelectorAll('.tab-item');
    const tabContents = widget.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.dataset.tab;
            const targetContent = document.getElementById(targetId);

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});







// ymaps.ready(init);

// function init() {
//     const points = [
//         { coords: [55.871147, 37.662231], title: 'м. Бабушкинская' },
//         { coords: [55.642517, 37.526233], title: 'м. Беляево' },
//         { coords: [55.679780, 37.510119], title: 'м. Новаторская' },
//         { coords: [55.744953, 37.587399], title: 'м. Смоленская' },
//         { coords: [55.663116, 37.482083], title: 'м. Юго-Западная' }
//     ];

//     const myMap = new ymaps.Map("map", {
//         center: [55.75, 37.62],
//         zoom: 10,
//         controls: ['zoomControl']
//     });

//     points.forEach(point => {
//         const placemark = new ymaps.Placemark(point.coords, {
//             hintContent: point.title,
//             balloonContent: point.title
//         }, {
//             preset: 'islands#blueCircleIcon'
//         });

//         myMap.geoObjects.add(placemark);
//     });
    
//     myMap.behaviors.disable('scrollZoom');
// }


document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById('toggle-email');
    const emailField = document.getElementById('email-field');

    if (checkbox && emailField) {
        checkbox.addEventListener('change', function () {
            emailField.style.display = checkbox.checked ? 'flex' : 'none';
        });
    }
});













document.addEventListener('DOMContentLoaded', () => {
    // Находим все кнопки для открытия попапа
    const openPopupButtons = document.querySelectorAll('.open-popup');

    // Находим основные элементы попапа
    const popupOverlay = document.getElementById('popup');
    const closePopupButton = document.getElementById('popup-close');
    const allSteps = document.querySelectorAll('.popup-step');
    const popupBody = document.querySelector('.popup-body');

    // Функция для перехода к нужному шагу
    function goToStep(stepId) {
        allSteps.forEach(step => step.classList.remove('active'));
        const targetStep = document.getElementById(stepId);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }
    
    // Функция открытия попапа (упрощенная)
    function openPopup(event) {
        // Всегда начинаем с первого шага
        goToStep('step-1');
        
        // Эта часть нужна, чтобы можно было в будущем работать с ID записи,
        // но она больше не влияет на заголовок.
        const clickedButton = event.currentTarget;
        const recordId = clickedButton.dataset.recordId;
        console.log(`Открыт попап для записи с ID: ${recordId}`);

        // Активируем попап
        popupOverlay.classList.add('active');
    }

    // Функция закрытия попапа
    function closePopup() {
        popupOverlay.classList.remove('active');
    }

    // --- ОБРАБОТЧИКИ СОБЫТИЙ ---

    // Вешаем обработчик на каждую кнопку
    openPopupButtons.forEach(button => {
        button.addEventListener('click', openPopup);
    });

    // Закрытие по крестику, фону и Escape
    closePopupButton.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });

    // Навигация по шагам
    popupBody.addEventListener('click', (event) => {
        const target = event.target;
        if (target.id === 'btn-reschedule') {
            goToStep('step-2');
        }
        if (target.id === 'btn-cancel') {
            goToStep('step-cancel');
        }
        if (target.id === 'btn-confirm-cancel') {
            alert('Запись успешно отменена!');
            closePopup();
        }
        if (target.dataset.nextStep) {
            goToStep(target.dataset.nextStep);
        }
        // Удалено: обработка кнопки "Назад"
    });
});










document.addEventListener('DOMContentLoaded', () => {

        // 1. Находим все необходимые элементы в DOM
        const openMenuButton = document.getElementById('open-menu-btn');
        const closeMenuButton = document.getElementById('close-menu-btn');
        const menu = document.getElementById('menu');
        const body = document.body;
        const menuLinks = document.querySelectorAll('.menu-nav a');

        // 2. Функция для открытия меню
        function openMenu() {
            menu.classList.add('active');       // Показываем меню
            body.classList.add('body-no-scroll'); // Блокируем скролл
        }

        // 3. Функция для закрытия меню
        function closeMenu() {
            menu.classList.remove('active');     // Скрываем меню
            body.classList.remove('body-no-scroll'); // Разблокируем скролл
        }

        // 4. Навешиваем обработчики событий
        openMenuButton.addEventListener('click', openMenu);
        closeMenuButton.addEventListener('click', closeMenu);

        // Закрывать меню при нажатии на клавишу Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });

        // (Опционально, но очень удобно) Закрывать меню при клике на ссылку
        // Это полезно для одностраничных сайтов (SPA) или сайтов с якорями
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

    });