import { Router } from "express";
import { DoctorService } from "../service/DoctorService";
import { getResponseError } from "../service/exception/ServiceException";

const doctorRoute = Router();
const doctorService = new DoctorService();

doctorRoute.post("/doctors", async (request, response) => {
    try {
        const { name, crm, phone, cell } = request.body;
        const newDoctor = await doctorService.create(name, crm, phone, cell)        
        return response.status(201).json(newDoctor);    
    } catch (error) {
        return getResponseError(response, error)
    }    
})

doctorRoute.get("/doctors/:id", async (request, response) => {
    try {
        const id: string = request.params.id;
        const doctor = await doctorService.get(id)        
        return response.status(200).json(doctor);    
    } catch (error) {
        return getResponseError(response, error)
    }    
})

doctorRoute.put("/doctors/:id", async (request, response) => {
    try {
        const id: string = request.params.id;
        const { name, crm, phone, cell } = request.body;
        const updateDoctor = await doctorService.update(id, name, crm, phone, cell)        
        return response.status(200).json(updateDoctor);    
    } catch (error) {
        return getResponseError(response, error)
    }
})

doctorRoute.delete("/doctors/:id", async (request, response) => {
    try {
        const id: string = request.params.id;
        await doctorService.softDelete(id);
        return response.status(200).send();
    } catch (error) {
        return getResponseError(response, error)
    }
})

export { doctorRoute };

