document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    const courseDetailsUrl = `https://onlineschool-im71.onrender.com/api/courses/${courseId}`;

    fetch(courseDetailsUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('course-title').textContent = data.title;
            document.getElementById('course-description').textContent = data.description;
            document.getElementById('course-rating').textContent = `⭐ ${data.rating || 'N/A'}`;

            // Handle image URLs from imgBB
            const imageUrl = data.image_url ? data.image_url : 'default-image-url'; 
            document.getElementById('course-img').src = imageUrl;
            document.getElementById('course-img').alt = data.title;

            document.getElementById('sidebar-img').src = imageUrl;
            document.getElementById('sidebar-img').alt = data.title;
        })
        .catch(error => {
            console.error('Error fetching course details:', error);
        });

    document.getElementById('enroll-button').addEventListener('click', function () {
        alert('You have successfully enrolled in the course!');
    });
});
