import { getCustomRepository } from "typeorm";
import { SpecializationRepository } from "../repositories/SpecializationRepository";

class SpecializationService {
    
    async find(){
        const specializationRepository = getCustomRepository(SpecializationRepository)
        return await specializationRepository.find();
    }
}

export { SpecializationService };

