document.addEventListener('DOMContentLoaded', function() {
    // Add animation delay to each card
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Intersection Observer for better animation timing
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
        card.style.animationPlayState = 'paused';

        // Add click event listener for modal
        card.addEventListener('click', function() {
            const eventName = this.getAttribute('data-event-name');
            const eventDescription = this.getAttribute('data-event-description');
            const eventDate = this.getAttribute('data-event-date');
            const eventLink = this.getAttribute('data-event-link');

            const modal = document.getElementById('eventModal');
            const modalEventName = document.getElementById('modalEventName');
            const modalEventDescription = document.getElementById('modalEventDescription');
            const modalEventDate = document.getElementById('modalEventDate');
            const modalEventLink = document.getElementById('modalEventLink');

            modalEventName.textContent = eventName;
            modalEventDescription.textContent = eventDescription;
            modalEventDate.textContent = `Year: ${eventDate}`;
            modalEventLink.href = eventLink;

            modal.style.display = 'block';
        });
    });

    // Close modal functionality
    const closeModal = document.querySelector('.close-modal');
    const modal = document.getElementById('eventModal');

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});