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
var exceptions_1 = require("../../../src/common/exceptions");
var abstract_handler_1 = require("../../handlers/abstract.handler");
var enums_1 = require("@common/enums");
var tech_model_1 = require("./tech.model");
var TechHandler = (function (_super) {
    __extends(TechHandler, _super);
    function TechHandler() {
        var _this = _super.call(this) || this;
        _this.path = '/technology';
        _this.router = express_1.Router();
        _this.router.post(_this.path, _this.create);
        _this.router.get(_this.path, _this.getById);
        _this.router.get("/technologies", _this.getAll);
        return _this;
    }
    TechHandler.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var tech, check, model, document_1, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tech = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4, tech_model_1.TechnologyModel.findOne({ $or: [{ name: tech.name }, { docsUrl: tech.docsUrl }] })];
                    case 2:
                        check = _a.sent();
                        if (!check) return [3, 3];
                        next(new exceptions_1.HttpException(enums_1.HttpStatus.BAD_REQUEST, "the name or docsUrl property must be unique."));
                        return [3, 6];
                    case 3: return [4, tech_model_1.TechnologyModel.create(__assign({}, tech))];
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
                                message: 'technology created successfully.'
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
                        error_1 = _a.sent();
                        next(new exceptions_1.InternalServerError('internal server error.'));
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    TechHandler.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var techs, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, tech_model_1.TechnologyModel.find()
                                .populate({
                                path: 'courses',
                                populate: {
                                    path: 'tasks'
                                }
                            })
                                .select('-__v')];
                    case 1:
                        techs = _a.sent();
                        response = {
                            data: techs,
                            status: {
                                ok: true,
                                code: enums_1.HttpStatus.OK,
                                message: 'list of technologies gated successfully.'
                            },
                            info: {
                                url: req.url,
                                datetime: new Date(Date.now()).toLocaleString()
                            }
                        };
                        res.status(enums_1.HttpStatus.OK).json(response);
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(new exceptions_1.InternalServerError('internal server error'));
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    TechHandler.prototype.getById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var techId, tech, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        techId = req.query.techId;
                        if (!mongoose_1.isValidObjectId(techId))
                            next(new exceptions_1.HttpException(enums_1.HttpStatus.BAD_REQUEST, 'the param techId is not valid.'));
                        return [4, tech_model_1.TechnologyModel.findById({ _id: mongoose_1.Types.ObjectId(techId) })
                                .populate({
                                path: 'courses',
                                populate: {
                                    path: 'tasks'
                                }
                            })
                                .select('-__v')];
                    case 1:
                        tech = _a.sent();
                        response = {
                            data: tech,
                            status: {
                                ok: true,
                                code: enums_1.HttpStatus.OK,
                                message: 'tech found successfully'
                            },
                            info: {
                                url: req.url,
                                datetime: new Date(Date.now()).toLocaleString()
                            }
                        };
                        res.status(enums_1.HttpStatus.OK).json(response);
                        return [2];
                }
            });
        });
    };
    TechHandler.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
    TechHandler.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
    return TechHandler;
}(abstract_handler_1.AbstractHandler));
exports.default = new TechHandler;
