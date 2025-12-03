document.addEventListener('DOMContentLoaded', () => {
    const betaForm = document.getElementById('betaForm');
    const formMessage = document.getElementById('formMessage');
    const loader = document.querySelector('.loader');
    const btnText = document.querySelector('.btn-text');

    // REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwnhnRVDCrNndOZynekjnSW-1hXR0ilGyZf0Es9KFeXSNE64J80KgYNBr0g5ZFs5E8G9g/exec';

    if (betaForm) {
        betaForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loader
            loader.classList.remove('hidden');
            btnText.style.opacity = '0';

            const formData = new FormData(betaForm);
            // Google Apps Script expects form data, not JSON for this implementation

            try {
                // Check removed

                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.result === 'success') {
                    console.log('Form submitted successfully');
                    // Show success message
                    formMessage.textContent = "Thanks for your interest! We've added you to the list.";
                    formMessage.className = 'form-message success';
                    formMessage.classList.remove('hidden');
                    betaForm.reset();
                } else {
                    throw new Error(result.error || 'Submission failed');
                }

            } catch (error) {
                console.error('Error:', error);
                let errorMessage = "Something went wrong. Please try again.";
                if (error.message.includes('configure')) {
                    errorMessage = "Setup required: Please add your Web App URL to script.js";
                }
                formMessage.textContent = errorMessage;
                formMessage.className = 'form-message error';
                formMessage.classList.remove('hidden');
            } finally {
                // Hide loader
                loader.classList.add('hidden');
                btnText.style.opacity = '1';

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
