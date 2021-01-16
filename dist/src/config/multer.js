"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
exports.upload = multer_1.default({
    storage: multer_1.default.memoryStorage(),
    fileFilter: function (req, file, cb) {
        var fileTypes = /png|jpg|jpeg|pdf/;
        var mimeType = fileTypes.test(file.mimetype);
        var extname = fileTypes.test(path_1.default.extname(file.originalname));
        if (mimeType && extname) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type.'));
        }
    }
});
