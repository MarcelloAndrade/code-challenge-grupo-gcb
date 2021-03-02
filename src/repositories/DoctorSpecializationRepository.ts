import { EntityRepository, Repository } from "typeorm";
import { DoctorSpecialization } from "../models/DoctorSpecialization";

@EntityRepository(DoctorSpecialization)
class DoctorSpecializationRepository extends Repository<DoctorSpecialization> {

}

export { DoctorSpecializationRepository };
