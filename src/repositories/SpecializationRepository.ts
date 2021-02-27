import { EntityRepository, Repository } from "typeorm";
import { Specialization } from "../models/Specialization";

@EntityRepository(Specialization)
class SpecializationRepository extends Repository<Specialization> {

}

export { SpecializationRepository }