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

    // Portfolio Modal Logic
    const modalOverlay = document.getElementById('portfolio-modal');
    if (modalOverlay) {
        const modalClose = document.querySelector('.modal-close');
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        // Elements inside modal
        const modalImg = document.getElementById('modal-img');
        const modalVideo = document.getElementById('modal-video');
        const modalCategory = document.getElementById('modal-category');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalCompany = document.getElementById('modal-company');
        const modalYear = document.getElementById('modal-year');
        const modalLink = document.getElementById('modal-link');

        // Open Modal
        portfolioCards.forEach(card => {
            card.addEventListener('click', () => {
                // Get data from card attributes
                const dataImg = card.getAttribute('data-img');
                const dataCategory = card.getAttribute('data-category');
                const dataTitle = card.getAttribute('data-title');
                const dataDesc = card.getAttribute('data-desc');
                const dataCompany = card.getAttribute('data-company');
                const dataYear = card.getAttribute('data-year');
                const dataUrl = card.getAttribute('data-url');
                const dataVideoId = card.getAttribute('data-video-id');

                // Populate Modal
                if (dataVideoId) {
                    modalImg.style.display = 'none';
                    if (modalVideo) {
                        modalVideo.style.display = 'block';
                        modalVideo.src = `https://www.youtube.com/embed/${dataVideoId}?autoplay=1`;
                    }
                } else {
                    if (modalVideo) {
                        modalVideo.style.display = 'none';
                        modalVideo.src = '';
                    }
                    modalImg.style.display = 'block';
                    modalImg.src = dataImg;
                }
                
                modalCategory.textContent = dataCategory;
                modalTitle.textContent = dataTitle;
                modalDesc.innerHTML = dataDesc;
                modalCompany.textContent = dataCompany;
                modalYear.textContent = dataYear;
                modalLink.href = dataUrl;
                modalLink.textContent = dataUrl.replace(/^https?:\/\//, '');

                // Show Modal
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling on background
            });
        });

        // Close Modal
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (modalVideo) {
                modalVideo.src = ''; // Stops the video
            }
        };

        modalClose.addEventListener('click', closeModal);
        
        // Close on clicking outside content
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }
    // Prints Carousel Logic
    const carouselWrapper = document.getElementById('prints-carousel');
    const prevBtn = document.getElementById('prev-print');
    const nextBtn = document.getElementById('next-print');

    if (carouselWrapper && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const scrollAmount = carouselWrapper.clientWidth / 2;
            carouselWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const scrollAmount = carouselWrapper.clientWidth / 2;
            carouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});
