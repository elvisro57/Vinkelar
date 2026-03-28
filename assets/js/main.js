document.addEventListener("DOMContentLoaded", () => {
    // Scroll Effects for Navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all currently active FAQ items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current FAQ item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Intersection Observer for scroll animations (fade-up, fade-in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                entry.target.classList.add('visible');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in-delay');
    animatedElements.forEach(el => observer.observe(el));
});
