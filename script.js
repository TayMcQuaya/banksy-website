document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
            // Scroll down
            navbar.classList.add('scrolled');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
            // Scroll up
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const offset = 100; // Offset for fixed header
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Enhanced button effects
    const buttons = document.querySelectorAll('.cta-button, .social-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const effect = this.querySelector('.button-effect');
            if (effect) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                effect.style.left = `${x}px`;
                effect.style.top = `${y}px`;
            }
        });
    });

    // Milestone interaction enhancement
    const milestonePoints = document.querySelectorAll('.milestone-point');
    let activeMilestone = null;

    milestonePoints.forEach(point => {
        point.addEventListener('mouseenter', function(e) {
            if (activeMilestone !== this) {
                // Reset previous active milestone
                if (activeMilestone) {
                    activeMilestone.style.transform = 'translateY(0)';
                }
                
                // Smooth transition for new active milestone
                this.style.transform = 'translateY(-5px)';
                activeMilestone = this;
            }
        });

        point.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0)';
            activeMilestone = null;
        });
    });

    // Scroll-triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        scrollObserver.observe(element);
    });

    // Floating artwork parallax effect
    const floatingArtwork = document.querySelector('.floating-artwork');
    
    if (floatingArtwork) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const moveX = (clientX - innerWidth / 2) / innerWidth * 20;
            const moveY = (clientY - innerHeight / 2) / innerHeight * 20;
            
            floatingArtwork.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Text glitch effect
    const glitchTexts = document.querySelectorAll('.stencil-text');
    
    function triggerGlitch(element) {
        const duration = 50 + Math.random() * 100;
        const delay = Math.random() * 5000;
        
        setTimeout(() => {
            element.style.transform = `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)`;
            
            setTimeout(() => {
                element.style.transform = 'translate(0, 0)';
                triggerGlitch(element);
            }, duration);
        }, delay);
    }

    glitchTexts.forEach(text => {
        text.style.transition = 'transform 50ms';
        triggerGlitch(text);
    });

    // Enhanced social button interactions
    const socialButtons = document.querySelectorAll('.social-button');
    
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.button-glow');
            if (glow) {
                glow.style.opacity = '1';
                this.style.transform = 'translateY(-5px)';
            }
        });

        button.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.button-glow');
            if (glow) {
                glow.style.opacity = '0';
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Performance optimization for star animation
    const starsContainer = document.querySelector('.stars-container');
    let isVisible = true;

    const optimizeStars = () => {
        if (window.scrollY > window.innerHeight && isVisible) {
            starsContainer.style.display = 'none';
            isVisible = false;
        } else if (window.scrollY <= window.innerHeight && !isVisible) {
            starsContainer.style.display = 'block';
            isVisible = true;
        }
    };

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                optimizeStars();
                scrollTimeout = null;
            }, 100);
        }
    });

    // Handle mobile touch interactions
    let touchStartY;
    
    document.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', e => {
        if (!touchStartY) return;

        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;

        // Add scrolled class to navbar on mobile scroll
        if (Math.abs(diff) > 5) {
            navbar.classList.add('scrolled');
        }
    });

    document.addEventListener('touchend', () => {
        touchStartY = null;
    });
});