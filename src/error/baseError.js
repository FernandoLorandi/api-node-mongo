class BaseError extends Error {
    constructor(message = "Internal error", statusCode = 500) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }

    sendResponseError(res) {
        res.status(this.statusCode).send({
            message:this.message,
            statusCode: this.statusCode
        });
    }
}

export default BaseError;