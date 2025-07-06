import baseError from "./baseError.js";

class InvalidRequest extends baseError {
    constructor(message = "One or more data values is invalid") {
        super(message, 400);
    }
}

export default InvalidRequest;