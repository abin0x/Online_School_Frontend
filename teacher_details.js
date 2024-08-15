document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const teacherId = urlParams.get('id');

    const apiUrl = `https://onlineschool-im71.onrender.com/api/users/${teacherId}`;
  
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const imageUrl = data.profile_image ? data.profile_image : 'https://via.placeholder.com/200';
                document.getElementById('teacher-image').innerHTML = `<img src="${imageUrl}" alt="${data.first_name}" style="width: 200px; height: 200px;">`;
                document.getElementById('teacher-name').textContent = `${data.first_name} ${data.last_name}`;
                document.getElementById('username-info').textContent = data.username;
                document.getElementById('email-info').textContent = data.email;

                
                
            } 
            else 
            {
                console.error('Teacher not found.');
            }
        })
        .catch(error => console.error("Error fetching teacher details:", error));
});
