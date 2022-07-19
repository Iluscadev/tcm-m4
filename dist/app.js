"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dataClientPersonal_routes_1 = __importDefault(require("./routes/dataClientPersonal.routes"));
const avaliation_routes_1 = __importDefault(require("./routes/avaliation.routes"));
const journal_routes_1 = __importDefault(require("./routes/journal.routes"));
const address_routes_1 = __importDefault(require("./routes/address.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(dataClientPersonal_routes_1.default);
app.use(avaliation_routes_1.default);
app.use(journal_routes_1.default);
app.use(address_routes_1.default);
exports.default = app;
