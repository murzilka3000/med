

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

    if (!tabsContainer) {
        return; 
    }

    const tabs = tabsContainer.querySelectorAll('.tab-item');
    const locationsList = document.querySelector('.locations-list');
    const mapArea = document.querySelector('.map-area');

    const contentPanels = {
        'nomap': locationsList,
        'map': mapArea
    };

    const activateTab = function(tabToActivate) {
        // Проверка, что нам вообще передали какой-то таб
        if (!tabToActivate) {
            return;
        }

        // а) Убираем класс 'active' у всех табов
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // б) Добавляем класс 'active' только нужному табу
        tabToActivate.classList.add('active');
        
        // в) Получаем ID контент-панели из data-атрибута
        const tabId = tabToActivate.getAttribute('data-tab');

        // г) Скрываем ВСЕ панели контента
        for (const key in contentPanels) {
            if (contentPanels[key]) {
                contentPanels[key].style.display = 'none';
            }
        }
        
        // д) Показываем только ту панель, которая связана с активным табом
        if (contentPanels[tabId]) {
            contentPanels[tabId].style.display = 'block';
        }
    };

    const firstVisibleTab = Array.from(tabs).find(tab => {
        return window.getComputedStyle(tab).display !== 'none';
    });

    // Активируем найденный первый видимый таб
    activateTab(firstVisibleTab);



    tabsContainer.addEventListener('click', function(event) {
        const clickedTab = event.target.closest('.tab-item');
        if (!clickedTab) {
            return;
        }

        event.preventDefault();
        
        // Просто вызываем нашу новую универсальную функцию
        activateTab(clickedTab);
    });
});










function toggleActiveClass() {
  const historyElement = document.getElementById('history');
  if (!historyElement) return; // Если элемента нет — выходим

  if (window.innerWidth <= 945) {
    historyElement.classList.add('active');
  } else {
    historyElement.classList.remove('active');
  }
}

// Проверить при загрузке страницы
toggleActiveClass();

// Проверить при изменении размера окна
window.addEventListener('resize', toggleActiveClass);


























// if (typeof ymaps !== 'undefined') {

//     // Весь ваш код, связанный с картой, теперь находится внутри этой проверки.
//     ymaps.ready(init);

//     function init() {
//         // --- Проверка: существует ли контейнер для карты? ---
//         const mapContainer = document.getElementById('map');
//         if (!mapContainer) {
//             console.warn('Элемент для карты с ID "map" не найден. Инициализация карты отменена.');
//             return;
//         }

//         // Стили и опции
//         const mapStyles = [
//             { elementType: "all", stylers: [{ saturation: -100 }, { lightness: 10 }] },
//             { elementType: "labels.text.fill", stylers: [{ color: "#333333" }] },
//             { elementType: "labels.text.stroke", stylers: [{ color: "#FFFFFF" }] },
//         ];
        
//         const customIconOptions = {
//             iconLayout: 'default#image',
//             iconImageHref: 'images/map-12.svg',
//             iconImageSize: [36, 36], 
//             iconImageOffset: [-18, -36] 
//         };

//         const myMap = new ymaps.Map('map', {
//             center: [55.755819, 37.617644],
//             zoom: 10,
//             controls: ['zoomControl']
//         }, {
//             styles: mapStyles 
//         });

//         const locationItems = document.querySelectorAll('.location-item');

//         if (locationItems.length === 0) {
//             console.log('Элементы с классом ".location-item" не найдены. Метки не будут добавлены.');
//             return;
//         }

//         const placemarksCollection = new ymaps.GeoObjectCollection(null, {
//             ...customIconOptions,
//             draggable: false 
//         });

//         const geocodePromises = [];

//         // <<< ИЗМЕНЕНИЕ: Добавляем index для создания уникального ID
//         locationItems.forEach((item, index) => {
//             const address = item.querySelector('p:nth-of-type(2)')?.textContent?.trim() ?? '';
            
//             if (!address) {
//                 console.warn('Найден .location-item без адреса. Пропускаем.');
//                 return;
//             }
            
//             // <<< НОВЫЙ КОД: Создаем уникальный ID и присваиваем его элементу списка
//             const itemId = `location-${index}`;
//             item.dataset.itemId = itemId; // Используем data-атрибут для хранения ID

//             const metro = item.querySelector('p:nth-of-type(1)')?.textContent?.trim() ?? 'Название не указано';
//             const schedule = item.querySelector('p:nth-of-type(3)')?.textContent?.trim() ?? 'Часы работы не указаны';

