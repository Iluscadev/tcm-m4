import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1657829219217 implements MigrationInterface {
    name = 'migrations1657829219217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data_client_personal" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "status" boolean NOT NULL, "adm" boolean NOT NULL, "plan" character varying NOT NULL, "checkin" character varying NOT NULL, "checkout" character varying NOT NULL, "lock_number" integer NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_62b6c82f8a4050680426a7331c8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "data_client_personal"`);
    }

}
