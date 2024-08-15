document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id'); // Get course ID from URL
    const apiUrl = `https://onlineschool-im71.onrender.com/api/courses/${courseId}`;
    const token = localStorage.getItem('authToken');

    // Fetch course details
    function fetchCourseDetails() {
        fetch(apiUrl, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            document.getElementById('description').value = data.description;
            document.getElementById('department').value = data.department;
            
            const imagePreview = document.getElementById('image-preview');
            if (data.image) {
                imagePreview.src = data.image;
                imagePreview.style.display = 'block'; // Show image preview
            } else {
                imagePreview.style.display = 'none'; // Hide if no image
            }
        })
        .catch(error => console.error('Error fetching course details:', error));
    }

    // Handle form submission for updating course
    const form = document.getElementById('edit-course-form');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(form);
        formData.append('id', courseId); // Append the course ID

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`
                // Note: Do not set Content-Type for FormData
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Course updated successfully.');
                window.location.href = 'teacher_dashboard.html'; // Redirect after success
            } else {
                alert('Failed to update course.');
            }
        })
        .catch(error => console.error('Error updating course:', error));
    });

    // Handle course deletion
    const deleteButton = document.getElementById('delete-course');
    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this course?')) {
            fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Course deleted successfully.');
                    window.location.href = 'teacher_dashboard.html'; // Redirect after success
                } else {
                    alert('Failed to delete course.');
                }
            })
            .catch(error => console.error('Error deleting course:', error));
        }
    });

    fetchCourseDetails(); 
});
