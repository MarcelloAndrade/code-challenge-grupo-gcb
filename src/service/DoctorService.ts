import { getCustomRepository } from "typeorm";
import { DoctorRepository } from "../repositories/DoctorRepository";
import { ServiceException } from "./exception/ServiceException";

class DoctorService {
    
    async create(name: string, crm: number, phone: string, cell: string){
        const doctorRepository = getCustomRepository(DoctorRepository)        
        
        const crmAlreadyExist = await doctorRepository.findOne({ crm: crm });
        if(crmAlreadyExist){
            throw new ServiceException(400, "CRM already exist.", "ERROR DoctorService > create > crmAlreadyExist");
        }        
        const doctor = doctorRepository.create({
            name: name,
            crm: crm,
            phone: phone,
            cell: cell
        })
        return await doctorRepository.save(doctor);
    }

    async get(id: string){
        const doctorRepository = getCustomRepository(DoctorRepository)

        const doctor = await doctorRepository.findOne({ 
            where: { id: id},
            relations: ["specializations"]
        });
        if(doctor){            
            return doctor
        } else {
            throw new ServiceException(500, "Doctor not exist.", "ERROR DoctorService > get > doctorNotExist");
        }
    }

    async update(id: string, name: string, crm: number, phone: string, cell: string) {
        const doctorRepository = getCustomRepository(DoctorRepository)
        
        const doctor = await doctorRepository.findOne({ id: id });
        if(doctor){  
            doctor.name = name != null ? name : doctor.name;
            doctor.crm = crm != null ? crm : doctor.crm;
            doctor.phone = phone != null ? phone : doctor.phone;
            doctor.cell = cell != null ? cell : doctor.cell;
            return await doctorRepository.save(doctor);
        } else {
            throw new ServiceException(500, "Doctor not exist.", "ERROR DoctorService > update");
        }
    }

    async softDelete(id: string){
        const doctorRepository = getCustomRepository(DoctorRepository)

        const doctorNotExist = await doctorRepository.findOne({ id: id });
        if(!doctorNotExist){
            throw new ServiceException(500, "Doctor not exist.", "ERROR DoctorService > softDelete > doctorNotExist");
        }  
        
        doctorNotExist.deleted_at = new Date();
        await doctorRepository.save(doctorNotExist);
        console.log("Doctor soft deleted uuid: ", id);         
    }  
    
    async delete(id: string){
        const doctorRepository = getCustomRepository(DoctorRepository)
        const doctorNotExist = await doctorRepository.findOne({ id: id });
        if(!doctorNotExist){
            throw new ServiceException(500, "Doctor not exist.", "ERROR DoctorService > delete > doctorNotExist");
        }
        await doctorRepository.delete(id);                
    } 
}

export { DoctorService };

