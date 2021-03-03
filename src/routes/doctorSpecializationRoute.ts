import { Router } from "express";
import { DoctorSpecializationService } from "../service/DoctorSpecializationService";
import { getResponseError } from "../service/exception/ServiceException";
import * as yup from "yup";

const doctorSpecializationRoute = Router();
const doctorSpecializationService = new DoctorSpecializationService();

doctorSpecializationRoute.post("/doctor/:id/specialization", async (request, response) => {
    try {
        const id: string = request.params.id;
        const { names } = request.body;
        
        const schema = yup.object().shape({
            names: yup.array().required("specialization is required"),
        })

        try {
            await schema.validate(request.body);
        } catch (error) {
            return response.status(400).json({ error: error.errors[0] });
        }
        
        const addDocSpecialization = await doctorSpecializationService.create(id, names)
        return response.status(201).json(addDocSpecialization);    
    } catch (error) {
        return getResponseError(response, error)
    }     
})

export { doctorSpecializationRoute };

