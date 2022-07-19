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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataController = exports.userListOneController = exports.ListAllController = void 0;
const dataClientPersonal_1 = require("../../services/dataClientPersonal");
const ListAllController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, dataClientPersonal_1.ListAllService)();
        return response.status(200).json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return response.status(400).json({
                'error': error.name,
                'message': error.message
            });
        }
    }
});
exports.ListAllController = ListAllController;
const userListOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield (0, dataClientPersonal_1.userListOneService)(id);
        return res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(404).json({
                message: error.message
            });
        }
    }
});
exports.userListOneController = userListOneController;
const createDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, age, password, phone_number, adm, plan, checkin, checkout, lock_number, } = req.body;
        const newData = yield (0, dataClientPersonal_1.createDataService)({
            name,
            email,
            age,
            password,
            phone_number,
            adm,
            plan,
            checkin,
            checkout,
            lock_number,
        });
        return res.status(201).send(newData);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        }
    }
});
exports.createDataController = createDataController;
