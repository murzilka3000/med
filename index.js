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

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            emailField.style.display = 'flex';
        } else {
            emailField.style.display = 'none';
        }
    });
});