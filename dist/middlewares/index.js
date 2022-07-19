"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
    const splitToken = token.split(" ");
    jsonwebtoken_1.default.verify(splitToken[1], process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        req.data = {
            id: decoded.id,
            adm: decoded.adm
        };
        next();
    });
};
exports.AuthMiddleware = AuthMiddleware;
