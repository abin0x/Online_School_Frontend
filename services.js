document.addEventListener('DOMContentLoaded', function () {
    const servicesSlider = document.querySelector('.services-slider');
    const apiUrl = 'https://onlineschool-im71.onrender.com/api/services/';
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    function truncateText(text, wordLimit) {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    }

    function createServiceCard(service) {
        const truncatedDescription = truncateText(service.description, 15); // Adjust the word limit as needed
        return `
            <div class="service-card">
                <img src="${service.image}" alt="${service.title}">
                <h3>${service.name}</h3>
                <p>${truncatedDescription}</p>
            </div>
        `;
    }

    function fetchServices() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    let servicesHtml = '';
                    data.forEach(service => {
                        servicesHtml += createServiceCard(service);
                    });
                    servicesSlider.innerHTML = servicesHtml;
                    
                    // Initialize Slick slider
                    $(servicesSlider).slick({
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        arrows: false, // Hide default arrows
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 2
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1
                                }
                            }
                        ]
                    });
                    
                    // Add custom navigation button functionality
                    $(prevButton).on('click', function () {
                        $(servicesSlider).slick('slickPrev');
                    });

                    $(nextButton).on('click', function () {
                        $(servicesSlider).slick('slickNext');
                    });
                } else {
                    servicesSlider.innerHTML = '<p>No services available at the moment.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                servicesSlider.innerHTML = '<p>Failed to load services. Please try again later.</p>';
            });
    }

    fetchServices();
});
