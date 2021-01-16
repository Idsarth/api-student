"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDto = exports.CreateTaskDto = exports.STATUS = exports.PLATFORM = void 0;
var class_validator_1 = require("class-validator");
var PLATFORM;
(function (PLATFORM) {
    PLATFORM["PLATZI"] = "PLATZI";
    PLATFORM["UDEMY"] = "UDEMY";
    PLATFORM["EDTEAM"] = "EDTEAM";
    PLATFORM["YOUTUBE"] = "YOUTUBE";
})(PLATFORM = exports.PLATFORM || (exports.PLATFORM = {}));
var STATUS;
(function (STATUS) {
    STATUS["CURRENT"] = "CURRENT";
    STATUS["PENDING"] = "PENDING";
    STATUS["COMPLETED"] = "COMPLETED";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
var CreateTaskDto = (function () {
    function CreateTaskDto() {
    }
    __decorate([
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], CreateTaskDto.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], CreateTaskDto.prototype, "description", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], CreateTaskDto.prototype, "imageUrl", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsEnum(PLATFORM),
        __metadata("design:type", String)
    ], CreateTaskDto.prototype, "platform", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsEnum(STATUS),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], CreateTaskDto.prototype, "status", void 0);
    return CreateTaskDto;
}());
exports.CreateTaskDto = CreateTaskDto;
var UpdateTaskDto = (function () {
    function UpdateTaskDto() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateTaskDto.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateTaskDto.prototype, "description", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateTaskDto.prototype, "imageUrl", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsEnum(PLATFORM),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateTaskDto.prototype, "platform", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsEnum(STATUS),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UpdateTaskDto.prototype, "status", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Boolean)
    ], UpdateTaskDto.prototype, "isActive", void 0);
    return UpdateTaskDto;
}());
exports.UpdateTaskDto = UpdateTaskDto;
