import { Column, CreateDateColumn, Entity, Index, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Specialization } from "../models/Specialization";


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

    @ManyToMany(type => Specialization) // , { eager: true }
    @JoinTable({
        name: "tb_doctor_specialization",
        joinColumn: { name: "doctor_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "specialization_id", referencedColumnName: "id" }
    })
    specializations: Specialization[];

    constructor(){ 
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Doctor };

