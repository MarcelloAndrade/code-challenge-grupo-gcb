import { Router } from "express";
import * as yup from "yup";
import { DoctorSpecializationService } from "../service/DoctorSpecializationService";

const doctorSpecializationRoute = Router();
const doctorSpecializationService = new DoctorSpecializationService();

doctorSpecializationRoute.post("/doctor/:id/specialization", async (request, response) => {
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
})

export { doctorSpecializationRoute };

