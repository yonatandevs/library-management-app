const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migrated1733143151475 {
    name = 'Migrated1733143151475'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_a6c53dfc89ba3188b389ef29a62\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rating\` ADD CONSTRAINT \`FK_2ab7f7fc5b63b0147591ba69032\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`borrowing\` ADD CONSTRAINT \`FK_c046c91ca746e47451500ccca3d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`borrowing\` ADD CONSTRAINT \`FK_6d4de218bbdb605c1d33de6242f\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`borrowing\` DROP FOREIGN KEY \`FK_6d4de218bbdb605c1d33de6242f\``);
        await queryRunner.query(`ALTER TABLE \`borrowing\` DROP FOREIGN KEY \`FK_c046c91ca746e47451500ccca3d\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_2ab7f7fc5b63b0147591ba69032\``);
        await queryRunner.query(`ALTER TABLE \`rating\` DROP FOREIGN KEY \`FK_a6c53dfc89ba3188b389ef29a62\``);
    }
}
