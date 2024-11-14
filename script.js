document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Starfield Animation
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars with enhanced properties
    const stars = Array(400).fill().map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 3 + 1,
        brightness: Math.random(),
        color: `rgba(${155 + Math.random() * 100}, ${155 + Math.random() * 100}, 255, 1)`
    }));

    // Draw stars with enhanced visual effects
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            const opacity = 0.5 + star.brightness * 0.5;
            ctx.fillStyle = star.color;
            ctx.shadowBlur = star.size * 2;
            ctx.shadowColor = star.color;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Move stars with parallax effect
    function moveStars() {
        stars.forEach(star => {
            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
            // Oscillating brightness
            star.brightness = Math.sin(Date.now() / 1000 + star.speed);
        });
    }

    function animate() {
        drawStars();
        moveStars();
        requestAnimationFrame(animate);
    }

    animate();

    // Enhanced Rocket Animation with Scroll Effects
    const rocket = document.querySelector('.rocket-container');
    let lastScrollTop = 0;
    let rocketRotation = 0;
    let scrollVelocity = 0;
    let lastScrollPosition = window.pageYOffset;
    let lastScrollTime = Date.now();

    window.addEventListener('scroll', () => {
        const currentTime = Date.now();
        const timeDelta = currentTime - lastScrollTime;
        const currentScrollPosition = window.pageYOffset;
        
        // Calculate scroll velocity
        if (timeDelta > 0) {
            scrollVelocity = (currentScrollPosition - lastScrollPosition) / timeDelta;
        }

        // Smooth rotation based on scroll velocity
        const targetRotation = Math.max(Math.min(scrollVelocity * 1000, 30), -30);
        rocketRotation += (targetRotation - rocketRotation) * 0.1;

        // Apply transformations
        rocket.style.transform = `
            translateY(${-currentScrollPosition * 0.5}px) 
            rotate(${rocketRotation}deg)
            scale(${1 + Math.abs(scrollVelocity)})
        `;

        // Update flame effect based on scroll velocity
        const flames = document.querySelectorAll('.flame-inner, .flame-outer');
        flames.forEach(flame => {
            flame.style.height = `${80 + Math.abs(scrollVelocity) * 1000}px`;
        });

        lastScrollPosition = currentScrollPosition;
        lastScrollTime = currentTime;
    });

    // Enhanced Navbar Animation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.transform = 'translateY(0)';
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling with Enhanced Easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Section Animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate progress bars with sequential timing
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach((bar, index) => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, index * 200);
                });

                // Add floating animation to cards
                const cards = entry.target.querySelectorAll('.milestone-card, .feature-card');
                cards.forEach((card, index) => {
                    card.style.animation = `floating 3s ease-in-out ${index * 0.2}s infinite`;
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Enhanced Glitch Effect for Hero Title
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        let glitchInterval;

        function triggerGlitch() {
            glitchText.style.animation = 'none';
            void glitchText.offsetWidth;
            glitchText.style.animation = null;

            // Random timing for next glitch
            clearInterval(glitchInterval);
            glitchInterval = setTimeout(triggerGlitch, 2000 + Math.random() * 3000);
        }

        triggerGlitch();
    }

    // Window resize handler
    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // Add particle effects to buttons
    document.querySelectorAll('.cyber-button').forEach(button => {
        button.addEventListener('mouseover', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1000);
        });
    });
});