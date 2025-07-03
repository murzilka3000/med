document.addEventListener('DOMContentLoaded', function () {

    function initAppointmentsWidgetTabs() {
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
    }

    function initEmailToggle() {
        const checkbox = document.getElementById('toggle-email');
        const emailField = document.getElementById('email-field');

        if (checkbox && emailField) {
            checkbox.addEventListener('change', function () {
                emailField.style.display = checkbox.checked ? 'flex' : 'none';
            });
        }
    }

    function initMobileMenu() {
        const openMenuButton = document.getElementById('open-menu-btn');
        const closeMenuButton = document.getElementById('close-menu-btn');
        const menu = document.getElementById('menu');
        const body = document.body;
        const menuLinks = document.querySelectorAll('.menu-nav a');

        if (!openMenuButton || !closeMenuButton || !menu) {
            return;
        }

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
    }

    function initLocationWidgetTabs() {
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

        const activateTab = function (tabToActivate) {
            if (!tabToActivate) {
                return;
            }

            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
            tabToActivate.classList.add('active');

            const tabId = tabToActivate.getAttribute('data-tab');

            for (const key in contentPanels) {
                if (contentPanels[key]) {
                    contentPanels[key].style.display = 'none';
                }
            }

            if (contentPanels[tabId]) {
                contentPanels[tabId].style.display = 'block';
            }
        };

        const firstVisibleTab = Array.from(tabs).find(tab => {
            return window.getComputedStyle(tab).display !== 'none';
        });

        activateTab(firstVisibleTab);

        tabsContainer.addEventListener('click', function (event) {
            const clickedTab = event.target.closest('.tab-item');
            if (!clickedTab) {
                return;
            }

            event.preventDefault();
            activateTab(clickedTab);
        });
    }

    function initHistoryActiveClass() {
        const historyElement = document.getElementById('history');
        if (!historyElement) return;

        function toggleActiveClass() {
            if (window.innerWidth <= 945) {
                historyElement.classList.add('active');
            } else {
                historyElement.classList.remove('active');
            }
        }

        toggleActiveClass();
        window.addEventListener('resize', toggleActiveClass);
    }

    function initYandexMap() {
        if (typeof ymaps === 'undefined') {
            return;
        }

        ymaps.ready(function () {
            const mapContainer = document.getElementById('map');
            if (!mapContainer) {
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

                    placemarksCollection.events.add('mouseenter', (e) => {
                        const targetPlacemark = e.get('target');
                        const itemId = targetPlacemark.options.get('itemId');
                        targetPlacemark.balloon.open();
                        highlightLocationItem(itemId);
                    });

                    placemarksCollection.events.add('mouseleave', (e) => {
                        const targetPlacemark = e.get('target');
                        const itemId = targetPlacemark.options.get('itemId');
                        targetPlacemark.balloon.close();
                        unhighlightLocationItem(itemId);
                    });

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
        });
    }

    function initPopup1() {
        const popupOverlay = document.getElementById('popup');
        const allOpenButtons = document.querySelectorAll('.open-popup');
        const closePopupButton = document.getElementById('popup-close');
        const allSteps = document.querySelectorAll('.popup-step');
        const popupBody = document.querySelector('.popup-body');

        if (!popupOverlay || !popupBody) {
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
            document.body.style.overflow = 'hidden';
        }

        function closePopup() {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        allOpenButtons.forEach(button => {
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
    }

    function initFilterButton() {
        const filterButton = document.querySelector('.filter-button');

        if (filterButton) {
            const filterImage = filterButton.querySelector('img');

            filterButton.addEventListener('click', function () {
                const activeTab = document.querySelector('.tab-content.active');

                if (activeTab) {
                    const filters = activeTab.querySelector('.widget-header-filters');

                    if (filters) {
                        filters.classList.toggle('active');

                        if (filterImage && filterImage.dataset.iconDefault && filterImage.dataset.iconActive) {
                            if (filters.classList.contains('active')) {
                                filterImage.src = filterImage.dataset.iconActive;
                            } else {
                                filterImage.src = filterImage.dataset.iconDefault;
                            }
                        }
                    }
                }
            });
        }

        const tabs = document.querySelectorAll('.widget-tabs .tab-item');
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                document.querySelectorAll('.widget-header-filters.active').forEach(filtersBlock => {
                    filtersBlock.classList.remove('active');
                });

                if (filterButton) {
                    const filterImage = filterButton.querySelector('img');
                    if (filterImage && filterImage.dataset.iconDefault) {
                        filterImage.src = filterImage.dataset.iconDefault;
                    }
                }
            });
        });
    }

    function initPopup2() {
        const overlay = document.querySelector('.popup-overlay2');
        const openButtons = document.querySelectorAll('.open-2');
        const closeButtons = document.querySelectorAll('.popup-close, #btn-cancel');

        if (!overlay) {
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
    }

    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.drop-cont');

        dropdowns.forEach(container => {
            const toggle = container.querySelector('.drop');
            const list = container.querySelector('.dropdown-list');
            const display = toggle.querySelector('p');

            if (!toggle || !list || !display) {
                return;
            }

            toggle.addEventListener('click', (e) => {
                e.stopPropagation();

                const wasThisOpen = container.classList.contains('open');

                dropdowns.forEach(d => {
                    d.classList.remove('open');
                });

                if (!wasThisOpen) {
                    container.classList.add('open');
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
    }

    // Инициализация всех модулей
    initAppointmentsWidgetTabs();
    initEmailToggle();
    initMobileMenu();
    initLocationWidgetTabs();
    initHistoryActiveClass();
    initYandexMap();
    initPopup1();
    initFilterButton();
    initPopup2();
    initDropdowns();
});