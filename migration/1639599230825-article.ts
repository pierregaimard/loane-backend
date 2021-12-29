import {MigrationInterface, QueryRunner} from "typeorm";

export class article1639599230825 implements MigrationInterface {
    name = 'article1639599230825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`article_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(30) NOT NULL, \`color\` varchar(30) NOT NULL, \`icon\` varchar(30) NOT NULL, UNIQUE INDEX \`IDX_8f28c1ef430160d2e3ce7fc3c4\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`article\` (\`code\` varchar(20) NOT NULL, \`name\` varchar(60) NOT NULL, \`price\` decimal(6,2) NOT NULL, \`categoryId\` int NOT NULL, UNIQUE INDEX \`IDX_95662f989b79a03ba2c6776f46\` (\`name\`), PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_12824e4598ee46a0992d99ba553\` FOREIGN KEY (\`categoryId\`) REFERENCES \`article_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_12824e4598ee46a0992d99ba553\``);
        await queryRunner.query(`DROP INDEX \`IDX_95662f989b79a03ba2c6776f46\` ON \`article\``);
        await queryRunner.query(`DROP TABLE \`article\``);
        await queryRunner.query(`DROP INDEX \`IDX_8f28c1ef430160d2e3ce7fc3c4\` ON \`article_category\``);
        await queryRunner.query(`DROP TABLE \`article_category\``);
    }

}
