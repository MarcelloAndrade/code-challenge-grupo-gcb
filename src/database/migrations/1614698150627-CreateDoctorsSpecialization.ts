import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDoctorsSpecialization1614698150627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_doctor_specialization",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true
                    },{
                        name: "doctor_id",
                        type: "varchar",
                        length: "36"
                    },{
                        name: "specialization_id",
                        type: "varchar",
                        length: "36"
                    },{
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FK_Doctor",
                        columnNames: ["doctor_id"],
                        referencedTableName: "tb_doctor",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FK_Specialization",
                        columnNames: ["specialization_id"],
                        referencedTableName: "tb_specialization",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        ), true
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_doctor_specialization");
    }

}
