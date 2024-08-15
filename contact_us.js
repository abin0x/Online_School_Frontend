// document.getElementById('contactForm').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const name = document.getElementById('name').value;
//     const phone = document.getElementById('phone').value;
//     const problem = document.getElementById('problem').value;
//     const feedbackElement = document.getElementById('formFeedback');

//     try {
//         const response = await fetch('https://onlineschool-im71.onrender.com/api/contact/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRFToken': getCookie('csrftoken') // If using CSRF protection
//             },
//             body: JSON.stringify({ name, phone, problem })
//         });

//         if (response.ok) {
//             feedbackElement.style.color = 'green';
//             feedbackElement.textContent = 'Form submitted successfully!';
//             feedbackElement.style.display = 'block';
//         } else {
//             const errorData = await response.json();
//             feedbackElement.style.color = 'red';
//             feedbackElement.textContent = 'Error: ' + JSON.stringify(errorData);
//             feedbackElement.style.display = 'block';
//         }
//     } catch (error) {
//         feedbackElement.style.color = 'red';
//         feedbackElement.textContent = 'An error occurred while submitting the form.';
//         feedbackElement.style.display = 'block';
//     }
// });

// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }



// Modal functionality
const modal = document.getElementById("contactModal");
const btn = document.getElementById("contact-teacher-btn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Form submission and feedback
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const problem = document.getElementById('problem').value;
    const feedbackElement = document.getElementById('formFeedback');

    try {
        const response = await fetch('https://onlineschool-im71.onrender.com/api/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // If using CSRF protection
            },
            body: JSON.stringify({ name, phone, problem })
        });

        if (response.ok) {
            feedbackElement.style.color = 'green';
            feedbackElement.textContent = 'Form submitted successfully!';
            feedbackElement.style.display = 'block';
        } else {
            const errorData = await response.json();
            feedbackElement.style.color = 'red';
            feedbackElement.textContent = 'Error: ' + JSON.stringify(errorData);
            feedbackElement.style.display = 'block';
        }
    } catch (error) {
        feedbackElement.style.color = 'red';
        feedbackElement.textContent = 'An error occurred while submitting the form.';
        feedbackElement.style.display = 'block';
    }
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
