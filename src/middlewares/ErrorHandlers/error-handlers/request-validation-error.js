const { CustomError } = require("./custom-err");

class RequestValidationError extends CustomError {
    statusCode = 400;
    errors;
    constructor(errors) {
        super('Invalid request parmeters');
        this.errors = errors;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    };

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param };
        })
    }
};

module.exports = {
    RequestValidationError
}