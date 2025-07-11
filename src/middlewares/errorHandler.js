import mongoose from "mongoose";
import baseError from "../error/baseError.js";
import invalidRequest from "../error/invalidRequest.js";
import validationError from "../error/validationError.js";
import BaseError from "../error/baseError.js";

function errorHandler(err, req, res, next) {
    if (err instanceof mongoose.Error.CastError) {
        new invalidRequest().sendResponseError(res)
    } else if (err instanceof mongoose.Error.ValidationError) {
        new validationError(err).sendResponseError(res)
    } else if (err instanceof BaseError) {
        err.sendResponseError(res)
    } else {
        new baseError().sendResponseError(res)
    }
}

export default errorHandler;