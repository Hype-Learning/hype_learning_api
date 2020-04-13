import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseUserRelation1586621670334 implements MigrationInterface {
    name = 'CourseUserRelation1586621670334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" ADD "authorId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_98522d97c4ecc30c636f5f5115e" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_98522d97c4ecc30c636f5f5115e"`, undefined);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "authorId"`, undefined);
    }

}
