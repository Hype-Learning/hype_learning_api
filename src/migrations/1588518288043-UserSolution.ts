import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSolution1588518288043 implements MigrationInterface {
    name = 'UserSolution1588518288043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "FK_407f2395705dd9c904777d978e6"`, undefined);
        await queryRunner.query(`CREATE TABLE "user_solutions" ("solutionId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_aa63c5d9177dda8d34f7d6e4b85" PRIMARY KEY ("solutionId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1ec6b0eebb964053247575ecd0" ON "user_solutions" ("solutionId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_12b991b9dc3aa8ee3e85b90c27" ON "user_solutions" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "solution" DROP CONSTRAINT "REL_407f2395705dd9c904777d978e"`, undefined);
        await queryRunner.query(`ALTER TABLE "solution" DROP COLUMN "studentId"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_solutions" ADD CONSTRAINT "FK_1ec6b0eebb964053247575ecd05" FOREIGN KEY ("solutionId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_solutions" ADD CONSTRAINT "FK_12b991b9dc3aa8ee3e85b90c27c" FOREIGN KEY ("userId") REFERENCES "solution"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_solutions" DROP CONSTRAINT "FK_12b991b9dc3aa8ee3e85b90c27c"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_solutions" DROP CONSTRAINT "FK_1ec6b0eebb964053247575ecd05"`, undefined);
        await queryRunner.query(`ALTER TABLE "solution" ADD "studentId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "REL_407f2395705dd9c904777d978e" UNIQUE ("studentId")`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_12b991b9dc3aa8ee3e85b90c27"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1ec6b0eebb964053247575ecd0"`, undefined);
        await queryRunner.query(`DROP TABLE "user_solutions"`, undefined);
        await queryRunner.query(`ALTER TABLE "solution" ADD CONSTRAINT "FK_407f2395705dd9c904777d978e6" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
