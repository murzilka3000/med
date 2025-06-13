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
    const openPopupButtons = document.querySelectorAll('.open-popup');

    const popupOverlay = document.getElementById('popup');
    const closePopupButton = document.getElementById('popup-close');
    const allSteps = document.querySelectorAll('.popup-step');
    const popupBody = document.querySelector('.popup-body');

    function goToStep(stepId) {
        allSteps.forEach(step => step.classList.remove('active'));
        const targetStep = document.getElementById(stepId);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }
    
    function openPopup(event) {
        goToStep('step-1');
        
        const clickedButton = event.currentTarget;
        const recordId = clickedButton.dataset.recordId;
        console.log(`Открыт попап для записи с ID: ${recordId}`);

        popupOverlay.classList.add('active');
    }


    function closePopup() {
        popupOverlay.classList.remove('active');
    }


    openPopupButtons.forEach(button => {
        button.addEventListener('click', openPopup);
    });

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
    });
});










document.addEventListener('DOMContentLoaded', () => {

        const openMenuButton = document.getElementById('open-menu-btn');
        const closeMenuButton = document.getElementById('close-menu-btn');
        const menu = document.getElementById('menu');
        const body = document.body;
        const menuLinks = document.querySelectorAll('.menu-nav a');

        function openMenu() {
            menu.classList.add('active');    
            body.classList.add('body-no-scroll');
        }

        function closeMenu() {
            menu.classList.remove('active');   
            body.classList.remove('body-no-scroll'); 
        }

        openMenuButton.addEventListener('click', openMenu);
        closeMenuButton.addEventListener('click', closeMenu);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

    });









document.addEventListener('DOMContentLoaded', function() {
    const tabsContainer = document.querySelector('.widget-tabs');
    const tabs = tabsContainer.querySelectorAll('.tab-item');
    
    const locationsList = document.querySelector('.locations-list');
    const mapArea = document.querySelector('.map-area');

    const contentPanels = {
        'nomap': locationsList,
        'map': mapArea
    };

    tabsContainer.addEventListener('click', function(event) {
        const clickedTab = event.target.closest('.tab-item');
        if (!clickedTab) {
            return;
        }

        event.preventDefault();

        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        clickedTab.classList.add('active');
        
        const tabId = clickedTab.getAttribute('data-tab');

        for (const key in contentPanels) {
            if (contentPanels[key]) {
                contentPanels[key].style.display = 'none';
            }
        }
        
        if (contentPanels[tabId]) {
            contentPanels[tabId].style.display = 'block';
        }
    });
    if (locationsList) {
        locationsList.style.display = 'block';
    }
    if (mapArea) {
        mapArea.style.display = 'none';
    }
});