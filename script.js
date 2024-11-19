// Adds functionality and interactivity to Sushi Ya Matcha


// Slideshow Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slides');
const totalSlides = slides.length;

// Function to Show Slides
function showSlides() {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    slides[slideIndex].classList.add('active');
    slideIndex = (slideIndex + 1) % totalSlides;
}

// Initialize Slideshow
showSlides();
setInterval(showSlides, 5000);

// Handle Scroll for Header
function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// Reviews Section Logic (Desktop and Mobile)
let isMobile = window.innerWidth <= 768;
let currentReviewIndex = 0;
const reviews = document.querySelectorAll('.reviews-carousel .review');
let mobileInterval;

// Function to Update Review Display
function updateReviewDisplay() {
    if (isMobile) {
        // Mobile: Fade transition between reviews
        reviews.forEach((review, index) => {
            if (index === currentReviewIndex) {
                review.classList.add('active');
            } else {
                review.classList.remove('active');
            }
        });
    } else {
        // Desktop: Ensure all reviews are visible for CSS animation
        reviews.forEach((review) => {
            review.classList.add('visible');
            review.classList.remove('active'); // Remove 'active' class if present
        });
    }
}

// Function to Show Next Review
function showNextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    updateReviewDisplay();
}

// Function to Initialize Review Carousel
function initReviewCarousel() {
    if (isMobile) {
        // Mobile: Initialize for fade effect
        reviews.forEach((review) => {
            review.classList.remove('visible'); // Remove 'visible' class if present
            review.classList.remove('active');  // Remove 'active' class
        });
        currentReviewIndex = 0;
        updateReviewDisplay();
        if (mobileInterval) {
            clearInterval(mobileInterval);
        }
        mobileInterval = setInterval(showNextReview, 5000); // Change review every 5 seconds
    } else {
        // Desktop: Ensure all reviews are visible for CSS animation
        reviews.forEach((review) => {
            review.classList.add('visible');
            review.classList.remove('active'); // Remove 'active' class if present
        });
        if (mobileInterval) {
            clearInterval(mobileInterval);
        }
    }
}

// Adjust behavior on window resize
window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        initReviewCarousel();
    }
});

// Initialize on page load
window.addEventListener('load', initReviewCarousel);

// Parallax Effect for Hero Section
window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    document.querySelectorAll('.slide-inner').forEach((slideInner) => {
        slideInner.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
});

// Reviews Animation on Scroll (Ensure this is kept if necessary)
const reviewsSection = document.querySelector('.google-reviews');
const reviewsSummary = document.querySelector('.reviews-summary');

function showReviews() {
    const rect = reviewsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        reviewsSummary.classList.add('visible');
        if (isMobile) {
            reviews.forEach((review, index) => {
                setTimeout(() => {
                    review.classList.add('active');
                }, index * 200); // Stagger the fade-in of reviews initially
            });
        }
        window.removeEventListener('scroll', showReviews);
    }
}

window.addEventListener('scroll', showReviews);
window.addEventListener('load', showReviews);
