const ApiError = require("./error")

const ErrorHandler = (err,req,res,next) => {
    if(err instanceof ApiError) {
        res.status(err.status).json(err.message);
        return;
    }
    res.status(500).json("something went wrong");
}

module.exports = ErrorHandler;