const { CustomError } = require("./custom-err");

class ApiNotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super("Route not found");

        Object.setPrototypeOf(this, ApiNotFoundError.prototype);
    };

    serializeErrors() {
        return [{ message: "Not found" }]
    }
};

module.exports = {
    ApiNotFoundError
}