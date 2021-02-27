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
        return await doctorRepository.save(newDoctor);
    }
}

export { DoctorService };
