document.addEventListener('DOMContentLoaded', () => {
    // Performance checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isScrolling = false;
    let isResizing = false;

    // Enhanced Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger street art animation when visible
                if (entry.target.classList.contains('art-composition')) {
                    resetAndTriggerArtAnimation(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .mission-text, .milestone-text, .street-text, .art-composition, .graffiti-text')
        .forEach(element => animationObserver.observe(element));

    // Enhanced Navbar
    const navbar = document.querySelector('.navbar');
    let lastScrollPosition = window.pageYOffset;

    function handleScroll() {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    navbar.classList.remove('scrolled');
                } else {
                    navbar.classList.add('scrolled');
                }

                lastScrollPosition = currentScroll;
                isScrolling = false;
            });
        }
        isScrolling = true;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Enhanced Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Enhanced Floating Artwork Parallax
    const floatingArtwork = document.querySelector('.floating-artwork');
    let parallaxTimeout;

    function handleParallax(e) {
        if (prefersReducedMotion) return;
        
        if (!parallaxTimeout) {
            parallaxTimeout = requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                const moveX = (clientX - innerWidth / 2) / innerWidth * 15;
                const moveY = (clientY - innerHeight / 2) / innerHeight * 15;
                
                floatingArtwork.style.transform = `translate(${moveX}px, ${moveY}px)`;
                parallaxTimeout = null;
            });
        }
    }

    if (floatingArtwork) {
        window.addEventListener('mousemove', handleParallax, { passive: true });
    }

    // Enhanced Button Effects
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            button.style.setProperty('--mouse-x', `${x}%`);
            button.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Enhanced Milestone Timeline
    const milestonePoints = document.querySelectorAll('.milestone-point');
    const milestoneLines = document.querySelectorAll('.milestone-line');
    let currentMilestone = null;

    function updateMilestoneProgress(target) {
        const points = Array.from(milestonePoints);
        const index = points.indexOf(target);
        
        milestoneLines.forEach((line, i) => {
            if (i < index) {
                line.style.opacity = '1';
                line.style.background = 'var(--gradient-primary)';
            } else {
                line.style.opacity = '0.3';
                line.style.background = 'var(--color-primary)';
            }
        });
    }

    milestonePoints.forEach((point, index) => {
        point.addEventListener('mouseenter', function() {
            if (currentMilestone === this) return;
            
            // Reset previous milestone
            if (currentMilestone) {
                currentMilestone.style.transform = '';
            }

            // Update current milestone
            this.style.transform = 'translateY(-5px)';
            currentMilestone = this;
            
            // Update progress visualization
            updateMilestoneProgress(this);

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'milestone-ripple';
            this.appendChild(ripple);
            
            ripple.addEventListener('animationend', () => ripple.remove());
        });

        point.addEventListener('mouseleave', function() {
            this.style.transform = '';
            currentMilestone = null;
        });
    });

    // Enhanced Street Art Animation
    function resetAndTriggerArtAnimation(element) {
        const paths = element.querySelectorAll('.art-path, .art-element');
        
        paths.forEach(path => {
            path.style.animation = 'none';
            path.offsetHeight; // Force reflow
            
            if (path.classList.contains('art-path')) {
                path.style.animation = 'drawPath 3s ease forwards';
            } else {
                path.style.animation = 'fadeInScale 1s ease forwards 0.5s';
            }
        });
    }

    // Enhanced Social Button Interaction
    document.querySelectorAll('.social-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Optimized Background Effects
    const spaceEnvironment = document.querySelector('.space-environment');
    let ticking = false;

    function optimizeBackground() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const opacity = Math.max(0, 1 - (scrolled / window.innerHeight));
                
                if (spaceEnvironment) {
                    spaceEnvironment.style.opacity = opacity;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', optimizeBackground, { passive: true });

    // Initial visibility check
    function checkInitialVisibility() {
        document.querySelectorAll('.fade-in').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }

    checkInitialVisibility();

    // Resize handler
    window.addEventListener('resize', () => {
        if (!isResizing) {
            requestAnimationFrame(() => {
                checkInitialVisibility();
                isResizing = false;
            });
            isResizing = true;
        }
    }, { passive: true });
});