//             const balloonContent = `
//                 <div class="balloon-content" style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
//                     <h4 style="margin: 0 0 5px 0;">${metro}</h4>
//                     <p style="margin: 0 0 5px 0;">${address}</p>
//                     <p style="margin: 0;">${schedule}</p>
//                     <a href="https://yandex.ru/maps/?rtext=~${address}" target="_blank">Проложить маршрут</a>
//                 </div>
//             `;

//             const geocodePromise = ymaps.geocode(address)
//                 .then(res => {
//                     const firstGeoObject = res.geoObjects.get(0);
//                     if (firstGeoObject) {
//                         const coords = firstGeoObject.geometry.getCoordinates();
//                         const placemark = new ymaps.Placemark(coords, {
//                             balloonContent: balloonContent,
//                             hintContent: metro
//                         }, {
//                             // <<< НОВЫЙ КОД: Добавляем тот же ID в свойства метки
//                             itemId: itemId 
//                         });
//                         placemarksCollection.add(placemark);
//                     }
//                 })
//                 .catch(err => {
//                     console.error(`Ошибка геокодирования для адреса "${address}":`, err);
//                 });
            
//             geocodePromises.push(geocodePromise);
//         });

//         Promise.all(geocodePromises).then(() => {
//             if (placemarksCollection.getLength() > 0) {
//                 myMap.geoObjects.add(placemarksCollection);
//                 myMap.setBounds(placemarksCollection.getBounds(), {
//                     checkZoomRange: true,
//                     zoomMargin: 40
//                 });

//                 // <<< НОВЫЙ КОД: Обработчики событий для коллекции меток
//                 placemarksCollection.events.add(['mouseenter', 'click'], (e) => {
//                     const targetPlacemark = e.get('target');
//                     const itemId = targetPlacemark.options.get('itemId');
//                     highlightLocationItem(itemId);
//                 });

//                 placemarksCollection.events.add('mouseleave', (e) => {
//                     const targetPlacemark = e.get('target');
//                     const itemId = targetPlacemark.options.get('itemId');
//                     unhighlightLocationItem(itemId);
//                 });
                
//                 // <<< НОВЫЙ КОД: При клике на саму карту (не на метку) снимаем выделение со всех элементов
//                 myMap.events.add('click', () => {
//                      unhighlightAllLocationItems();
//                 });
//             }
//         });
        
//         // <<< НОВЫЙ КОД: Функции для управления подсветкой
//         function highlightLocationItem(itemId) {
//             unhighlightAllLocationItems(); // Сначала убираем подсветку со всех
//             const itemToHighlight = document.querySelector(`.location-item[data-item-id="${itemId}"]`);
//             if (itemToHighlight) {
//                 itemToHighlight.classList.add('is-active');
//                 // Опционально: прокрутка списка к активному элементу
//                 itemToHighlight.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//             }
//         }
        
//         function unhighlightLocationItem(itemId) {
//              const itemToUnhighlight = document.querySelector(`.location-item[data-item-id="${itemId}"]`);
//              if (itemToUnhighlight) {
//                 itemToUnhighlight.classList.remove('is-active');
//             }
//         }

//         function unhighlightAllLocationItems() {
//             document.querySelectorAll('.location-item.is-active').forEach(item => {
//                 item.classList.remove('is-active');
//             });
//         }
//     }
// }





