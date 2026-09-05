/**
 * Gyakorló Feladatsor - Kliensoldali Webprogramozás
 */

// Előre definiált karakterkészletek a könnyebb ellenőrzéshez
const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*'];
const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lowerChars = upperChars.map(c => c.toLowerCase());

const submitBtn = document.getElementById('submitBtn');
const termsEndAnchor = document.getElementById('termsEndAnchor');
const termsBox = document.getElementById('termsBox');

submitBtn.disabled = true;
// Űrlap beküldés megelőzése a demó kedvéért
document.getElementById('registrationForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Sikeres regisztráció!');
});


// Ide jön a megoldás:
// Neptun kód: titok

// 1. feladat

class PasswordInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.input = this.querySelector('input');
        this.reqLength = this.querySelector('#req-length');
        this.reqUpper = this.querySelector('#req-upper');
        this.reqNumber = this.querySelector('#req-number');
        this.reqSpecial = this.querySelector('#req-special');

        // dinamikus gomb
        this.toggleBtn = document.createElement('a');
        this.toggleBtn.textContent = 'Mutat';
        
        this.input.after(this.toggleBtn);

        this.boundTogglePassword = this.togglePassword.bind(this);
        this.boundValidatePassword = this.validatePassword.bind(this);
        
        this.toggleBtn.addEventListener('click', this.boundTogglePassword);
        this.input.addEventListener('input', this.boundValidatePassword);
    }

    disconnectedCallback() {
        if (this.toggleBtn) {
            this.toggleBtn.removeEventListener('click', this.boundTogglePassword);
        }
        if (this.input) {
            this.input.removeEventListener('input', this.boundValidatePassword);
        }
    }

    togglePassword() {
        if (this.input.type === 'password') {
            this.input.type = 'text';
            this.toggleBtn.textContent = 'Rejt';
        } else {
            this.input.type = 'password';
            this.toggleBtn.textContent = 'Mutat';
        }
    }

    validatePassword() {
        const password = this.input.value;
        const chars = password.split('');

        const hasLength = chars.length >= 8;
        this.updateValidationClass(this.reqLength, hasLength);

        const hasUpper = chars.some(char => upperChars.includes(char));
        this.updateValidationClass(this.reqUpper, hasUpper);

        const hasNumber = chars.some(char => !isNaN(char) && char !== ' ');
        this.updateValidationClass(this.reqNumber, hasNumber);

        const hasSpecial = chars.some(char => specialChars.includes(char));
        this.updateValidationClass(this.reqSpecial, hasSpecial);
    }

    updateValidationClass(element, isValid) {
        if (isValid) {
            element.classList.remove('text-danger');
            element.classList.add('text-success');
        } else {
            element.classList.remove('text-success');
            element.classList.add('text-danger');
        }
    }
}

customElements.define('password-input', PasswordInput);

// 2. feladat
function onObserve(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer
const observer = new IntersectionObserver(onObserve, {
    root: termsBox, 
    threshold: 1    
});


observer.observe(termsEndAnchor);






