import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tb_doctors")
class Doctor {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    @Index({ unique: true })
    crm: number;

    @Column()
    phone: string;

    @Column()
    cell: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(name: string, crm: number, phone: string, cell: string){ 
        if(!this.id){
            this.id = uuid();
        }
        this.name = name;
        this.crm = crm;
        this.phone = phone;
        this.cell = cell;
    }
}

export { Doctor } 