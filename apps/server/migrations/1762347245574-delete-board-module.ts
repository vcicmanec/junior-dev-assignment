import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteBoardModule1762347245574 implements MigrationInterface {
  name = 'DeleteBoardModule1762347245574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_7afd0d9e219e91a0bd7c746146f"`,
    );
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "boardId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "card" ADD "boardId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_7afd0d9e219e91a0bd7c746146f" FOREIGN KEY ("boardId") REFERENCES "kanban_board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
