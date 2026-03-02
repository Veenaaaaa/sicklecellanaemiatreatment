// Modern JavaScript for Sickle Cell Anaemia Treatment Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animate on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .method-card, .testimonial-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form Submission
    const consultationForm = document.getElementById('consultationForm');

    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                alert('Thank you for your inquiry! We will contact you shortly to schedule your consultation.');

                // Reset form
                consultationForm.reset();

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // In production, you would send this to your backend
                console.log('Form Data:', data);
            }, 2000);
        });
    }

    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-item h3, .highlight h4');

    const animateCounter = (element) => {
        const target = element.innerText;
        const number = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < number) {
                element.innerText = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.innerText = number + suffix;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        counterObserver.observe(stat);
    });

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.bar-fill');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Lazy Loading Images
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Testimonial Carousel (if needed in future)
    let testimonialIndex = 0;

    function rotateTestimonials() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length > 3) {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = 'none';
            });

            for (let i = 0; i < 3; i++) {
                const index = (testimonialIndex + i) % testimonials.length;
                testimonials[index].style.display = 'block';
            }

            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        }
    }

    // Auto-rotate testimonials every 5 seconds (optional)
    // setInterval(rotateTestimonials, 5000);

    // Copy copyright year
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear && copyrightYear.innerHTML.includes('2025')) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2025', currentYear);
    }

    // Print functionality for research PDF
    const printBtn = document.querySelector('.print-research');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // FAQ Accordion (if added)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Accessibility: Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Keyboard navigation for mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // WhatsApp Integration (optional)
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/919223341576?text=Hello, I would like to know more about Sickle Cell Anaemia treatment';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.style.cssText = `
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 100px;
        right: 30px;
        background-color: #25d366;
        color: #FFF;
        border-radius: 50px;
        text-align: center;
        font-size: 30px;
        box-shadow: 2px 2px 3px #999;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    whatsappBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    whatsappBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    document.body.appendChild(whatsappBtn);

    // Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const rating = document.querySelector('input[name="rating"]:checked');
            const name = document.getElementById('reviewName').value;
            const relation = document.getElementById('reviewRelation').value;
            const duration = document.getElementById('reviewDuration').value;
            const reviewText = document.getElementById('reviewText').value;

            if (!rating) {
                alert('Please select a rating');
                return;
            }

            // Get initials from name
            const initials = name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);

            // Create stars HTML
            let starsHTML = '';
            for (let i = 0; i < 5; i++) {
                starsHTML += '<i class="fas fa-star"></i>';
            }

            // Get relation text
            const relationText = document.querySelector(`#reviewRelation option[value="${relation}"]`).text;

            // Create new testimonial card
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.innerHTML = `
                <div class="stars">${starsHTML}</div>
                <p>"${reviewText}"</p>
                <div class="testimonial-author">
                    <div class="author-icon">${initials}</div>
                    <div>
                        <h4>${name}</h4>
                        <span>${duration || relationText}</span>
                    </div>
                </div>
            `;

            // Add to testimonials grid
            const testimonialsGrid = document.querySelector('.testimonials-grid');
            testimonialsGrid.appendChild(testimonialCard);

            // Scroll to the new testimonial
            setTimeout(() => {
                testimonialCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);

            // Reset form
            reviewForm.reset();

            // Show success message
            alert('Thank you for sharing your review! Your testimonial has been added.');
        });
    }

    console.log('Sickle Cell Anaemia Treatment Website - Loaded Successfully');
    console.log('For more information, visit: www.sicklecellanaemiatreatment.com');
});

// Service Worker Registration (for PWA support - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js');
    });
}
