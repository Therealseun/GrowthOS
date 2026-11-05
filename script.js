// --- IMPORTANT: PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ---
const GOOGLE_SCRIPT_URL = "YOUR_WEB_APP_URL_HERE";

function navigate(pageId) {
    const pages = ['home-page', 'student-page', 'nysc-page'];
    pages.forEach(id => {
        document.getElementById(id).classList.add('hidden-page');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden-page');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    navigate('home-page');

    // 1. Submit Student Form
    document.getElementById('form-student').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (GOOGLE_SCRIPT_URL === "YOUR_WEB_APP_URL_HERE") {
            alert("Error: The website is not linked to Google Sheets yet. Please read the setup instructions to add your Google Script URL.");
            return;
        }

        const btn = this.querySelector('button[type="submit"]');
        btn.innerText = "Submitting...";
        btn.disabled = true;

        const fd = new FormData(this);
        const params = new URLSearchParams();
        
        // Exact names matching the Google Sheet Columns
        params.append('formType', 'Students Registration');
        params.append('Full Name', fd.get('fullname') || '');
        params.append('Email Address', fd.get('email') || '');
        params.append('Phone Number (WhatsApp)', fd.get('phone') || '');
        params.append('Gender', fd.get('gender') || '');
        params.append('State of Residence', fd.get('state') || '');
        params.append('Local Government Area', fd.get('lga') || '');
        params.append('Name of Institution', fd.get('institution') || '');
        params.append('Institution Type', fd.get('inst_type') || '');
        params.append('Course of Study', fd.get('course') || '');
        params.append('Current Level', fd.get('level') || '');
        params.append('Expected Graduation Year', fd.get('grad_year') || '');
        params.append('Student Status', fd.get('status') || '');
        params.append('Growth OS Interests', fd.getAll('interests').join(', ') || '');
        params.append('Have professional/digital skills?', fd.get('has_skills') || '');
        params.append('List of Skills', fd.get('skills_list') || '');
        params.append('Previous work/internship exp?', fd.get('exp') || '');
        params.append('How did you hear about us?', fd.get('hear') || '');

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: params,
            mode: 'no-cors' // Bypasses browser CORS blocking for simple tracking
        })
        .then(() => {
            alert("Registration Successful!");
            this.reset();
            navigate('home-page');
        })
        .catch(err => {
            alert("Something went wrong. Please try again.");
            console.error(err);
        })
        .finally(() => {
            btn.innerText = "Submit Registration";
            btn.disabled = false;
        });
    });

    // 2. Submit NYSC Form
    document.getElementById('form-nysc').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (GOOGLE_SCRIPT_URL === "YOUR_WEB_APP_URL_HERE") {
            alert("Error: The website is not linked to Google Sheets yet. Please read the setup instructions to add your Google Script URL.");
            return;
        }

        const btn = this.querySelector('button[type="submit"]');
        btn.innerText = "Submitting...";
        btn.disabled = true;

        const fd = new FormData(this);
        const params = new URLSearchParams();
        
        params.append('formType', 'NYSC Registration');
        params.append('Full Name', fd.get('fullname') || '');
        params.append('Email Address', fd.get('email') || '');
        params.append('Phone Number (WhatsApp)', fd.get('phone') || '');
        params.append('Gender', fd.get('gender') || '');
        params.append('State of Residence', fd.get('state') || '');
        params.append('Local Government Area', fd.get('lga') || '');
        params.append('NYSC Status', fd.get('nysc_status') || '');
        params.append('NYSC State of Deployment', fd.get('deployment') || '');
        params.append('Place of Primary Assignment', fd.get('ppa') || '');
        params.append('Batch and Stream', fd.get('batch') || '');
        params.append('Institution Attended', fd.get('inst') || '');
        params.append('Qualification', fd.get('qual') || '');
        params.append('Course of Study', fd.get('course') || '');
        params.append('Graduation Year', fd.get('grad_year') || '');
        params.append('Current Professional Skills', fd.getAll('prof_skills').join(', ') || '');
        params.append('Growth OS Interests', fd.getAll('interests').join(', ') || '');
        params.append('Primary Goal', fd.get('goal') || '');
        params.append('Previous work experience?', fd.get('exp') || '');
        params.append('Currently have a CV?', fd.get('cv') || '');
        params.append('How did you hear about us?', fd.get('hear') || '');

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: params,
            mode: 'no-cors'
        })
        .then(() => {
            alert("Registration Successful!");
            this.reset();
            navigate('home-page');
        })
        .catch(err => {
            alert("Something went wrong. Please try again.");
            console.error(err);
        })
        .finally(() => {
            btn.innerText = "Submit Registration";
            btn.disabled = false;
        });
    });
});
