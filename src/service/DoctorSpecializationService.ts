import { getCustomRepository } from "typeorm";
import { DoctorSpecialization } from "../models/DoctorSpecialization";
import { DoctorRepository } from "../repositories/DoctorRepository";
import { DoctorSpecializationRepository } from "../repositories/DoctorSpecializationRepository";
import { SpecializationRepository } from "../repositories/SpecializationRepository";
import { ServiceException } from "./exception/ServiceException";

class DoctorSpecializationService {
    
    async create(doctor_id: string, names: string[]){
        const doctorSpecializationRepository = getCustomRepository(DoctorSpecializationRepository)
        const specializationRepository = getCustomRepository(SpecializationRepository)
        const doctorRepository = getCustomRepository(DoctorRepository)

        var newArray: DoctorSpecialization[] = new Array();
        for (const name of names) {
            const specialization = await specializationRepository.findOne({ name: name });            
            if(!specialization){            
                throw new ServiceException(400, "Specialization not exist.", "ERROR DoctorSpecializationService > create > specialization not exist");
            }
            newArray.push(doctorSpecializationRepository.create({
                doctor_id: doctor_id,
                specialization_id: specialization.id                
            }));                                  
        }        
        await doctorSpecializationRepository.save(newArray);
        return doctorRepository.findOne(doctor_id); 
    }
}

export { DoctorSpecializationService };

