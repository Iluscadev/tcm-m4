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
exports.migrations1657829219217 = void 0;
class migrations1657829219217 {
    constructor() {
        this.name = 'migrations1657829219217';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "data_client_personal" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "status" boolean NOT NULL, "adm" boolean NOT NULL, "plan" character varying NOT NULL, "checkin" character varying NOT NULL, "checkout" character varying NOT NULL, "lock_number" integer NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_62b6c82f8a4050680426a7331c8" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "data_client_personal"`);
        });
    }
}
exports.migrations1657829219217 = migrations1657829219217;
