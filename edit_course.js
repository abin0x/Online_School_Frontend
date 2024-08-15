document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id'); // Get course ID from URL
    const apiUrl = `https://onlineschool-im71.onrender.com/api/courses/${courseId}`;
    const token = localStorage.getItem('authToken');

    // Function to upload image to imgBB
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

    // Fetch course details
    async function fetchCourseDetails() {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                document.getElementById('title').value = data.title;
                document.getElementById('description').value = data.description;
                document.getElementById('department').value = data.department;
                
                const imagePreview = document.getElementById('image-preview');
                if (data.image_url) {
                    imagePreview.src = data.image_url;
                    imagePreview.style.display = 'block'; // Show image preview
                } else {
                    imagePreview.style.display = 'none'; // Hide if no image
                }
            } else {
                throw new Error('Failed to fetch course details');
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    }

    // Handle form submission for updating course
    const form = document.getElementById('edit-course-form');
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(form);
        formData.append('id', courseId); // Append the course ID

        try {
            let imageUrl = '';

            const imageFile = formData.get('image');
            if (imageFile) {
                const imageUploadResponse = await uploadImageToImgBB(imageFile);
                imageUrl = imageUploadResponse.data.url;
            }

            // Prepare the course data
            const courseData = {
                title: formData.get('title'),
                description: formData.get('description'),
                department: formData.get('department'),
                image_url: imageUrl // Send the imgBB URL if available
            };

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json' // Sending data as JSON
                },
                body: JSON.stringify(courseData)
            });

            if (response.ok) {
                alert('Course updated successfully.');
                window.location.href = 'teacher_dashboard.html'; // Redirect after success
            } else {
                const errorData = await response.json();
                alert('Failed to update course: ' + (errorData.detail || 'Please try again.'));
            }
        } catch (error) {
            console.error('Error updating course:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Handle course deletion
    const deleteButton = document.getElementById('delete-course');
    deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this course?')) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                if (response.ok) {
                    alert('Course deleted successfully.');
                    window.location.href = 'teacher_dashboard.html';
                } else {
                    throw new Error('Failed to delete course.');
                }
            } catch (error) {
                console.error('Error deleting course:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    });

    fetchCourseDetails();
});
