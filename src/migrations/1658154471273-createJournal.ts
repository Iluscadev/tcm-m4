import { MigrationInterface, QueryRunner } from "typeorm";

export class createJournal1658154471273 implements MigrationInterface {
    name = 'createJournal1658154471273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" character varying NOT NULL, "cep" character varying NOT NULL, "complement" character varying, "town" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_journal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "exercise" character varying NOT NULL, "time" character varying NOT NULL, "repetitions" integer NOT NULL, CONSTRAINT "PK_cbaf05c27a457099d0b21665129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "data_client_personal_addresses_address" ("dataClientPersonalId" uuid NOT NULL, "addressId" uuid NOT NULL, CONSTRAINT "PK_87e289b8879373cd6786a130e14" PRIMARY KEY ("dataClientPersonalId", "addressId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bbf056e74562344444eab387c2" ON "data_client_personal_addresses_address" ("dataClientPersonalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6df643cf5a584c6dec61dfde97" ON "data_client_personal_addresses_address" ("addressId") `);
        await queryRunner.query(`CREATE TABLE "data_client_personal_journals_client_journal" ("dataClientPersonalId" uuid NOT NULL, "clientJournalId" uuid NOT NULL, CONSTRAINT "PK_8422c226885156ee97410da0e8b" PRIMARY KEY ("dataClientPersonalId", "clientJournalId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2147b5c6e2d802dda3e19896a2" ON "data_client_personal_journals_client_journal" ("dataClientPersonalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_075d83e721d46160eab61cbff7" ON "data_client_personal_journals_client_journal" ("clientJournalId") `);
        await queryRunner.query(`ALTER TABLE "data_client_personal" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "data_client_personal" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_addresses_address" ADD CONSTRAINT "FK_bbf056e74562344444eab387c22" FOREIGN KEY ("dataClientPersonalId") REFERENCES "data_client_personal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_addresses_address" ADD CONSTRAINT "FK_6df643cf5a584c6dec61dfde978" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journals_client_journal" ADD CONSTRAINT "FK_2147b5c6e2d802dda3e19896a2c" FOREIGN KEY ("dataClientPersonalId") REFERENCES "data_client_personal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journals_client_journal" ADD CONSTRAINT "FK_075d83e721d46160eab61cbff70" FOREIGN KEY ("clientJournalId") REFERENCES "client_journal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_client_personal_journals_client_journal" DROP CONSTRAINT "FK_075d83e721d46160eab61cbff70"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journals_client_journal" DROP CONSTRAINT "FK_2147b5c6e2d802dda3e19896a2c"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_addresses_address" DROP CONSTRAINT "FK_6df643cf5a584c6dec61dfde978"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_addresses_address" DROP CONSTRAINT "FK_bbf056e74562344444eab387c22"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "data_client_personal" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP INDEX "public"."IDX_075d83e721d46160eab61cbff7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2147b5c6e2d802dda3e19896a2"`);
        await queryRunner.query(`DROP TABLE "data_client_personal_journals_client_journal"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6df643cf5a584c6dec61dfde97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bbf056e74562344444eab387c2"`);
        await queryRunner.query(`DROP TABLE "data_client_personal_addresses_address"`);
        await queryRunner.query(`DROP TABLE "client_journal"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
