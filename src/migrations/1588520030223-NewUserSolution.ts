import {MigrationInterface, QueryRunner} from "typeorm";

export class NewUserSolution1588520030223 implements MigrationInterface {
    name = 'NewUserSolution1588520030223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "solution_solvers_user" ("solutionId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_12b9ed2e221e622eaa031143b16" PRIMARY KEY ("solutionId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8e30b064163d537aef5b37672b" ON "solution_solvers_user" ("solutionId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9d14246e6afd87edeeff282bac" ON "solution_solvers_user" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "solution_solvers_user" ADD CONSTRAINT "FK_8e30b064163d537aef5b37672b2" FOREIGN KEY ("solutionId") REFERENCES "solution"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "solution_solvers_user" ADD CONSTRAINT "FK_9d14246e6afd87edeeff282bacd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "solution_solvers_user" DROP CONSTRAINT "FK_9d14246e6afd87edeeff282bacd"`, undefined);
        await queryRunner.query(`ALTER TABLE "solution_solvers_user" DROP CONSTRAINT "FK_8e30b064163d537aef5b37672b2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9d14246e6afd87edeeff282bac"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8e30b064163d537aef5b37672b"`, undefined);
        await queryRunner.query(`DROP TABLE "solution_solvers_user"`, undefined);
    }

}
