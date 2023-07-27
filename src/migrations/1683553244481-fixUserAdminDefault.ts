import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserAdminDefault1683553244481 implements MigrationInterface {
    name = 'FixUserAdminDefault1683553244481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT true`);
    }

}
