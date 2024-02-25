document.addEventListener("DOMContentLoaded", function() {
    const details = document.querySelectorAll('[id^=detail-]');
    details.forEach(function(detail) {
        detail.style.display = 'none';
    });

    const toggles = document.querySelectorAll('.toggle');
    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const targetId = toggle.getAttribute('data-toggle');
            const target = document.getElementById(targetId);
            if (target.style.display === 'none') {
                target.style.display = 'block';
            } else {
                target.style.display = 'none';
            }
        });
    });
});
