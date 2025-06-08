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