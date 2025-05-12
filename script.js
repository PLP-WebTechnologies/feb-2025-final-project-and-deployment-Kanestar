document.addEventListener('DOMContentLoaded', function() {
    // Get both nav links and any elements with data-page attribute
    const navLinks = document.querySelectorAll('nav a, a[data-page]');
    const contentSections = document.querySelectorAll('main > section');
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');
    const loader = document.getElementById('loader');
    const scrollToTopButton = document.getElementById('scrollToTop');

    console.log('Found links:', navLinks.length);
    navLinks.forEach(link => console.log('Link data-page:', link.getAttribute('data-page')));

    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });

    // Scroll to top button visibility
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Function to show a specific page with loading animation
    function showPage(pageId) {
        loader.classList.remove('hidden');
        
        setTimeout(() => {
            contentSections.forEach(section => {
                section.classList.remove('show');
            });
            
            const targetSection = document.getElementById(pageId);
            if (targetSection) {
                targetSection.classList.add('show');
            }

            // Update active state of navigation links
            navLinks.forEach(link => {
                if (link.getAttribute('data-page') === pageId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Scroll to top when changing pages
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            setTimeout(() => {
                loader.classList.add('hidden');
            }, 300);
        }, 300);
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    // Initial display: Show the 'home' page
    showPage('home');

    // Contact Form Validation with enhanced feedback
    if (contactForm) {
        const inputs = [nameInput, emailInput, messageInput];
        
        // Add focus effects
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = true;

            // Validate Name
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Please enter your name.';
                nameInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                nameError.textContent = '';
                nameInput.parentElement.classList.remove('error');
            }

            // Validate Email
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Please enter your email.';
                emailInput.parentElement.classList.add('error');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                emailInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                emailError.textContent = '';
                emailInput.parentElement.classList.remove('error');
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Please enter your message.';
                messageInput.parentElement.classList.add('error');
                isValid = false;
            } else {
                messageError.textContent = '';
                messageInput.parentElement.classList.remove('error');
            }

            if (isValid) {
                // Show loading state
                loader.classList.remove('hidden');
                
                // Simulate form submission
                setTimeout(() => {
                    console.log('Form submitted successfully!');
                    contactForm.reset();
                    successMessage.style.display = 'block';
                    loader.classList.add('hidden');
                    
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 3000);
                }, 1000);
            }
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
});