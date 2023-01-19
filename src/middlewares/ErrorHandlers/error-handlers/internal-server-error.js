const { CustomError } = require("./custom-err");

class InternalServerError extends CustomError {
    statusCode = 500;

    constructor() {
        super("Something went wrong");

        Object.setPrototypeOf(this, InternalServerError.prototype);
    };

    serializeErrors() {
        return [{ message: "Something went wrong" }]
    }
};

module.exports = {
    InternalServerError
}