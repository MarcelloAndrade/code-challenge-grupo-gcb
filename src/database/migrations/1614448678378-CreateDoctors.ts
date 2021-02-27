import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDoctors1614448678378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_doctors",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true
                    },{
                        name: "name",
                        type: "varchar",
                        length: "120"
                    },{
                        name: "crm",
                        type: "int",
                        length: "7",
                        isUnique: true,
                    },{
                        name: "phone",
                        type: "varchar",
                        length: "12",
                        isNullable: true
                    },{
                        name: "cell",
                        type: "varchar",
                        length: "12",
                        isNullable: true
                    },{
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_doctors");
    }
}
