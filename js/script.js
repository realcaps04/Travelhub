// ============================================
// Hamburger Menu Toggle Functionality
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Toggle hamburger menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle active classes
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded attribute
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Close menu when clicking on a link (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            if (!isClickInsideNav && !isClickOnToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// ============================================
// Contact Form Validation & Submission
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Email validation pattern
    const emailPattern = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            nameError.textContent = 'Name is required';
            nameInput.setCustomValidity('Name is required');
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.setCustomValidity('Name must be at least 2 characters');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.setCustomValidity('');
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.setCustomValidity('Email is required');
            return false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.setCustomValidity('Please enter a valid email address');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.setCustomValidity('');
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            messageError.textContent = 'Message is required';
            messageInput.setCustomValidity('Message is required');
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.setCustomValidity('Message must be at least 10 characters');
            return false;
        } else {
            messageError.textContent = '';
            messageInput.setCustomValidity('');
            return true;
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', function() {
        if (nameError.textContent !== '') {
            validateName();
        }
    });
    
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (emailError.textContent !== '') {
            validateEmail();
        }
    });
    
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', function() {
        if (messageError.textContent !== '') {
            validateMessage();
        }
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                // Show success message
                successMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                successMessage.classList.add('show');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 5000);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Focus on first invalid field
                if (!isNameValid) {
                    nameInput.focus();
                } else if (!isEmailValid) {
                    emailInput.focus();
                } else if (!isMessageValid) {
                    messageInput.focus();
                }
            }
        });
    }
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

