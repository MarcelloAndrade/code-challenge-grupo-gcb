import { Router } from "express";
import { DoctorSpecializationService } from "../service/DoctorSpecializationService";
import { getResponseError } from "../service/exception/ServiceException";

const doctorSpecializationRoute = Router();
const doctorSpecializationService = new DoctorSpecializationService();

doctorSpecializationRoute.post("/doctor/:id/specialization", async (request, response) => {
    try {
        const id: string = request.params.id;
        const { names } = request.body;        
        const addDocSpecialization = await doctorSpecializationService.create(id, names)
        return response.status(201).json(addDocSpecialization);    
    } catch (error) {
        return getResponseError(response, error)
    }     
})

export { doctorSpecializationRoute };

