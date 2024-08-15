
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('create-course-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('Authentication token not found. Please log in again.');
            return;
        }

        try {
            // Upload the image to imgBB
            const imageFile = formData.get('image');
            let imageUrl = '';

            if (imageFile) {
                const imageUploadResponse = await uploadImageToImgBB(imageFile);
                imageUrl = imageUploadResponse.data.url;
            }

            // Prepare the course data
            const courseData = {
                title: formData.get('title'),
                description: formData.get('description'),
                department: formData.get('department'),
                image_url: imageUrl // Send the imgBB URL
            };

            // Send the course data to the API
            const response = await fetch('https://onlineschool-im71.onrender.com/api/courses', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json' // Sending data as JSON
                },
                body: JSON.stringify(courseData)
            });

            if (response.ok) {
                alert('Course created successfully!');
                window.location.href = 'teacher_dashboard.html';
            } else {
                const errorData = await response.json();
                alert('Failed to create course: ' + (errorData.detail || 'Please try again.'));
            }
        } catch (error) {
            console.error('Error creating course:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    async function uploadImageToImgBB(imageFile) {
        const apiKey = 'd18b1e9613f8b8cd33d7da9d7d9b7322';
        const formData = new FormData();
        formData.append('key', apiKey);
        formData.append('image', imageFile);

        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to upload image to imgBB');
        }
    }
});
// abin 