if (typeof ymaps !== 'undefined') {

    ymaps.ready(init);

    function init() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) {
            console.warn('Элемент для карты с ID "map" не найден. Инициализация карты отменена.');
            return;
        }

        const mapStyles = [
            { elementType: "all", stylers: [{ saturation: -100 }, { lightness: 10 }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#333333" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#FFFFFF" }] },
        ];

        const myMap = new ymaps.Map('map', {
            center: [55.755819, 37.617644],
            zoom: 10,
            controls: ['zoomControl']
        }, {
            styles: mapStyles 
        });

        const locationItems = document.querySelectorAll('.location-item');

        if (locationItems.length === 0) {
            return;
        }

        const placemarksCollection = new ymaps.GeoObjectCollection(null, {
            draggable: false 
        });

        const geocodePromises = [];

        locationItems.forEach((item, index) => {
            const address = item.querySelector('p:nth-of-type(2)')?.textContent?.trim() ?? '';
            
            if (!address) {
                return;
            }
            
            const itemId = `location-${index}`;
            item.dataset.itemId = itemId;

            const metro = item.querySelector('p:nth-of-type(1)')?.textContent?.trim() ?? 'Название не указано';
            const schedule = item.querySelector('p:nth-of-type(3)')?.textContent?.trim() ?? 'Часы работы не указаны';

            const balloonContent = `
                <div class="custom-balloon">
                    <p class="address">${metro}</p>
                    <p class="address-details">${address}</p>
                    <p class="work-hours">${schedule}</p>
                    <a class="route-link" href="https://yandex.ru/maps/?rtext=~${address}" target="_blank">Проложить маршрут</a>
                </div>
            `;

            const geocodePromise = ymaps.geocode(address)
                .then(res => {
                    const firstGeoObject = res.geoObjects.get(0);
                    if (firstGeoObject) {
                        const coords = firstGeoObject.geometry.getCoordinates();
                        const placemark = new ymaps.Placemark(coords, {
                            balloonContent: balloonContent,
                            // Мы убираем hintContent, чтобы стандартная подсказка не мешала
                        }, {
                            iconLayout: 'default#image',
                            iconImageHref: 'images/map-12.svg',
                            iconImageSize: [36, 36], 
                            iconImageOffset: [-18, -36],
                            balloonPanelMaxMapArea: 0,
                            itemId: itemId 
                        });
                        placemarksCollection.add(placemark);
                    }
                })
                .catch(err => {
                    console.error(`Ошибка геокодирования для адреса "${address}":`, err);
                });
            
            geocodePromises.push(geocodePromise);
        });

        Promise.all(geocodePromises).then(() => {
            if (placemarksCollection.getLength() > 0) {
                myMap.geoObjects.add(placemarksCollection);
                myMap.setBounds(placemarksCollection.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 40
                });

                // <<< ИЗМЕНЕНИЯ ЗДЕСЬ >>>
                // При наведении на метку - открываем ее балун
                placemarksCollection.events.add('mouseenter', (e) => {
                    const targetPlacemark = e.get('target');
                    const itemId = targetPlacemark.options.get('itemId');
                    targetPlacemark.balloon.open();
                    highlightLocationItem(itemId);
                });

                // При уходе мыши с метки - закрываем балун
                placemarksCollection.events.add('mouseleave', (e) => {
                    const targetPlacemark = e.get('target');
                    const itemId = targetPlacemark.options.get('itemId');
                    targetPlacemark.balloon.close();
                    unhighlightLocationItem(itemId);
                });

                // При клике на метку также подсвечиваем элемент в списке
                placemarksCollection.events.add('click', (e) => {
                    const targetPlacemark = e.get('target');
                    const itemId = targetPlacemark.options.get('itemId');
                    highlightLocationItem(itemId);
                });
                
                myMap.events.add('click', () => {
                     unhighlightAllLocationItems();
                });
            }
        });
        
        function highlightLocationItem(itemId) {
            unhighlightAllLocationItems();
            const itemToHighlight = document.querySelector(`.location-item[data-item-id="${itemId}"]`);
            if (itemToHighlight) {
                itemToHighlight.classList.add('is-active');
                itemToHighlight.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        function unhighlightLocationItem(itemId) {
             const itemToUnhighlight = document.querySelector(`.location-item[data-item-id="${itemId}"]`);
             if (itemToUnhighlight) {
                itemToUnhighlight.classList.remove('is-active');
            }
        }

        function unhighlightAllLocationItems() {
            document.querySelectorAll('.location-item.is-active').forEach(item => {
                item.classList.remove('is-active');
            });
        }
    }
}






document.addEventListener('DOMContentLoaded', () => {

    const popupOverlay = document.getElementById('popup');
    const allOpenButtons = document.querySelectorAll('.open-popup');
    const closePopupButton = document.getElementById('popup-close');
    const allSteps = document.querySelectorAll('.popup-step');
    const popupBody = document.querySelector('.popup-body');

    if (!popupOverlay || !popupBody) {
        console.error('Основные элементы попапа не найдены. Скрипт не будет работать.');
        return;
    }

    function goToStep(stepId) {
        allSteps.forEach(step => {
            step.classList.remove('active');
        });
        const targetStep = document.getElementById(stepId);
        if (targetStep) {
            targetStep.classList.add('active');
        }
    }

    function openPopup() {
        goToStep('step-1');
        popupOverlay.classList.add('active');
        // --- Добавлена эта строка для отключения скролла ---
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        popupOverlay.classList.remove('active');
        // --- Добавлена эта строка для возврата скролла ---
        document.body.style.overflow = ''; // Сбрасывает inline-стиль, возвращая значение из CSS или дефолтное.
    }

    allOpenButtons.forEach(button => {
        button.addEventListener('click', openPopup);
    });

    closePopupButton.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', (event) => {
        // Проверяем, что клик был именно по оверлею, а не по содержимому попапа
        if (event.target === popupOverlay) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (event) => {
        // Закрытие попапа по кнопке Escape
        if (event.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });

    popupBody.addEventListener('click', (event) => {
        const button = event.target.closest('button');

        if (!button) {
            return;
        }

        if (button.dataset.nextStep) {
            goToStep(button.dataset.nextStep);
        }

        if (button.id === 'btn-confirm-cancel') {
            alert('Запись успешно отменена!');
            closePopup();
        }
    });

});






document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку "Фильтр"
    const filterButton = document.querySelector('.filter-button');
    
    // Проверяем, нашлась ли кнопка
    if (filterButton) {
        // Внутри кнопки находим саму картинку
        const filterImage = filterButton.querySelector('img');

        // Добавляем обработчик события "клик"
        filterButton.addEventListener('click', function() {
            const activeTab = document.querySelector('.tab-content.active');
            
            if (activeTab) {
                const filters = activeTab.querySelector('.widget-header-filters');
                
                if (filters) {
                    // Переключаем класс 'active' на блоке с фильтрами
                    filters.classList.toggle('active');

                    // --- НОВЫЙ КОД ДЛЯ СМЕНЫ КАРТИНКИ ---
                    // Проверяем, есть ли картинка и data-атрибуты у нее
                    if (filterImage && filterImage.dataset.iconDefault && filterImage.dataset.iconActive) {
                        // Проверяем, активен ли сейчас блок фильтров
                        if (filters.classList.contains('active')) {
                            // Если да, ставим активную иконку (крестик)
                            filterImage.src = filterImage.dataset.iconActive;
                        } else {
                            // Если нет, возвращаем иконку по умолчанию (фильтр)
                            filterImage.src = filterImage.dataset.iconDefault;
                        }
                    }
                    // --- КОНЕЦ НОВОГО КОДА ---
                }
            }
        });
    }

    // Дополнительный код: скрывать фильтры и СБРАСЫВАТЬ ИКОНКУ при переключении табов
    const tabs = document.querySelectorAll('.widget-tabs .tab-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Находим все блоки с фильтрами и убираем у них класс 'active'
            document.querySelectorAll('.widget-header-filters.active').forEach(filtersBlock => {
                filtersBlock.classList.remove('active');
            });

            // --- НОВЫЙ КОД ДЛЯ СБРОСА ИКОНКИ ---
            // При переключении таба всегда возвращаем иконку фильтра в исходное состояние
            if (filterButton) {
                const filterImage = filterButton.querySelector('img');
                if (filterImage && filterImage.dataset.iconDefault) {
                    filterImage.src = filterImage.dataset.iconDefault;
                }
            }
            // --- КОНЕЦ НОВОГО КОДА ---
        });
    });
});












