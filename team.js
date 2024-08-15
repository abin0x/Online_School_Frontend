document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://onlineschool-im71.onrender.com/api/users";
  
// const baseUrl = "https://onlineschool-im71.onrender.com/";
//   const baseUrl = "https://i.ibb.co/";
// const imageUrl = baseUrl + teacher.profile_image;
  fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          const instructorsContainer = document.getElementById("instructors");
          data.forEach((teacher) => {
              console.log("Teacher Data:", teacher);
              const imageUrl =teacher.profile_image;
              console.log("Image URL:", imageUrl);
              const instructorCard = `
                  <div class="instructor-card">
                      <img src="${imageUrl}" alt="${teacher.first_name}">
                      
                      <h3><a href="teacher_detail.html?id=${teacher.id}">${teacher.first_name} ${teacher.last_name}</a></h3>
                      <p>Instructor</p>
                      <div class="share-icon">🚀</div>
                      <div class="social-links">
                          <a href="https://facebook.com/${teacher.username}" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                          <a href="https://twitter.com/${teacher.username}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>
                          <a href="https://instagram.com/${teacher.username}" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                          <a href="https://linkedin.com/in/${teacher.username}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                      </div>
                  </div>
              `;

              instructorsContainer.innerHTML += instructorCard;
          });
      })
      .catch((error) => console.error("Error fetching data:", error));
});
