document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.lazy');

    const lazyLoad = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => {
            image.removeAttribute('data-src');
            image.classList.add('loaded');
        };
    };

    const options = {
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    lazyImages.forEach(image => {
        observer.observe(image);
    });
});
