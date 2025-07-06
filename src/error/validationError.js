import invalidRequest from "./invalidRequest.js";

class ValidationError extends invalidRequest {
    constructor(err) {
        err.message
        super(`Found error in the data sent ${err.message}`);
    }
}

export default ValidationError;