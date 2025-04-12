/**
 * Banner Module - Handles the notification banner display
 */

const NotificationBanner = {
    // EINSTELLUNGEN:
    // Setze auf 'true' um den Banner anzuzeigen oder auf 'false' um ihn zu deaktivieren
    isActive: false,
    
    // Hier kannst du den Text des Banners anpassen:
    bannerText: "Urlaubshinweis: Unser Salon bleibt vom 15. bis 30. August geschlossen. <strong>Jetzt noch Termine sichern!</strong>",
    
    // Wähle das Banner-Icon aus (Font Awesome):
    // Optionen: 'fa-info-circle', 'fa-calendar-alt', 'fa-star', 'fa-exclamation-triangle'
    bannerIcon: "fa-calendar-alt",
    
    // Soll der Banner nach dem Schließen dauerhaft verschwinden oder bei jedem Seitenbesuch angezeigt werden?
    // 'true' = Banner wird nach dem Schließen nicht mehr angezeigt, 'false' = Banner wird bei jedem Seitenbesuch angezeigt
    rememberClosed: true,

    createBanner: function() {
        // Prüfen, ob Banner im localStorage als geschlossen markiert wurde
        if (this.rememberClosed && localStorage.getItem('worbis_banner_closed') === 'true') {
            return;
        }

        // Banner-Element erstellen
        this.banner = document.createElement('div');
        this.banner.className = 'notification-banner';

        // Banner-Inhalt erstellen
        const bannerContent = document.createElement('div');
        bannerContent.className = 'banner-content';

        // Icon hinzufügen
        const iconElement = document.createElement('div');
        iconElement.className = 'banner-icon';
        iconElement.innerHTML = `<i class="fas ${this.bannerIcon}"></i>`;
        bannerContent.appendChild(iconElement);

        // Text hinzufügen
        const textElement = document.createElement('div');
        textElement.className = 'banner-text';
        textElement.innerHTML = this.bannerText;
        bannerContent.appendChild(textElement);

        // Schließen-Button hinzufügen
        const closeButton = document.createElement('button');
        closeButton.className = 'close-banner';
        closeButton.setAttribute('aria-label', 'Banner schließen');
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        bannerContent.appendChild(closeButton);

        // Inhalt zum Banner hinzufügen
        this.banner.appendChild(bannerContent);

        // Banner zum DOM hinzufügen
        document.body.insertBefore(this.banner, document.body.firstChild);
    },

    setupEventListeners: function() {
        if (!this.banner) return;

        // Event-Listener für den Schließen-Button
        const closeButton = this.banner.querySelector('.close-banner');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.closeBanner();
            });
        }
    },

    closeBanner: function() {
        if (!this.banner) return;

        // Banner ausblenden
        this.banner.classList.remove('visible');

        // Wenn rememberClosed aktiv ist, Status im localStorage speichern
        if (this.rememberClosed) {
            localStorage.setItem('worbis_banner_closed', 'true');
        }

        // Banner nach der Animation aus dem DOM entfernen
        setTimeout(() => {
            if (this.banner && this.banner.parentNode) {
                this.banner.parentNode.removeChild(this.banner);
            }
            // Event für banner-helper.js auslösen
            window.dispatchEvent(new Event('banner-status-changed'));
        }, 500);
    },

    createAndShowBanner: function() {
        this.createBanner();
        this.setupEventListeners();
        
        // Show banner immediately instead of with delay
        if (this.banner) {
            // Kleiner Timeout für bessere Animation
            setTimeout(() => {
                this.banner.classList.add('visible');
                // Event für banner-helper.js auslösen
                window.dispatchEvent(new Event('banner-status-changed'));
            }, 100);
        }
    },

    init: function() {
        if (this.isActive) {
            // Wenn Banner im localStorage als geschlossen markiert wurde und erinnern aktiv ist
            if (this.rememberClosed && localStorage.getItem('worbis_banner_closed') === 'true') {
                return; // Banner nicht anzeigen
            }
            this.createAndShowBanner();
        }
    }
};

// DOM-Content-Loaded Event abwarten, um sicherzustellen, dass das Dokument geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Banner initialisieren
    NotificationBanner.init();
    
    // Add a console log to verify the banner is being created
    console.log('Banner initialization complete. Banner should appear at the top of the page.');
});