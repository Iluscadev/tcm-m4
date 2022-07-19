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
exports.createDataService = exports.userListOneService = exports.ListAllService = void 0;
const dataClientPersonal_entities_1 = require("../../entities/dataClientPersonal.entities");
const data_source_1 = __importDefault(require("../../data-source"));
const bcryptjs_1 = require("bcryptjs");
const ListAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(dataClientPersonal_entities_1.DataClientPersonal);
    const users = userRepository.find();
    return users;
});
exports.ListAllService = ListAllService;
const userListOneService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(dataClientPersonal_entities_1.DataClientPersonal);
    const user = yield userRepository.findOneBy({ id: id });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
exports.userListOneService = userListOneService;
const createDataService = ({ name, email, age, password, phone_number, adm, plan, checkin, checkout, lock_number }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(dataClientPersonal_entities_1.DataClientPersonal);
    const users = yield userRepository.find();
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    //verificação de enaiul já cadastrado 
    const emailAlreadyExisty = users.find(user => user.email === email);
    //se o email for repetido forçamos um  erro
    if (emailAlreadyExisty) {
        throw new Error("Email already existy");
    }
    //usando os parametros que vamos receber lá do controller
    const data = new dataClientPersonal_entities_1.DataClientPersonal();
    data.name = name;
    data.email = email;
    data.age = age;
    data.password = hashedPassword;
    data.phone_number = phone_number;
    data.adm = adm;
    data.status = true;
    data.plan = plan;
    data.checkin = checkin;
    data.checkout = checkout;
    data.lock_number = lock_number;
    //adionando ao DB
    userRepository.create(data);
    yield userRepository.save(data);
    //Criando uma resposta com chanes especificas
    const dataResponse = {
        id: data.id,
        name,
        email,
        age,
        plan,
        status: data.status,
        lock_number
    };
    return dataResponse;
});
exports.createDataService = createDataService;
