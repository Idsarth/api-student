"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
var mongoose_1 = require("mongoose");
var FileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    size: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['IMAGE', 'PDF']
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
exports.FileModel = mongoose_1.model('file', FileSchema);
