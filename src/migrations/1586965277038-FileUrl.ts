import { MigrationInterface, QueryRunner } from 'typeorm';

export class FileUrl1586965277038 implements MigrationInterface {
  name = 'FileUrl1586965277038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "topic" ADD "fileUrl" character varying`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "topic" DROP COLUMN "fileUrl"`,
      undefined,
    );
  }
}
