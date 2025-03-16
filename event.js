document.addEventListener('DOMContentLoaded', function () {
    function toggleMenu() {
        const nav = document.querySelector('nav ul');
        nav.classList.toggle('show');
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetSection = document.querySelector(this.getAttribute('href'));

            if (targetSection) {
                e.preventDefault(); // Prevent default link behavior
                
                // Hide all sections
                document.querySelectorAll('section').forEach(sec => {
                    sec.classList.remove('visible');
                    sec.classList.add('hidden-section');
                });

                // Show the selected section
                targetSection.classList.remove('hidden-section');
                targetSection.classList.add('visible');

                // Scroll smoothly to the section
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });

                // Close menu on mobile if applicable
                document.querySelector('nav ul').classList.remove('show');
            }
        });
    });

    // Attach event listener if a menu button exists
    const menuButton = document.querySelector('.menu-toggle');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }
});
