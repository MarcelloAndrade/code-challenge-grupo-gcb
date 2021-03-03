import { Router } from "express";
import { DoctorService } from "../service/DoctorService";
import * as yup from "yup";

const doctorRoute = Router();
const doctorService = new DoctorService();

doctorRoute.post("/doctor", async (request, response) => {    
    const { name, crm, phone, cell } = request.body;

    const schema = yup.object().shape({
        name: yup.string().required("name is required"),
        crm: yup.number().required("crm is required"),
        phone: yup.string(),
        cell: yup.string(),
    })

    try {
        await schema.validate(request.body);
    } catch (error) {
        return response.status(400).json({ error: error.errors[0] });
    }

    const newDoctor = await doctorService.create(name, crm, phone, cell)        
    return response.status(201).json(newDoctor);           
})

doctorRoute.get("/doctor/:id", async (request, response) => {
    const id: string = request.params.id;
    const doctor = await doctorService.get(id)        
    return response.status(200).json(doctor);   
})

doctorRoute.put("/doctor/:id", async (request, response) => {
    const id: string = request.params.id;
    const { name, crm, phone, cell } = request.body;
    const updateDoctor = await doctorService.update(id, name, crm, phone, cell)        
    return response.status(200).json(updateDoctor);    
})

doctorRoute.delete("/doctor/:id", async (request, response) => {
    const id: string = request.params.id;
    await doctorService.softDelete(id);
    return response.status(200).send();
})

export { doctorRoute };

