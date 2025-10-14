document.addEventListener('DOMContentLoaded', () => {
    // --- Announcement Bar Carousel ---
    const announcementText = document.querySelector('.announcement-bar span');
    const announcementLeftArrow = document.querySelector('.announcement-bar .left-arrow');
    const announcementRightArrow = document.querySelector('.announcement-bar .right-arrow');
    const announcementMessages = [
        "Sign Up Our Newsletter And Save 10 % On Your First Order",
        "Free Shipping On Orders Over $100!",
        "New Arrivals Every Week - Don't Miss Out!"
    ];
    let currentAnnouncementIndex = 0;

    const updateAnnouncement = () => {
        if (announcementText) {
            announcementText.textContent = announcementMessages[currentAnnouncementIndex];
        }
    };

    if (announcementLeftArrow && announcementRightArrow && announcementText) {
        announcementLeftArrow.addEventListener('click', () => {
            currentAnnouncementIndex = (currentAnnouncementIndex - 1 + announcementMessages.length) % announcementMessages.length;
            updateAnnouncement();
        });

        announcementRightArrow.addEventListener('click', () => {
            currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcementMessages.length;
            updateAnnouncement();
        });

        updateAnnouncement();
    }

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mainHeader = document.querySelector('.main-header');
    const body = document.body;
    const dropdowns = document.querySelectorAll('.main-header .dropdown');
    const navLinks = document.querySelectorAll('.nav-left a, .nav-right a'); // All main navigation links

    if (hamburger && mainHeader && body) {
        hamburger.addEventListener('click', () => {
            mainHeader.classList.toggle('nav-open');
            body.classList.toggle('no-scroll');

            // Close all dropdowns when the main menu is toggled
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });

        // Handle dropdown clicks in mobile menu
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('a');
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', (event) => {
            
                    if (mainHeader.classList.contains('nav-open') && dropdownToggle.contains(event.target)) {
                        event.preventDefault(); // Prevent navigating to '#' or similar
                        dropdown.classList.toggle('active');

                        
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });

       
        navLinks.forEach(link => {
            
       
            if (!link.closest('.dropdown') || (link.closest('.dropdown') && !link.matches('.dropdown > a:first-child'))) {
              
                link.addEventListener('click', () => {
                    if (mainHeader.classList.contains('nav-open')) {
                        mainHeader.classList.remove('nav-open');
                        body.classList.remove('no-scroll');
                        dropdowns.forEach(dropdown => {
                            dropdown.classList.remove('active');
                        });
                    }
                });
            }
        });

        // Close mobile menu if window is resized above mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mainHeader.classList.contains('nav-open')) {
                mainHeader.classList.remove('nav-open');
                body.classList.remove('no-scroll'); 
                dropdowns.forEach(dropdown => { 
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // --- Hero Section Carousel (Image Background Change) ---
    const heroSection = document.querySelector('.hero-section');
    const heroLeftArrow = document.querySelector('.hero-section .left-arrow');
    const heroRightArrow = document.querySelector('.hero-section .right-arrow');
    const heroImages = [
        'https://www.janelockhart.com/blog/wp-content/uploads/2016/03/small-space-living.jpg',
        'https://cdn.home-designing.com/wp-content/uploads/2016/08/casual-scandinavian-interior-design-theme-1024x768.jpg',
        'https://media.designcafe.com/wp-content/uploads/2021/10/30160024/tv-unit-finished-in-dark-wood-with-handleless-drawer-storage.jpg'
        
        
    ];
    let currentHeroImageIndex = 0;

    const updateHeroImage = () => {
        if (heroSection) {
            heroSection.style.backgroundImage = `url('${heroImages[currentHeroImageIndex]}')`;
        }
    };

    if (heroLeftArrow && heroRightArrow && heroSection) {
        heroLeftArrow.addEventListener('click', () => {
            currentHeroImageIndex = (currentHeroImageIndex - 1 + heroImages.length) % heroImages.length;
            updateHeroImage();
        });

        heroRightArrow.addEventListener('click', () => {
            currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
            updateHeroImage();
        });

        updateHeroImage(); 
    }


    const setupCarousel = (carouselSelector, cardsContainerSelector, leftArrowSelector, rightArrowSelector) => {
        const carousel = document.querySelector(carouselSelector);
        const cardsContainer = carousel ? carousel.querySelector(cardsContainerSelector) : null;
        const leftArrow = carousel ? carousel.querySelector(leftArrowSelector) : null;
        const rightArrow = carousel ? carousel.querySelector(rightArrowSelector) : null;

        if (carousel && cardsContainer && leftArrow && rightArrow) {
            let scrollAmount = 0;
            
            const firstCard = cardsContainer.querySelector('.product-card, .review-card');
         
            const gap = 20; // Assume 20px gap as per CSS

            leftArrow.addEventListener('click', () => {
                scrollAmount -= (cardWidth + gap);
                if (scrollAmount < 0) scrollAmount = 0;
                cardsContainer.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            rightArrow.addEventListener('click', () => {
                scrollAmount += (cardWidth + gap);
                const maxScroll = cardsContainer.scrollWidth - cardsContainer.clientWidth;
                if (scrollAmount > maxScroll) scrollAmount = maxScroll;
                cardsContainer.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
    };

    // Initialize carousels for different sections
    setupCarousel('.product-carousel-1', '.product-cards', '.left-arrow', '.right-arrow');
    setupCarousel('.product-carousel-2', '.product-cards', '.left-arrow', '.right-arrow');
    setupCarousel('.review-carousel', '.review-cards', '.left-arrow', '.right-arrow');
    // Add more if you have other carousels with this generic structure
});