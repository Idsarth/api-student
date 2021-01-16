"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
var mongoose_1 = require("mongoose");
var TaskSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: false,
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
    completed: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        required: true,
        default: 'PENDING',
        enum: ['CURRENT', 'PENDING', 'COMPLETED']
    },
    platform: {
        type: String,
        required: true,
        enum: ['PLATZI', 'UDEMY', 'EDTEAM', 'YOUTUBE'],
    },
    notes: [{
            ref: 'note',
            type: mongoose_1.Schema.Types.ObjectId
        }],
    files: [{
            name: {
                type: String,
                required: true
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
            }
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
exports.TaskModel = mongoose_1.model('task', TaskSchema);
