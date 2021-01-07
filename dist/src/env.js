"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_URI = exports.MONGO_URI = exports.SECRET_KEY = exports.PORT = exports.HOST = exports.NODE_ENV = void 0;
var dotenv_1 = require("dotenv");
var path_1 = __importDefault(require("path"));
dotenv_1.config({ path: path_1.default.join(process.cwd(), ".env" + (process.env.NODE_ENV !== 'production' ? process.env.NODE_ENV : '')) });
/**
 * Environments variables
 */
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.HOST = process.env.HOST || '0.0.0.0';
exports.PORT = process.env.PORT || 4200;
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.MONGO_URI = process.env.MONGO_URI;
exports.REDIS_URI = process.env.REDIS_URI;