document.addEventListener('DOMContentLoaded', () => {

    const overlay = document.querySelector('.popup-overlay2');
    const openButtons = document.querySelectorAll('.open-2');
    const closeButtons = document.querySelectorAll('.popup-close, #btn-cancel');

    if (!overlay) {
        // Проверка остается, но сообщение в консоль не выводится
        return;
    }

    const openPopup = () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    openButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup();
        });
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            closePopup();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePopup();
        }
    });
});











document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.drop-cont');

  dropdowns.forEach(container => {
    const toggle = container.querySelector('.drop');
    const list = container.querySelector('.dropdown-list');
    const display = toggle.querySelector('p');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();

      const wasThisOpen = container.classList.contains('open'); // true, если этот дропдаун был открыт ДО клика

      dropdowns.forEach(d => {
        d.classList.remove('open'); // Закрываем ВСЕ дропдауны
      });

      if (!wasThisOpen) {
        container.classList.add('open'); // Если кликнутый дропдаун был изначально закрыт, открываем его
      }
    });

    list.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        display.textContent = item.textContent;
        container.classList.remove('open');
      });
    });
  });

  document.addEventListener('click', function (e) {
    dropdowns.forEach(container => {
      if (container.classList.contains('open') && !container.contains(e.target)) {
        container.classList.remove('open');
      }
    });
  });
});
