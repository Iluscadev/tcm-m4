import { MigrationInterface, QueryRunner } from "typeorm";

export class dataClientNNJounal1658171372491 implements MigrationInterface {
    name = 'dataClientNNJounal1658171372491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data_client_personal_journal_journals" ("dataClientPersonalId" uuid NOT NULL, "journalsId" uuid NOT NULL, CONSTRAINT "PK_478e6a3255e615f17402be627bd" PRIMARY KEY ("dataClientPersonalId", "journalsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9782f8271818ec658a5eb2be01" ON "data_client_personal_journal_journals" ("dataClientPersonalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dcb7183ba13c63a55d8d0da420" ON "data_client_personal_journal_journals" ("journalsId") `);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journal_journals" ADD CONSTRAINT "FK_9782f8271818ec658a5eb2be017" FOREIGN KEY ("dataClientPersonalId") REFERENCES "data_client_personal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journal_journals" ADD CONSTRAINT "FK_dcb7183ba13c63a55d8d0da420a" FOREIGN KEY ("journalsId") REFERENCES "journals"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "data_client_personal_journal_journals" DROP CONSTRAINT "FK_dcb7183ba13c63a55d8d0da420a"`);
        await queryRunner.query(`ALTER TABLE "data_client_personal_journal_journals" DROP CONSTRAINT "FK_9782f8271818ec658a5eb2be017"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcb7183ba13c63a55d8d0da420"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9782f8271818ec658a5eb2be01"`);
        await queryRunner.query(`DROP TABLE "data_client_personal_journal_journals"`);
    }

}
