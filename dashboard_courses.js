document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://onlineschool-im71.onrender.com/api/courses?dashboard=true';
    const token = localStorage.getItem('authToken');

    async function fetchCourses() {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const tableBody = document.querySelector('#courses-table tbody');
            tableBody.innerHTML = '';  

            data.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.title}</td>
                    <td>${course.description}</td>
                    <td>${course.department}</td>
                    <td><img src="${course.image}" alt="${course.title}" style="width: 100px;"></td>
                    <td>${course.teacher.username}</td>
                    <td>
                        <a href="edit_course.html?id=${course.id}" class="btn view">Edit</a>
                        <button class="btn btn-danger" onclick="confirmDelete(${course.id})">Delete</button>
                        <a href="course-details.html?id=${course.id}" class="btn" data-id="${course.id}" target="_blank">View</a>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching courses:', error);
            const tableBody = document.querySelector('#courses-table tbody');
            tableBody.innerHTML = '<tr><td colspan="6">Hey Teacher, Failed to load courses. Please try again later.</td></tr>';
        }
    }

    async function deleteCourse(courseId) {
        const url = `https://onlineschool-im71.onrender.com/api/courses/${courseId}`;
        const authToken = localStorage.getItem('authToken');

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                }
            });

            if (response.ok) {
                alert('Course deleted successfully.');
                fetchCourses();
            } else {
                alert('Failed to delete the course. Please check your Teacher permissions.');
                const errorData = await response.json();
            }
        } catch (error) {
            alert('Sorry,error occurred deleting the course.');
        }
    }

    function confirmDelete(courseId) {
        if (confirm('Are you sure you want to delete this course?')) {
            deleteCourse(courseId);
        } else {
            console.log('Course deletion cancelled.');
        }
    }
    fetchCourses();
    window.confirmDelete = confirmDelete;
});
