"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
var http_status_enum_1 = require("../enums/http-status.enum");
var http_exception_1 = require("./http.exception");
var InternalServerError = (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message) {
        return _super.call(this, http_status_enum_1.HttpStatus.INTERNAL_SERVER_ERROR, message) || this;
    }
    return InternalServerError;
}(http_exception_1.HttpException));
exports.InternalServerError = InternalServerError;
