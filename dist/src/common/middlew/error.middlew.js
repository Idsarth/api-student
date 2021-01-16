"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMiddlew = (function () {
    function ErrorMiddlew() {
    }
    ErrorMiddlew.prototype.error = function (err, req, res, next) {
        var ok = false;
        var code = err.status;
        var datetime = new Date(Date.now()).toLocaleString();
        var url = req.url;
        var message = err.message;
        var response = {
            data: {},
            status: {
                ok: ok,
                code: code,
                message: message
            },
            info: {
                url: url,
                datetime: datetime
            }
        };
        res.status(code).json(response);
    };
    return ErrorMiddlew;
}());
exports.default = new ErrorMiddlew;
