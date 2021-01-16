"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
var mongoose_1 = require("mongoose");
var CourseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    tasks: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'task'
        }],
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
exports.CourseModel = mongoose_1.model('course', CourseSchema);
