// ==================== USER TYPE SWITCHING ====================
function switchUserType(type) {
    // Update active button
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Hide all form sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected form section
    const formId = type + 'Form';
    document.getElementById(formId).classList.add('active');
}

// ==================== FORM VALIDATION ====================
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get active user type
    const activeType = document.querySelector('.type-btn.active').textContent.toLowerCase();
    let isValid = true;
    let errorMessages = [];

    // Validate based on user type
    if (activeType.includes('patient')) {
        isValid = validatePatientForm(errorMessages);
    } else if (activeType.includes('doctor')) {
        isValid = validateDoctorForm(errorMessages);
    } else if (activeType.includes('admin')) {
        isValid = validateAdminForm(errorMessages);
    }

    // Validate common fields
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    if (password.length < 8) {
        isValid = false;
        errorMessages.push('Password must be at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
        isValid = false;
        errorMessages.push('Password must contain uppercase letter');
    }

    if (!/[0-9]/.test(password)) {
        isValid = false;
        errorMessages.push('Password must contain number');
    }

    if (!/[!@#$%^&*]/.test(password)) {
        isValid = false;
        errorMessages.push('Password must contain special character (!@#$%^&*)');
    }

    if (password !== confirmPassword) {
        isValid = false;
        errorMessages.push('Passwords do not match');
    }

    if (!terms) {
        isValid = false;
        errorMessages.push('You must agree to terms and conditions');
    }

    if (isValid) {
        showSuccessMessage();
        // Reset form
        signupForm.reset();
        // Reset user type to patient
        document.querySelectorAll('.type-btn').forEach((btn, index) => {
            if (index === 0) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        document.getElementById('patientForm').classList.add('active');
    } else {
        showErrorMessage(errorMessages);
    }
});

// ==================== PATIENT FORM VALIDATION ====================
function validatePatientForm(errorMessages) {
    const name = document.getElementById('patientName').value.trim();
    const dob = document.getElementById('patientDOB').value;
    const gender = document.getElementById('patientGender').value;
    const phone = document.getElementById('patientPhone').value.trim();
    const email = document.getElementById('patientEmail').value.trim();
    const address = document.getElementById('patientAddress').value.trim();

    let isValid = true;

    if (name.length < 3) {
        isValid = false;
        errorMessages.push('Name must be at least 3 characters');
    }

    if (!dob) {
        isValid = false;
        errorMessages.push('Date of birth is required');
    }

    if (!gender) {
        isValid = false;
        errorMessages.push('Gender selection is required');
    }

    if (!isValidPhone(phone)) {
        isValid = false;
        errorMessages.push('Invalid phone number format');
    }

    if (!isValidEmail(email)) {
        isValid = false;
        errorMessages.push('Invalid email format');
    }

    if (address.length < 5) {
        isValid = false;
        errorMessages.push('Address must be at least 5 characters');
    }

    return isValid;
}

// ==================== DOCTOR FORM VALIDATION ====================
function validateDoctorForm(errorMessages) {
    const name = document.getElementById('doctorName').value.trim();
    const license = document.getElementById('doctorLicense').value.trim();
    const specialty = document.getElementById('doctorSpecialty').value;
    const phone = document.getElementById('doctorPhone').value.trim();
    const email = document.getElementById('doctorEmail').value.trim();
    const experience = document.getElementById('doctorExperience').value;

    let isValid = true;

    if (name.length < 3) {
        isValid = false;
        errorMessages.push('Name must be at least 3 characters');
    }

    if (license.length < 5) {
        isValid = false;
        errorMessages.push('Invalid license number format');
    }

    if (!specialty) {
        isValid = false;
        errorMessages.push('Specialty selection is required');
    }

    if (!isValidPhone(phone)) {
        isValid = false;
        errorMessages.push('Invalid phone number format');
    }

    if (!isValidEmail(email)) {
        isValid = false;
        errorMessages.push('Invalid email format');
    }

    if (experience < 0 || experience > 70) {
        isValid = false;
        errorMessages.push('Experience years must be between 0 and 70');
    }

    return isValid;
}

// ==================== ADMIN FORM VALIDATION ====================
function validateAdminForm(errorMessages) {
    const name = document.getElementById('adminName').value.trim();
    const clinicName = document.getElementById('adminClinicName').value.trim();
    const position = document.getElementById('adminPosition').value.trim();
    const phone = document.getElementById('adminPhone').value.trim();
    const email = document.getElementById('adminEmail').value.trim();
    const address = document.getElementById('adminClinicAddress').value.trim();

    let isValid = true;

    if (name.length < 3) {
        isValid = false;
        errorMessages.push('Name must be at least 3 characters');
    }

    if (clinicName.length < 3) {
        isValid = false;
        errorMessages.push('Clinic name must be at least 3 characters');
    }

    if (position.length < 3) {
        isValid = false;
        errorMessages.push('Position must be at least 3 characters');
    }

    if (!isValidPhone(phone)) {
        isValid = false;
        errorMessages.push('Invalid phone number format');
    }

    if (!isValidEmail(email)) {
        isValid = false;
        errorMessages.push('Invalid email format');
    }

    if (address.length < 5) {
        isValid = false;
        errorMessages.push('Address must be at least 5 characters');
    }

    return isValid;
}

// ==================== EMAIL VALIDATION ====================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== PHONE VALIDATION ====================
function isValidPhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ==================== SUCCESS MESSAGE ====================
function showSuccessMessage() {
    const message = `
        <div class="alert alert-success" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.5s ease;
        ">
            <strong>✓ Success!</strong><br>
            Account created successfully. Check your email for verification.
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', message);

    // Remove message after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert-success');
        if (alert) {
            alert.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => alert.remove(), 500);
        }
    }, 5000);
}

// ==================== ERROR MESSAGE ====================
function showErrorMessage(errorMessages) {
    const errorList = errorMessages.map(error => `<li>✗ ${error}</li>`).join('');
    const message = `
        <div class="alert alert-error" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 20px 30px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            max-width: 400px;
            animation: slideInRight 0.5s ease;
        ">
            <strong>⚠ Validation Errors:</strong>
            <ul style="margin: 10px 0 0 20px; padding: 0;">
                ${errorList}
            </ul>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', message);

    // Remove message after 8 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert-error');
        if (alert) {
            alert.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => alert.remove(), 500);
        }
    }, 8000);
}

// ==================== ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('ClinicCare - Professional Health Management System');
    console.log('Welcome to your clinic management solution!');
});
