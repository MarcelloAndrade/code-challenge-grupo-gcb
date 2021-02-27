import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("tb_specialization")
class Specialization {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    @Index({ unique: true })
    name: string;
    
    @CreateDateColumn()
    created_at: Date;

    constructor(name: string){ 
        if(!this.id){
            this.id = uuid();
        }
        this.name = name;        
    }
}

export { Specialization } 