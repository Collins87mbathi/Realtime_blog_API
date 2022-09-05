const passwordValidator = (password) => {
    const re =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password);
}

module.exports = passwordValidator;