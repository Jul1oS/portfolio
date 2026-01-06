// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Fonction pour déterminer quelle section est actuellement visible
    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Écouter le scroll
    window.addEventListener('scroll', setActiveLink);

    // Smooth scroll au clic sur les liens (fallback pour navigateurs ne supportant pas scroll-behavior: smooth)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 80px pour compenser la hauteur de la navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialiser l'état actif au chargement
    setActiveLink();
});

// Animation simple au scroll pour les cartes d'expérience
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer toutes les cartes d'expérience
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');

    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Gestion du formulaire de contact avec Formspree
document.addEventListener('DOMContentLoaded', function() {
    const messageTextarea = document.getElementById('message');
    const charCountSpan = document.getElementById('char-count');
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const honeypotField = document.getElementById('website');

    // Compteur de caractères pour le message
    if (messageTextarea && charCountSpan) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCountSpan.textContent = currentLength;

            // Changer la couleur si proche de la limite
            if (currentLength >= 450) {
                charCountSpan.style.color = '#e74c3c';
            } else if (currentLength < 10) {
                charCountSpan.style.color = '#e74c3c';
            } else {
                charCountSpan.style.color = 'var(--text-light)';
            }
        });
    }

    // Vérification honeypot avant soumission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Vérification honeypot (piège à bots)
            if (honeypotField && honeypotField.value !== '') {
                e.preventDefault();
                console.warn('Bot détecté via honeypot');
                return false;
            }

            // Désactiver le bouton pendant l'envoi
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';

            // Formspree gérera la suite (envoi et redirection)
        });
    }
});
