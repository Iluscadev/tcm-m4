"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataClientPersonal_1 = require("../controllers/dataClientPersonal");
const clientsPersonalRoutes = (0, express_1.Router)();
clientsPersonalRoutes.post('/register', dataClientPersonal_1.createDataController);
clientsPersonalRoutes.get('/users', dataClientPersonal_1.ListAllController);
clientsPersonalRoutes.get('/clients/:id', dataClientPersonal_1.userListOneController);
exports.default = clientsPersonalRoutes;
