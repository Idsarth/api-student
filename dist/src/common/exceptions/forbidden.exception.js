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
exports.ForbiddenException = void 0;
var http_status_enum_1 = require("../enums/http-status.enum");
var http_exception_1 = require("./http.exception");
var ForbiddenException = (function (_super) {
    __extends(ForbiddenException, _super);
    function ForbiddenException(message) {
        return _super.call(this, http_status_enum_1.HttpStatus.FORBIDDEN, message) || this;
    }
    return ForbiddenException;
}(http_exception_1.HttpException));
exports.ForbiddenException = ForbiddenException;