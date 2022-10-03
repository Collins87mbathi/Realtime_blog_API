const passwordValidator = (password) => {
    const re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    return re.test(password);
}

module.exports = passwordValidator;