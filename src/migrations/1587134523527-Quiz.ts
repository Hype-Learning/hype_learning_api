import {MigrationInterface, QueryRunner} from "typeorm";

export class Quiz1587134523527 implements MigrationInterface {
    name = 'Quiz1587134523527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "a" character varying NOT NULL, "b" character varying NOT NULL, "c" character varying NOT NULL, "d" character varying NOT NULL, "correct" character varying NOT NULL, "quizId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "result" ("id" SERIAL NOT NULL, "score" integer NOT NULL, "userId" integer, "quizId" integer, CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ADD "quizId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "UQ_83b398ba48d1d02724204e346f8" UNIQUE ("quizId")`, undefined);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_4959a4225f25d923111e54c7cd2" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_601be29c4bf75f59d0261f769ba" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_ee18239cf6832f54ad345bb87e1" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_83b398ba48d1d02724204e346f8" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_83b398ba48d1d02724204e346f8"`, undefined);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_ee18239cf6832f54ad345bb87e1"`, undefined);
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_601be29c4bf75f59d0261f769ba"`, undefined);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_4959a4225f25d923111e54c7cd2"`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "UQ_83b398ba48d1d02724204e346f8"`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "quizId"`, undefined);
        await queryRunner.query(`DROP TABLE "result"`, undefined);
        await queryRunner.query(`DROP TABLE "quiz"`, undefined);
        await queryRunner.query(`DROP TABLE "question"`, undefined);
    }

}
