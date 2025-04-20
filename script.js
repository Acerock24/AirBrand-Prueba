document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prevButtons = document.querySelectorAll('.back');
  const nextButtons = document.querySelectorAll('.next');
  const submitButton = document.getElementById('submit-quiz');
  const quizOptions = document.querySelectorAll('input[name="quiz"]');
  const video = document.getElementById('slide1-video');
  const next1 = document.getElementById('next-1');

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentIndex = index;
  }

  function navigateTo(id) {
    const index = Array.from(slides).findIndex(slide => slide.id === id);
    if (index !== -1) showSlide(index);
  }

  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      if (target) navigateTo(target);
    });
  });

  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      if (target) navigateTo(target);
    });
  });

  if (video && next1) {
    video.addEventListener('ended', () => {
      next1.disabled = false;
    });

    next1.addEventListener('click', () => {
      if (!next1.disabled) showSlide(1);
    });
  }

  if (submitButton) {
    submitButton.addEventListener('click', () => {
      const selected = document.querySelector('input[name="quiz"]:checked');
      if (!selected) {
        alert("Please select an answer.");
        return;
      }

      const isCorrect = selected.getAttribute("data-correct") === "true";

      const newWindow = window.open("", "_blank", "width=1920,height=1080");

      if (isCorrect) {
        newWindow.document.write(`
          <html>
          <head><title>Certificate</title></head>
          <body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center;">
            <div>
              <h1>¡Felicidades! Has completado el curso</h1>
              <p>Este certificado confirma que has completado exitosamente el curso de servicios premium de AirBrand.</p>
              <p><strong>Fecha de finalización:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
          </body>
          </html>
        `);
      } else {
        newWindow.document.write(`
          <html>
          <head><title>Try Again</title></head>
          <body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8d7da; color: #721c24; text-align: center;">
            <div>
              <h1>Oops! Wrong answer</h1>
              <p>Don't give up! Try again, you’ve got this! 💪</p>
              <button onclick="window.opener.focus(); window.close();" style="padding: 10px 20px; font-size: 1em; margin-top: 20px; cursor: pointer;">Quiz</button>
            </div>
          </body>
          </html>
        `);
      }
    });
  }

  showSlide(currentIndex);
});
