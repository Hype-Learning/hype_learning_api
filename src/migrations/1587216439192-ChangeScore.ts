import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeScore1587216439192 implements MigrationInterface {
    name = 'ChangeScore1587216439192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP COLUMN "score"`, undefined);
        await queryRunner.query(`ALTER TABLE "result" ADD "score" real NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP COLUMN "score"`, undefined);
        await queryRunner.query(`ALTER TABLE "result" ADD "score" integer NOT NULL`, undefined);
    }

}
