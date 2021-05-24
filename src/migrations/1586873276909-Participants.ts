import {MigrationInterface, QueryRunner} from "typeorm";

export class Participants1586873276909 implements MigrationInterface {
    name = 'Participants1586873276909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_participants_user" ("courseId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_9a854947621a6fb770a90aa1168" PRIMARY KEY ("courseId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6d89bd257a966a71f28bb65523" ON "course_participants_user" ("courseId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_5e706f1dae2fd746564d126b0f" ON "course_participants_user" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "isBlocked" boolean NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "course_participants_user" ADD CONSTRAINT "FK_6d89bd257a966a71f28bb655230" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_participants_user" ADD CONSTRAINT "FK_5e706f1dae2fd746564d126b0fb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_participants_user" DROP CONSTRAINT "FK_5e706f1dae2fd746564d126b0fb"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_participants_user" DROP CONSTRAINT "FK_6d89bd257a966a71f28bb655230"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isBlocked"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5e706f1dae2fd746564d126b0f"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6d89bd257a966a71f28bb65523"`, undefined);
        await queryRunner.query(`DROP TABLE "course_participants_user"`, undefined);
    }

}
