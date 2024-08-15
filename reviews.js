document.addEventListener('DOMContentLoaded', function () {
    const reviewContainer = document.getElementById('review-cards');
    let reviews = [];
    let currentIndex = 0;
    const reviewsPerPage = 4;

    fetch('https://onlineschool-im71.onrender.com/api/reviews')
        .then(response => response.json())
        .then(data => {
            reviews = data;
            if (reviews.length > 0) {
                displayReviews(currentIndex);
            }
        })
        .catch(error => console.error('Error fetching reviews:', error));
// const imageUrl = review.image ? `https://onlineschool-im71.onrender.com${review.image}` : './images/default-avatar.png';
    function displayReviews(startIndex) {
        reviewContainer.innerHTML = ''; 

        const endIndex = Math.min(startIndex + reviewsPerPage, reviews.length);

        for (let i = startIndex; i < endIndex; i++) {
            const review = reviews[i];
            const reviewCard = document.createElement('div');
            reviewCard.className = 'custom-review-card';

            const imageUrl = review.image ? `${review.image}` : './images/default-avatar.png';

            reviewCard.innerHTML = `
                <img src="${imageUrl}" alt="Reviewer Image">
                <p class="custom-review-quote">"${review.comment}"</p>
                <p class="custom-review-author">${review.user}</p>
                <p class="custom-review-author">${review.course.title}</p>
                <p class="custom-review-author">${review.rating}</p>
                <p class="custom-review-author">Instructor:${review.teacher_name.username}</p>
                <p class="custom-review-date">${new Date(review.created_at).toLocaleDateString()}</p>
            `;

            reviewContainer.appendChild(reviewCard);
        }
    }

    setInterval(() => {
        if (reviews.length > 0) {
            currentIndex = (currentIndex + reviewsPerPage) % reviews.length;
            displayReviews(currentIndex);
        }
    }, 3000);
});
