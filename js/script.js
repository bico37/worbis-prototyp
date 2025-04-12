// Dies ist ein Vorschlag für dein script.js, das in den js-Ordner verschoben werden sollte
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling für interne Links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    for (const link of internalLinks) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu when a link is clicked
                if (window.innerWidth <= 900) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Mobile Navigation Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Optional: Add navbar scrolling effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
