const error = (status, message) => {
    let err = new Error();
    err.status = status;
    err.message = message;
    return err;
}

module.exports = error;