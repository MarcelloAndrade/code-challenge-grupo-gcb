import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tb_doctor")
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
    
    @Column()
    deleted_at: Date;

    constructor(){ 
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Doctor };
