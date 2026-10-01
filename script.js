// Smooth scroll para los links de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de entrada para los elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación a elementos
document.querySelectorAll('.type-card, .app-item, .spec-box').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Añadir animación slideIn
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Validación del formulario
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = {
            nombre: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            telefono: this.querySelector('input[type="tel"]').value,
            mensaje: this.querySelector('textarea').value
        };
        
        console.log('Datos del formulario:', data);
        
        // Mostrar mensaje de éxito
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Mensaje enviado';
        submitBtn.style.background = '#4ECDC4';
        
        setTimeout(() => {
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'white';
        }, 3000);
    });
}

// Efecto parallax en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-illustration');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Animación de contador de números
function animateCounters() {
    const counters = document.querySelectorAll('.spec-box p');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (!isNaN(target)) {
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        }
    });
}

// Ejecutar animación de contadores cuando sea visible
const specsSection = document.querySelector('.specifications');
if (specsSection) {
    const specsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                specsObserver.unobserve(entry.target);
            }
        });
    });
    
    specsObserver.observe(specsSection);
}

// Agregar clase active al navegar
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

console.log('✓ Script cargado correctamente');
