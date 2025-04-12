/**
 * Main JavaScript file for Worbis Salon website
 * Contains functionality for navigation, smooth scrolling, and other interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Navigation.init();
    SmoothScroll.init();
    ScrollEffects.init();
    
    // Optional: add more modules as needed
    // AnimationObserver.init();
});

/**
 * Navigation Module - Handles mobile menu toggle and related functionality
 */
const Navigation = {
    navLinks: document.querySelector('.nav-links'),
    mobileMenuBtn: document.querySelector('.mobile-menu-btn'),
    
    init: function() {
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
        }
    },
    
    toggleMobileMenu: function() {
        this.navLinks.classList.toggle('active');
        this.mobileMenuBtn.classList.toggle('active');
    },
    
    closeMobileMenu: function() {
        if (window.innerWidth <= 900) {
            this.navLinks.classList.remove('active');
            this.mobileMenuBtn.classList.remove('active');
        }
    }
};

/**
 * SmoothScroll Module - Provides smooth scrolling to anchor links
 */
const SmoothScroll = {
    internalLinks: document.querySelectorAll('a[href^="#"]'),
    
    init: function() {
        for (const link of this.internalLinks) {
            link.addEventListener('click', this.scrollToTarget.bind(this));
        }
    },
    
    scrollToTarget: function(e) {
        e.preventDefault();
        
        const link = e.currentTarget;
        const targetId = link.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu when a link is clicked
            Navigation.closeMobileMenu();
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
};

/**
 * ScrollEffects Module - Handles scroll-based effects like navbar transformation
 */
const ScrollEffects = {
    navbar: document.querySelector('.navbar'),
    
    init: function() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        // Initial check in case page is loaded scrolled down
        this.handleScroll();
    },
    
    handleScroll: function() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
};
