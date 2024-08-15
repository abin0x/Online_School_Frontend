
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});


function sendEmail(event) {
  event.preventDefault();

  const name = document.getElementById('uniqueName').value;
  const email = document.getElementById('uniqueEmail').value;
  const message = document.getElementById('uniqueMessage').value;

  const subject = `Contact Us Form Submission from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  window.location.href = `mailto:mahmudulabin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}



