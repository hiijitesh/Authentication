function Name(name) {
    const nameValidatorRegex = /^[a-zA-Z ]{2,30}$/;
    return nameValidatorRegex.test(name);
}

function Password(password) {
    return password.length >= 8;
}

function PhoneNumber(phone) {
    const phoneValidatorRegex =
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return phoneValidatorRegex.test(phone);
}

function Email(email) {
    const emailValidatorRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailValidatorRegex.test(email);
}

module.exports = {
    Name,
    Password,
    PhoneNumber,
    Email,
};
