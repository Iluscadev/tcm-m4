import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrations1658157684716 implements MigrationInterface {
    name = 'initialMigrations1658157684716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" character varying NOT NULL, "cep" character varying NOT NULL, "complement" character varying, "town" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "journals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "exercise" character varying NOT NULL, "time" character varying NOT NULL, "repetitions" integer NOT NULL, CONSTRAINT "PK_157a30136385dd81cdd19111380" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "data_client_personal" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "age" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "status" boolean NOT NULL, "adm" boolean NOT NULL, "plan" character varying NOT NULL, "checkin" character varying NOT NULL, "checkout" character varying NOT NULL, "lock_number" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_62b6c82f8a4050680426a7331c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "data_client_personal_addresses_addresses" ("dataClientPersonalId" uuid NOT NULL, "addressesId" uuid NOT NULL, CONSTRAINT "PK_c664b2679e33fdcd92a4adece1d" PRIMARY KEY ("dataClientPersonalId", "addressesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d9ef3cbc14a0fb4a995a7f9b4" ON "data_client_personal_addresses_addresses" ("dataClientPersonalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_234f74454e840921ce27ae1ee1" ON "data_client_personal_addresses_addresses" ("addressesId") `);
        await queryRunner.query(`CREATE TABLE "data_client_personal_journals_journals" ("dataClientPersonalId" uuid NOT NULL, "journalsId" uuid NOT NULL, CONSTRAINT "PK_343ed94ac9edb869e9f50ea1b56" PRIMARY KEY ("dataClientPersonalId", "journalsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_80d6f1929f8bc22d8a29ee0027" ON "data_client_personal_journals_journals" ("dataClientPersonalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_146aba7a8bbc6b9df4e03b1268" ON "data_client_personal_journals_journals" ("journalsId") `);
        await queryRunner.query(`ALTER TABLE "data_client_personal_addresses_addresses" ADD CONSTRAINT "FK_5d9ef3cbc14a0fb4a995a7f9b47" FOREIGN KEY ("dataClientPersonalId") REFERENCES "data_client_personal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_addresses_addresses" ADD CONSTRAINT "FK_234f74454e840921ce27ae1ee17" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journals_journals" ADD CONSTRAINT "FK_80d6f1929f8bc22d8a29ee00275" FOREIGN KEY ("dataClientPersonalId") REFERENCES "data_client_personal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journals_journals" ADD CONSTRAINT "FK_146aba7a8bbc6b9df4e03b12687" FOREIGN KEY ("journalsId") REFERENCES "journals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_client_personal_journals_journals" DROP CONSTRAINT "FK_146aba7a8bbc6b9df4e03b12687"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journals_journals" DROP CONSTRAINT "FK_80d6f1929f8bc22d8a29ee00275"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_addresses_addresses" DROP CONSTRAINT "FK_234f74454e840921ce27ae1ee17"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_addresses_addresses" DROP CONSTRAINT "FK_5d9ef3cbc14a0fb4a995a7f9b47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_146aba7a8bbc6b9df4e03b1268"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80d6f1929f8bc22d8a29ee0027"`);
        await queryRunner.query(`DROP TABLE "data_client_personal_journals_journals"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_234f74454e840921ce27ae1ee1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d9ef3cbc14a0fb4a995a7f9b4"`);
        await queryRunner.query(`DROP TABLE "data_client_personal_addresses_addresses"`);
        await queryRunner.query(`DROP TABLE "data_client_personal"`);
        await queryRunner.query(`DROP TABLE "journals"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
