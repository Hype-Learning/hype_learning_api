import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPhoto1587046580802 implements MigrationInterface {
    name = 'UserPhoto1587046580802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "fileUrl" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fileUrl"`, undefined);
    }

}
