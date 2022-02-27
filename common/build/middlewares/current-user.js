"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    var _a, _b;
    console.log('Common currentUser session >>>>', (_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt);
    if (!((_b = req.session) === null || _b === void 0 ? void 0 : _b.jwt)) {
        return next();
    }
    try {
        const payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
        req.currentUser = payload;
        console.log('Common currentUser payload >>>>', payload);
    }
    catch (err) {
        console.log('Common currentUser Error >>>>', err);
    }
    next();
};
exports.currentUser = currentUser;
