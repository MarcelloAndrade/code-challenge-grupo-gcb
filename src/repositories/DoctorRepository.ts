import { EntityRepository, Repository } from "typeorm";
import { Doctor } from "../models/Doctor";

@EntityRepository(Doctor)
class DoctorRepository extends Repository<Doctor> {

}

export { DoctorRepository }