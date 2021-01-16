"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("@common/exceptions");
var TokenMiddlew = (function () {
    function TokenMiddlew() {
    }
    TokenMiddlew.prototype.validated = function (req, res, next) {
        if (req.headers['authorization']) {
            try {
                var authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    throw new exceptions_1.UnauthorizedException('not authorized.');
                }
                else {
                    return next();
                }
            }
            catch (err) {
                throw new exceptions_1.ForbiddenException('forbidden.');
            }
        }
        else {
            throw new exceptions_1.UnauthorizedException('not authorized.');
        }
    };
    return TokenMiddlew;
}());
exports.default = new TokenMiddlew;
