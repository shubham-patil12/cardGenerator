import { LightningElement } from 'lwc';

export default class ContactCard extends LightningElement {
    name = '';
    email = '';
    city = '';
    showCard = false;
    photoUrl = '';

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleCityChange(event) {
        this.city = event.target.value;
    }

    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.photoUrl = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    generateCard() {
        if (!this.name || !this.email || !this.city) {
            alert('Please fill all the fields');
            return;
        }

        if (!this.validateEmail(this.email)) {
            alert('Please enter a valid email address');
            return;
        }

        this.showCard = true;
    }

    validateEmail(email) {
        // Simple regex for basic validation
        let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    resetForm() {
        this.name = '';
        this.email = '';
        this.city = '';
        this.photoUrl = '';
        this.showCard = false;

        // Clear input fields visually
        const inputs = this.template.querySelectorAll('lightning-input');
        inputs.forEach(input => input.value = '');
    }
}
