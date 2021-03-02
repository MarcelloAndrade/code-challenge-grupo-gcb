import { getCustomRepository } from "typeorm";
import { ServiceException } from "./exception/ServiceException";
import { Doctor } from "../models/Doctor";
import { DoctorRepository } from "../repositories/DoctorRepository";

class DoctorService {
    
    async create(doctor: Doctor){
        const doctorRepository = getCustomRepository(DoctorRepository)
        
        const { crm } = doctor;
        const crmAlreadyExist = await doctorRepository.findOne({ crm });
        if(crmAlreadyExist){
            throw new ServiceException(400, "CRM already exist.", "ERROR DoctorService > create > crmAlreadyExist");
        }

        const newDoctor = doctorRepository.create(doctor);
        console.log("Doctor created uuid: ", newDoctor.id);
        return await doctorRepository.save(newDoctor);
    }

    async get(id: string){
        const doctorRepository = getCustomRepository(DoctorRepository)

        const doctor = await doctorRepository.findOne(id);
        if(doctor){            
            return doctor
        } else {
            throw new ServiceException(500, "Doctor not exist.", "ERROR DoctorService > get > doctorNotExist");
        }
    }

    async update(id: string, doctor: Doctor) {
        const doctorRepository = getCustomRepository(DoctorRepository)
        
        const updateDoctor = await doctorRepository.findOne(id);
        if(updateDoctor){  
            updateDoctor.name = doctor.name != null ? doctor.name : updateDoctor.name;
            updateDoctor.crm = doctor.crm != null ? doctor.crm : updateDoctor.crm;
            updateDoctor.phone = doctor.phone != null ? doctor.phone : updateDoctor.phone;
            updateDoctor.cell = doctor.cell != null ? doctor.cell : updateDoctor.cell;
            return await doctorRepository.save(updateDoctor);
        } else {
            throw new ServiceException(500, "Doctor not exist.", "ERROR DoctorService > update");
        }
    }

    async softDelete(id: string){
        const doctorRepository = getCustomRepository(DoctorRepository)

        const doctorNotExist = await doctorRepository.findOne(id);
        if(!doctorNotExist){
            throw new ServiceException(500, "Doctor not exist.", "ERROR DoctorService > softDelete > doctorNotExist");
        }  
        
        doctorNotExist.deleted_at = new Date();
        await doctorRepository.save(doctorNotExist);
        console.log("Doctor soft deleted uuid: ", id);         
    }  
    
    async delete(id: string){
        const doctorRepository = getCustomRepository(DoctorRepository)
        const doctorNotExist = await doctorRepository.findOne(id);
        if(!doctorNotExist){
            throw new ServiceException(500, "Doctor not exist.", "ERROR DoctorService > delete > doctorNotExist");
        }
        await doctorRepository.delete(id);                
    } 
}

export { DoctorService };
