import {MigrationInterface, QueryRunner} from "typeorm";

export class StudentInstructorSeparation1586806078872 implements MigrationInterface {
    name = 'StudentInstructorSeparation1586806078872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "courseId" integer, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "instructor" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_6222960ab4f2b68e84bc00bfeeb" UNIQUE ("email"), CONSTRAINT "PK_ccc0348eefb581ca002c05ef2f3" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "announcement" character varying NOT NULL, "authorId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "student_courses" ("student_id" integer NOT NULL, "course_id" integer NOT NULL, CONSTRAINT "PK_834b9778e4a42da3ee6f69ea6ac" PRIMARY KEY ("student_id", "course_id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_72bf56a78827a9ef805699a360" ON "student_courses" ("student_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_aef3395fbde21c0c377cb836d0" ON "student_courses" ("course_id") `, undefined);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_cc209f6f951f94af47acf75485b" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_98522d97c4ecc30c636f5f5115e" FOREIGN KEY ("authorId") REFERENCES "instructor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "student_courses" ADD CONSTRAINT "FK_72bf56a78827a9ef805699a3609" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "student_courses" ADD CONSTRAINT "FK_aef3395fbde21c0c377cb836d08" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_courses" DROP CONSTRAINT "FK_aef3395fbde21c0c377cb836d08"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_courses" DROP CONSTRAINT "FK_72bf56a78827a9ef805699a3609"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_98522d97c4ecc30c636f5f5115e"`, undefined);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_cc209f6f951f94af47acf75485b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_aef3395fbde21c0c377cb836d0"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_72bf56a78827a9ef805699a360"`, undefined);
        await queryRunner.query(`DROP TABLE "student_courses"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
        await queryRunner.query(`DROP TABLE "student"`, undefined);
        await queryRunner.query(`DROP TABLE "instructor"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "topic"`, undefined);
    }

}
