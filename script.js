/**
 * BLACK CITIZEN APPAREL - Master Controller
 * Author: Your Name
 * Version: 1.0
 */

// 1. INITIALIZE EMAILJS
// Replace "YOUR_PUBLIC_KEY" with your actual key from the EmailJS Dashboard
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       2. SCROLL REVEAL ANIMATION (Intersection Observer)
       ========================================== */
    // This looks for all elements with the "reveal" class and fades them in
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we don't need to watch it anymore
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================
       3. STICKY NAVIGATION LOGIC
       ========================================== */
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.padding = "10px 8%";
            nav.style.background = "rgba(10, 17, 40, 0.95)"; // Slight transparency
        } else {
            nav.style.padding = "20px 8%";
            nav.style.background = "#0a1128"; // Solid Navy
        }
    });


    /* ==========================================
       4. APPOINTMENT FORM HANDLING (EmailJS)
       ========================================== */
    const appointmentForm = document.getElementById('appointment-form');
    const formContainer = document.getElementById('form-container');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // UI Feedback: Change button to 'Loading' state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Request...';
            submitBtn.style.opacity = "0.7";

            // Sending the form via EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with yours
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(() => {
                    // SUCCESS STATE
                    formContainer.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Smooth scroll to the success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    console.log('SUCCESS! Booking request sent.');
                }, (error) => {
                    // ERROR STATE
                    console.error('FAILED...', error);
                    alert("Submission failed. Please check your connection or contact Welcome at 071 147 7662.");
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.opacity = "1";
                });
        });
    }

    /* ==========================================
       5. GALLERY IMAGE PROTECTION & INTERACTION
       ========================================== */
    // Prevents right-clicking on images (optional, for "luxury" feel)
    const galleryImages = document.querySelectorAll('.work-item img');
    galleryImages.forEach(img => {
        img.addEventListener('contextmenu', (e) => e.preventDefault());
    });

});