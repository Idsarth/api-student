"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var env_1 = require("../env");
exports.s3 = new aws_sdk_1.default.S3({
    credentials: {
        accessKeyId: env_1.AWS_ID,
        secretAccessKey: env_1.AWS_SECRET
    }
});
