import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1762343449300 implements MigrationInterface {
  name = 'Initial1762343449300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."card_status_enum" AS ENUM('todo', 'in-progress', 'done')`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."card_status_enum" NOT NULL DEFAULT 'todo', "title" text NOT NULL, "description" text, "boardId" uuid, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "kanban_board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_13b70600eb05b88962798b19f4a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_7afd0d9e219e91a0bd7c746146f" FOREIGN KEY ("boardId") REFERENCES "kanban_board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_7afd0d9e219e91a0bd7c746146f"`,
    );
    await queryRunner.query(`DROP TABLE "kanban_board"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TYPE "public"."card_status_enum"`);
  }
}
