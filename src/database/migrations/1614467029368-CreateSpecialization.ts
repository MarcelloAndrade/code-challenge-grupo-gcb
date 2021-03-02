import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecialization1614467029368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE
        await queryRunner.createTable(
            new Table({
                name: "tb_specialization",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true
                    },{
                        name: "name",
                        type: "varchar",
                        length: "120",
                        isUnique: true,
                    },{
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        ), true

        // INSERT
        await queryRunner.query(`INSERT INTO tb_specialization (id, NAME) VALUES 
                                (UUID(), "Alergologia"),
                                (UUID(), "Angiologia"),
                                (UUID(), "Buco Maxilo"),
                                (UUID(), "Cardiologia Clínica"),
                                (UUID(), "Cardiologia Infantil"),
                                (UUID(), "Cirurgia Cabeça e Pescoço"),
                                (UUID(), "Cirurgia Cardíaca"),
                                (UUID(), "Cirurgia de Tórax");`); 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_specialization");
    }

}
