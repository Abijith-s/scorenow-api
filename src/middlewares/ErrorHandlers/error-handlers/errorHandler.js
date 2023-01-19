const { CustomError } = require("./custom-err");

const ErrorHandler = (
    err,
    req,
    res,
    next
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ status: false, message: "Body parsing failed. Please send valid json" })
    }
    res.status(400).send({
        errors: [
            { message: 'Something went wrong' }
        ]
    });

};

module.exports = {
    ErrorHandler
}