
    document.addEventListener('DOMContentLoaded', function() {
        // Welcome alert
        alert('Are you ready to visit my portfolio website?');

        // Initialize AOS animation
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            // Set to true for better performance; animations will only run once.
            once: true
        });

        // Resume download alert
        const downloadResumeBtn = document.getElementById('downloadResumeBtn');
        if (downloadResumeBtn) {
            downloadResumeBtn.addEventListener('click', () => {
                // Use a short timeout to allow the download to initiate before showing the alert
                setTimeout(() => {
                    alert('downloaded successfully');
                }, 100);
            });
        }

        // Initialize Particles.js for the light theme hero background
        function initParticles() {
            if (document.getElementById('particles-js')) {
                particlesJS('particles-js', {
                    "particles": {
                        "number": {
                            "value": 80,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#007bff" // Blue color
                        },
                        "shape": {
                            "type": "circle",
                        },
                        "opacity": {
                            "value": 2,
                            "random": true,
                        },
                        "size": {
                            "value": 3,
                            "random": true,
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": "#adb5bd", // A lighter grey for lines
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "bounce": false,
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": { "enable": true, "mode": "grab" },
                            "onclick": { "enable": true, "mode": "push" },
                            "resize": true
                        },
                        "modes": {
                            "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                            "push": { "particles_nb": 4 }
                        }
                    },
                    "retina_detect": true
                });
            }
        }

        initParticles();

        // Theme switching functionality
        const themeItems = document.querySelectorAll('.theme-item');
        const htmlElement = document.documentElement;
        
        // Improved theme colors
        const themes = {
            light: {
                '--primary-color': '#0d6efd',
                '--secondary-color': '#6c757d',
                '--dark-bg': '#f8f9fa',
                '--dark-text': '#212529',
                '--dark-card': '#ffffff',
                '--carousel-arrow-color': '#000' // Black for light mode
            },
            dark: {
                '--primary-color': '#4da6ff',
                '--secondary-color': '#adb5bd',
                '--dark-bg': '#1a1a2e',
                '--dark-text': '#e6e6e6',
                '--dark-card': '#16213e',
                '--carousel-arrow-color': '#fff' // White for dark mode
            }
        };
        
        // Check for saved theme preference or use system preference
        const savedTheme = localStorage.getItem('theme') || 'system';
        setTheme(savedTheme);
        
        // Set active theme in dropdown
        themeItems.forEach(item => {
            if (item.dataset.theme === savedTheme) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Theme switcher click handler
        themeItems.forEach(item => {
            item.addEventListener('click', function() {
                const selectedTheme = this.dataset.theme;
                setTheme(selectedTheme);
                localStorage.setItem('theme', selectedTheme);
                
                // Update active state in dropdown
                themeItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        function updateThemeButton(selectedTheme) {
            const themeSwitcherBtn = document.getElementById('theme-switcher-btn');
            if (!themeSwitcherBtn) return;
            const themeIcon = themeSwitcherBtn.querySelector('i');
            const icons = {
                light: 'bi-sun',
                dark: 'bi-moon',
                system: 'bi-laptop'
            };
            if (themeIcon) {
                // Use the icon for the selected theme, defaulting to system icon
                themeIcon.className = `bi ${icons[selectedTheme] || 'bi-laptop'}`;
            }
        }
        
        function setTheme(theme) {
            updateThemeButton(theme); // Update button icon to reflect the user's selection
            if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                applyTheme(systemTheme);
                htmlElement.setAttribute('data-bs-theme', systemTheme);
            } else {
                applyTheme(theme);
                htmlElement.setAttribute('data-bs-theme', theme);
            }
        }
        
        function applyTheme(theme) {
            const root = document.documentElement;
            const themeColors = themes[theme];
            const navbar = document.querySelector('.navbar.fixed-top');
            
            for (const [property, value] of Object.entries(themeColors)) {
                root.style.setProperty(property, value);
            }

            if (navbar) {
                if (theme === 'light') {
                    navbar.classList.remove('navbar-dark', 'bg-dark', 'bg-opacity-75');
                    navbar.classList.add('navbar-light', 'bg-light', 'shadow-sm');
                } else { // dark
                    navbar.classList.remove('navbar-light', 'bg-light', 'shadow-sm', 'bg-opacity-75');
                    navbar.classList.add('navbar-dark', 'bg-dark');
                }
            }
        }
        
        // Watch for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('theme') === 'system') {
                setTheme('system');
            }
        });
        
        // Typing effect for hero section
        const typingText = document.getElementById('typing-text');
        const texts = [
            "passionate front-end developer.",
            "specialist in HTML5, CSS3, & Bootstrap.",
            "responsive web designer.",
            "code newbie (but determined!)."
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end of text
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before typing next text
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing effect after a short delay
        setTimeout(type, 1000);
        
        // Auto-rotate education carousel for a smooth, automatic slide effect
        const eduCarousel = new bootstrap.Carousel('#educationCarousel', {
            interval: 4000, // 4 seconds for a relaxed pace
            ride: 'carousel',
            pause: 'hover' // Pauses the sliding on mouse hover
        });
        
        // Back to top button
        const backToTopButton = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Close offcanvas menu on nav-link click
        document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const offcanvasElement = document.querySelector('#navbarNav');
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (bsOffcanvas && offcanvasElement.classList.contains('show')) {
                    bsOffcanvas.hide();
                }
            });
        });

        // Contact Form Submission using Web3Forms
        const contactForm = document.getElementById('contact-form');
        const formResult = document.getElementById('form-result');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);
            
            formResult.innerHTML = "Sending...";
            formResult.className = 'alert alert-info mt-3';

            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    if (response.status == 200) {
                        alert('Form submitted successfully');
                        formResult.innerHTML = '';
                        formResult.className = '';
                    } else {
                        let jsonResponse = await response.json();
                        formResult.innerHTML = jsonResponse.message || "Oops! Something went wrong.";
                        formResult.className = 'alert alert-danger mt-3';
                    }
                })
                .catch(error => {
                    formResult.innerHTML = "Oops! Something went wrong and we couldn't send your message.";
                    formResult.className = 'alert alert-danger mt-3';
                })
                .finally(() => {
                    contactForm.reset();
                    setTimeout(() => {
                        formResult.innerHTML = '';
                        formResult.className = '';
                    }, 6000); // Hide message after 6 seconds
                });
        });
    });
