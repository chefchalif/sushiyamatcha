// Begin JavaScript File
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

// Reviews Animation on Scroll
const reviewsSection = document.querySelector('.google-reviews');
const reviewsSummary = document.querySelector('.reviews-summary');
const reviews = document.querySelectorAll('.review');

function showReviews() {
    const rect = reviewsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        reviewsSummary.classList.add('visible');
        reviews.forEach((review, index) => {
            setTimeout(() => {
                review.classList.add('visible');
            }, index * 200); // Stagger the fade-in of reviews
        });
        window.removeEventListener('scroll', showReviews);
    }
}

window.addEventListener('scroll', showReviews);
window.addEventListener('load', showReviews);

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    document.querySelectorAll('.slide-inner').forEach((slideInner) => {
        slideInner.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
});

// Mobile Review Carousel
let mobileSlideIndex = 0;
const mobileReviews = document.querySelectorAll('.reviews-carousel .review');
const totalMobileReviews = mobileReviews.length;

function showMobileReview() {
    mobileReviews.forEach((review) => {
        review.classList.remove('active');
    });

    mobileReviews[mobileSlideIndex].classList.add('active');
    mobileSlideIndex = (mobileSlideIndex + 1) % totalMobileReviews;
}

function initMobileCarousel() {
    if (window.innerWidth <= 768) {
        showMobileReview();
        setInterval(showMobileReview, 5000);
    }
}

window.addEventListener('resize', initMobileCarousel);
window.addEventListener('load', initMobileCarousel);
