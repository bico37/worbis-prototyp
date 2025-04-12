/**
 * Banner Helper - Ensures proper integration with the site layout
 * Handles DOM adjustments when banner appears or disappears
 */
document.addEventListener('DOMContentLoaded', function() {
    const BannerHelper = {
        // Configuration
        navbarTransitionDuration: 300, // ms
        initialCheckDelay: 300, // ms
        resizeDebounceDelay: 250, // ms
        
        init: function() {
            // Set up event listeners
            this.setupEventListeners();
            
            // Initial check with a slight delay to ensure banner has time to be created
            setTimeout(() => this.checkBannerStatus(), this.initialCheckDelay);
        },
        
        setupEventListeners: function() {
            // Listen for custom banner status change events from banner.js
            window.addEventListener('banner-status-changed', () => this.checkBannerStatus());
            
            // Listen for window resize with debounce
            window.addEventListener('resize', this.debounce(() => this.checkBannerStatus(), this.resizeDebounceDelay));
            
            // Set up a mutation observer to watch for banner class changes
            this.setupMutationObserver();
        },
        
        checkBannerStatus: function() {
            const banner = document.querySelector('.notification-banner.visible');
            const navbar = document.querySelector('.navbar');
            
            if (banner) {
                // Banner is visible - adjust the layout
                document.body.classList.add('has-banner');
                
                if (navbar) {
                    const bannerHeight = banner.offsetHeight;
                    navbar.style.transition = `top ${this.navbarTransitionDuration}ms ease`;
                    navbar.style.top = `${bannerHeight}px`;
                }
                
                // Custom event for other scripts that might need to know about banner status
                window.dispatchEvent(new CustomEvent('banner-visible', { 
                    detail: { height: banner.offsetHeight } 
                }));
            } else {
                // No banner is visible - reset the layout
                document.body.classList.remove('has-banner');
                
                if (navbar) {
                    navbar.style.transition = `top ${this.navbarTransitionDuration}ms ease`;
                    navbar.style.top = '0';
                }
                
                // Custom event for other scripts
                window.dispatchEvent(new Event('banner-hidden'));
            }
        },
        
        setupMutationObserver: function() {
            // Watch for DOM changes that might affect the banner
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    // If the banner's class changes or it gets added/removed from DOM
                    if (mutation.type === 'childList' || 
                        (mutation.type === 'attributes' && 
                         mutation.attributeName === 'class' && 
                         mutation.target.classList.contains('notification-banner'))) {
                        this.checkBannerStatus();
                        break;
                    }
                }
            });
            
            // Start observing the document body
            observer.observe(document.body, { 
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class']
            });
        },
        
        // Utility: Debounce function to limit how often a function can be called
        debounce: function(func, delay) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), delay);
            };
        }
    };
    
    // Initialize the banner helper
    BannerHelper.init();
});
