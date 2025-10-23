
function handleNewsletterSubmission(e) {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const messageElement = document.getElementById('newsletter-message');
    const email = emailInput.value;

    if (email && email.includes('@')) {
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

        messageElement.textContent = 'Thank you for subscribing!';
        messageElement.style.color = 'green';
        emailInput.value = '';
    } else {
        messageElement.textContent = 'Please enter a valid email address.';
        messageElement.style.color = 'red';
    }
}

function handleReportSubmission(e) {
    e.preventDefault();
    const detailsInput = document.getElementById('lead-details');
    const messageElement = document.getElementById('report-message');
    const details = detailsInput.value;

    if (details.trim() !== '') {
        let reports = JSON.parse(localStorage.getItem('leadReports')) || [];
        reports.push(details);
        localStorage.setItem('leadReports', JSON.stringify(reports));

        messageElement.textContent = 'Report submitted successfully!';
        messageElement.style.color = 'green';
        detailsInput.value = '';
    } else {
        messageElement.textContent = 'Please provide details for the report.';
        messageElement.style.color = 'red';
    }
}

export function initializeForms() {
    const newsletterForm = document.getElementById('newsletter-form');
    const reportLeadForm = document.getElementById('report-lead-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
    if (reportLeadForm) {
        reportLeadForm.addEventListener('submit', handleReportSubmission);
    }
}