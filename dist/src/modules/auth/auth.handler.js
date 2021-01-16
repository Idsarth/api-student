"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthHandler = (function () {
    function AuthHandler() {
        this.path = '/auth';
        this.router = express_1.Router();
    }
    AuthHandler.prototype.signIn = function (req, res) { };
    return AuthHandler;
}());
exports.default = new AuthHandler;
