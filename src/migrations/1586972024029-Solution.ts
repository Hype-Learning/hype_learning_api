import {MigrationInterface, QueryRunner} from "typeorm";

export class Solution1586972024029 implements MigrationInterface {
    name = 'Solution1586972024029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solution" ("id" SERIAL NOT NULL, "fileUrl" character varying, "studentId" integer, "topicId" integer, CONSTRAINT "REL_407f2395705dd9c904777d978e" UNIQUE ("studentId"), CONSTRAINT "PK_73fc40b114205776818a2f2f248" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "FK_407f2395705dd9c904777d978e6" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "FK_2fdf6c36404dc8e010bda78e916" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "FK_2fdf6c36404dc8e010bda78e916"`, undefined);
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "FK_407f2395705dd9c904777d978e6"`, undefined);
        await queryRunner.query(`DROP TABLE "solution"`, undefined);
    }

}
