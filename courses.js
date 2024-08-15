document.addEventListener('DOMContentLoaded', function () {
    const coursesContainer = document.getElementById('course-list');
    const departmentFilter = document.getElementById('department-filter');
    const apiUrl = 'https://onlineschool-im71.onrender.com/api/courses';

    function truncateDescription(description, wordLimit) {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    }

    function createCourseCard(course) {
        const description = truncateDescription(course.description, 8);
        const imageUrl = course.image_url || 'path/to/default/image.png'; // Use a default image if none provided

        return `
            <div class="course-card">
                <div class="badge">${course.department}</div>
                <img src="${imageUrl}" alt="${course.title}">
                
                <div class="course-content">
                    <div class="course-info">
                        <span>50+ Students</span>
                        <span class="rating">★★★★☆ (20+)</span>
                    </div>
                    <h3>${course.title}</h3>
                    <p>${description}</p>
                    <p>Department: ${course.department}</p>
                    <p>Instructor: ${course.teacher.first_name} ${course.teacher.last_name}</p>
                    
                    <a href="course-details.html?id=${course.id}" class="enroll-now" data-id="${course.id}">Enroll Now →</a>
                </div>
            </div>
        `;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function fetchCourses(department) {
        let url = apiUrl;
        if (department) {
            url += `?department=${department}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const shuffledCourses = shuffleArray(data).slice(0, 8); 
                    let coursesHtml = '';
                    shuffledCourses.forEach(course => {
                        coursesHtml += createCourseCard(course);
                    });
                    coursesContainer.innerHTML = coursesHtml;
                } else {
                    coursesContainer.innerHTML = '<p>No courses available at the moment.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                coursesContainer.innerHTML = '<p>Failed to load courses. Please try again later.</p>';
            });
    }

    fetchCourses();

    departmentFilter.addEventListener('change', function () {
        const selectedDepartment = this.value;
        fetchCourses(selectedDepartment);
    });
});
