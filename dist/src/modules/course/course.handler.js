"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var abstract_handler_1 = require("../../handlers/abstract.handler");
var enums_1 = require("@common/enums");
var course_model_1 = require("./course.model");
var tech_model_1 = require("../tech/tech.model");
var exceptions_1 = require("../../../src/common/exceptions");
var CourseHandler = (function (_super) {
    __extends(CourseHandler, _super);
    function CourseHandler() {
        var _this = _super.call(this) || this;
        _this.path = '/course';
        _this.router = express_1.Router();
        _this.router.post(_this.path, _this.create);
        _this.router.get(_this.path + "s", _this.getAll);
        _this.router.get("" + _this.path, _this.getById);
        _this.router.post(_this.path + "/tech", _this.assignCourseToTech);
        return _this;
    }
    CourseHandler.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var courses, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, course_model_1.CourseModel.find().select('-__v').populate('tasks', '-__v')];
                    case 1:
                        courses = _a.sent();
                        response = {
                            data: courses,
                            status: {
                                ok: true,
                                code: enums_1.HttpStatus.OK,
                                message: 'list of courses gated successfully.'
                            },
                            info: {
                                url: req.url,
                                datetime: new Date(Date.now()).toLocaleString()
                            }
                        };
                        res.status(enums_1.HttpStatus.OK).json(response);
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(new exceptions_1.InternalServerError('internal server error.'));
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    CourseHandler.prototype.getById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var courseId, course, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseId = req.query.courseId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!mongoose_1.isValidObjectId(courseId)) return [3, 3];
                        return [4, course_model_1.CourseModel.findById({ _id: mongoose_1.Types.ObjectId(courseId) }).select('-__v').populate('tasks', '-__v')];
                    case 2:
                        course = _a.sent();
                        if (!course) {
                            next(new exceptions_1.NotFoundException('course not found.'));
                        }
                        else {
                            response = {
                                data: course,
                                status: {
                                    ok: true,
                                    code: enums_1.HttpStatus.OK,
                                    message: 'course found successfully.'
                                },
                                info: {
                                    url: req.url,
                                    datetime: new Date(Date.now()).toLocaleString()
                                }
                            };
                            res.status(enums_1.HttpStatus.OK).json(response);
                        }
                        return [3, 4];
                    case 3:
                        next(new exceptions_1.HttpException(enums_1.HttpStatus.BAD_REQUEST, 'the param courseId is not valid.'));
                        _a.label = 4;
                    case 4: return [3, 6];
                    case 5:
                        error_2 = _a.sent();
                        next(new exceptions_1.InternalServerError('internal server error.'));
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    CourseHandler.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var course, check, model, document_1, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        course = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4, course_model_1.CourseModel.findOne({ name: course.name })];
                    case 2:
                        check = _a.sent();
                        if (!check) return [3, 3];
                        next(new exceptions_1.HttpException(enums_1.HttpStatus.BAD_REQUEST, "the name property must be unique."));
                        return [3, 6];
                    case 3: return [4, course_model_1.CourseModel.create(__assign({}, course))];
                    case 4:
                        model = _a.sent();
                        return [4, model.save()];
                    case 5:
                        document_1 = _a.sent();
                        response = {
                            data: document_1,
                            status: {
                                ok: true,
                                code: enums_1.HttpStatus.CREATED,
                                message: 'course created successfully.'
                            },
                            info: {
                                url: req.url,
                                datetime: new Date(Date.now()).toLocaleString()
                            }
                        };
                        res.status(enums_1.HttpStatus.CREATED).json(response);
                        _a.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        error_3 = _a.sent();
                        next(new exceptions_1.InternalServerError('internal server error.'));
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    CourseHandler.prototype.assignCourseToTech = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var courseId, techId, tech, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courseId = req.query.courseId;
                        techId = req.query.techId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, tech_model_1.TechnologyModel.findByIdAndUpdate(techId, { $push: { courses: mongoose_1.Types.ObjectId(courseId) } }, { new: true, useFindAndModify: false })];
                    case 2:
                        tech = _a.sent();
                        if (!tech)
                            next(new exceptions_1.NotFoundException("the technology with the ID " + techId + " was not found."));
                        response = {
                            data: tech,
                            status: {
                                ok: true,
                                code: enums_1.HttpStatus.OK,
                                message: "the course was assigned to technology " + (tech === null || tech === void 0 ? void 0 : tech.name)
                            },
                            info: {
                                url: req.url,
                                datetime: new Date(Date.now()).toLocaleString()
                            }
                        };
                        res.status(enums_1.HttpStatus.OK).json(response);
                        return [3, 4];
                    case 3:
                        error_4 = _a.sent();
                        next(new exceptions_1.InternalServerError('internal server error.'));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    CourseHandler.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
    CourseHandler.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
    return CourseHandler;
}(abstract_handler_1.AbstractHandler));
exports.default = new CourseHandler();
