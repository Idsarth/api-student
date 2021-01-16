"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Log = (function () {
    function Log() {
        this.today = new Date();
        var date = this.today.getFullYear() + "-" + this.today.getMonth() + "-" + this.today.getDay();
        var time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
        this.baseDirectory = path_1.default.join(__dirname, '../../../.logs/');
        this.fileName = date + ".log";
        this.linePrefix = "[" + date + " " + time + "]";
    }
    Log.prototype.info = function (message) {
        this.log('INFO', message);
    };
    Log.prototype.warn = function (message) {
        this.log('WARNING', message);
    };
    Log.prototype.error = function (message) {
        this.log('ERROR', message);
    };
    Log.prototype.log = function (key, message) {
        var _this = this;
        key = key.toUpperCase();
        fs_1.default.open("" + this.baseDirectory + this.fileName, 'a', function (err, file) {
            if (err)
                throw new Error(err.message);
            fs_1.default.appendFile(file, _this.linePrefix + " [" + key + "] " + message + "\n", function (err) {
                if (err)
                    throw new Error(err.message);
                fs_1.default.close(file, function (err) {
                    if (err)
                        throw new Error(err.message);
                });
            });
        });
    };
    return Log;
}());
exports.default = new Log();
