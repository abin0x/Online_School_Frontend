fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    const navElement = document.getElementById("nav-element");

    const token = localStorage.getItem("authToken");
    if (token) {
      navElement.innerHTML += `
                  <a href="create_course.html" class="btn">Create New Course</a>
                  <a class="btn" id="logout-button" onclick="handleLogout()">Logout</a>
                `;
    } else {
      navElement.innerHTML += `
                <a href="register.html" class="btn">Signup</a>
                <a href="login.html" class="btn">Login</a>
                `;
    }
  })
  .catch((err) => console.log("Error loading navbar", err));
