"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
var mongoose_1 = require("mongoose");
var NoteSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});
exports.NoteModel = mongoose_1.model('note', NoteSchema);
