const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const card = document.getElementById('card_number');
const nameFeedback = document.getElementById('name_feedback');
const emailFeedback = document.getElementById('email_feedback');
const cardFeedback = document.getElementById('card_feedback');

const dnGreen = "#8abd24";
const dnPink = "#e9168c";

document.addEventListener('DOMContentLoaded', function () {
    nameInput.addEventListener('keyup', validateName);
    email.addEventListener('keyup', validateEmail);
    card.addEventListener('keyup', validateCard);
});

submitForm = () => {
    if (validateName() == false || validateEmail() == false || validateCard() == false)
        return false

    console.log("form submitted")
    return true
}

// Name Validation
const validateName = () => {
    testValue = nameInput.value.trim();

    if (testValue.length != 0) {
        var formatValidation = /^[a-zA-Z\s]*$/.test(testValue);

        if (formatValidation == false) {
            nameInput.style.backgroundColor = `${dnPink}`;
            nameFeedback.innerHTML = "Invalid Character.<br>Only letters allowed";
            return false;
        }

        nameInput.style.backgroundColor = `${dnGreen}`
        nameFeedback.innerHTML = "";
        return true;
    }

    nameInput.style.backgroundColor = `${dnPink}`;
    nameFeedback.innerHTML = "This feild can't be blank.";
    return false;
}

// Email Validation
const validateEmail = () => {
    testValue = email.value.trim();

    if (testValue.length != 0) {
        var formatValidation = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(testValue);

        if (formatValidation == false) {
            email.style.backgroundColor = `${dnPink}`;
            emailFeedback.innerHTML = "Invalid Format or Character.<br>Only letter, numbers and the<br>following symbols _-. are allowed.";
            return false;
        }

        email.style.backgroundColor = `${dnGreen}`;
        emailFeedback.innerHTML = "";
        return true;
    }

    email.style.backgroundColor = `${dnPink}`;
    emailFeedback.innerHTML = "This feild can't be blank.";
    return false;
}

// Card Validation
const validateCard = () => {
    testValue = card.value.trim()

    // Check input not blank
    if (testValue.length == 0) {
        card.style.backgroundColor = `${dnPink}`;
        cardFeedback.innerHTML = "This feild can't be blank.";
        return false;
    }

    // Check format
    var formatValidation = /^[0-9]{12,19}$/.test(testValue);
    var numbersOnly = /^[0-9]*$/.test(testValue)
    
    if (formatValidation == false) {

        if (numbersOnly == false) {
            card.style.backgroundColor = `${dnPink}`;
            cardFeedback.innerHTML = "Invalid Character.<br>Only numbers allowed.";
            return false;
        }

        card.style.backgroundColor = `${dnPink}`;
        cardFeedback.innerHTML = "Invalid Card Number.";
        return false;
    }

    // Format card number for LUHN algorithm
    var nCheck = 0, nDigit = 0, bEven = false;
    testValue = testValue.replace(/\D/g, "");

    for (var n = testValue.length - 1; n >= 0; n--) {
        var cDigit = testValue.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    var numberValidation = (nCheck % 10) == 0;

    // Check card number is valid via LUHN algorithm
    if (numberValidation == true) {
        card.style.backgroundColor = `${dnGreen}`;
        cardFeedback.innerHTML = "";
        return true;
    }

    card.style.backgroundColor = `${dnPink}`;
    cardFeedback.innerHTML = "Invalid Card Number.";
    return false;
}
