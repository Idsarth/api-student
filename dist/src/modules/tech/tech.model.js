"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyModel = void 0;
var mongoose_1 = require("mongoose");
var TechSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    docsUrl: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    courses: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'course'
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
exports.TechnologyModel = mongoose_1.model('technology', TechSchema);
