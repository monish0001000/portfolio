// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const contactForm = document.getElementById('contactForm');
    const notification = document.getElementById('notification');

    // Mobile navigation toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll reveal animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.skill-card, .project-card, .stat-item, .glass-card');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize scroll animations
    window.addEventListener('scroll', debounce(revealOnScroll, 10));
    
    // Set initial state for animated elements
    document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Run initial animation check
    setTimeout(revealOnScroll, 100);

    // Contact form handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Submit form
        submitForm(name, email, subject, message);
    });

    // Form validation
    function validateForm(name, email, subject, message) {
        let isValid = true;
        
        // Remove existing error styles
        removeErrorStyles();
        
        // Name validation
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Subject validation
        if (subject === '') {
            showError('subject', 'Subject is required');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error function
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.style.borderColor = '#ff4757';
        field.style.background = 'rgba(255, 71, 87, 0.1)';
        field.style.boxShadow = '0 0 20px rgba(255, 71, 87, 0.2)';
        
        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff4757';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.style.marginLeft = '0.5rem';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    // Remove error styles
    function removeErrorStyles() {
        // Remove error styling from all inputs
        document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(field => {
            field.style.borderColor = 'rgba(0, 212, 255, 0.2)';
            field.style.background = 'rgba(0, 212, 255, 0.05)';
            field.style.boxShadow = 'none';
        });
        
        // Remove error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });
    }

    // Submit form function
    function submitForm(name, email, subject, message) {
        // Add loading state to submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Reset button
            submitButton.innerHTML = originalHTML;
            submitButton.disabled = false;
            
            // Clear form
            contactForm.reset();
            
            // Show success notification
            showNotification();
            
            // Log form data (remove in production)
            console.log('Form submitted:', { name, email, subject, message });
            
        }, 2000);
    }

    // Show notification
    function showNotification() {
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-particles, .grid-overlay');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('floating-particles') ? 0.5 : 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // 3D tilt effect for cards
    function addTiltEffect() {
        const cards = document.querySelectorAll('.skill-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Initialize tilt effect after elements are loaded
    setTimeout(addTiltEffect, 500);

    // Typing effect for hero name
    function typeWriter(element, text, speed = 150) {
        let i = 0;
        element.textContent = '';
        element.style.borderRight = '3px solid #00d4ff';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        type();
    }

    // Initialize typing effect
    setTimeout(() => {
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            typeWriter(heroName, 'Monish', 200);
        }
    }, 1000);

    // Glowing cursor effect
    function createGlowCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'glow-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    }

    // Initialize glow cursor on desktop
    if (window.innerWidth > 768) {
        createGlowCursor();
    }

    // Button ripple effect
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize ripple effect
    addRippleEffect();

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });

    // Performance optimization: Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Preload images for better performance
    function preloadImages() {
        const images = [
            'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/4022092/pexels-photo-4022092.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=400'
        ];

        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Initialize image preloading
    preloadImages();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            revealOnScroll();
        }, 500);
    });
});

// Additional CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(0, 212, 255, 0.3);
        border-top: 3px solid #00d4ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10001;
        transform: translate(-50%, -50%);
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);
// ====== TELEGRAM BOT CONTACT FORM ======

// Telegram Bot Config
const TELEGRAM_BOT_TOKEN = "8388274255:AAElpSPu7WGJGl9U9c7YrRP7PsbFshKZAL4";
const TELEGRAM_CHAT_ID = "5932177382";

// Contact form submit
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Stop reload

    const btn = this.querySelector("button");
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Collect form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple validation
    if (!name || !email || !subject || !message) {
        alert("Please fill all fields!");
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        return;
    }

    // Prepare Telegram message
    const telegramMessage = `
📩 Monish_Portfolio Contact Form
=================================

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

=================================
`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage
            })
        });

        const data = await response.json();

        if (data.ok) {
            // Success
            const notify = document.getElementById("notification");
            notify.style.display = "block";
            setTimeout(() => { notify.style.display = "none"; }, 3000);

            this.reset();
        } else {
            alert("Failed to send message. Try again!");
            console.error("Telegram error:", data);
        }

    } catch (err) {
        alert("Something went wrong. Try again later!");
        console.error("Fetch error:", err);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
});
