"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataClientPersonal_entities_1 = require("../../entities/dataClientPersonal.entities");
const data_source_1 = __importDefault(require("../../data-source"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userLoginService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(dataClientPersonal_entities_1.DataClientPersonal);
    const account = yield userRepository.findOne({
        where: {
            email: email
        }
    });
    if (!account) {
        throw new Error("Account not found");
    }
    const passwordMatch = yield (0, bcryptjs_1.compare)(password, account.password);
    if (!passwordMatch) {
        throw new Error("Wrong email/password");
    }
    const token = jsonwebtoken_1.default.sign({
        id: account.id,
        adm: account.adm
    }, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });
    return token;
});
exports.default = userLoginService;
