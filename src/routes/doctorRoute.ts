import { Router } from "express"
import { Doctor } from "../models/Doctor";
import { DoctorService } from "../service/DoctorService"
import { getResponseError } from "../service/exception/ServiceException";

const doctorRoute = Router();
const doctorService = new DoctorService();

doctorRoute.post("/doctors", async (request, response) => {
    try {
        const { name, crm, phone, cell } = request.body;
        const newDoctor = await doctorService.create(new Doctor(name, crm, phone, cell))        
        return response.status(201).json(newDoctor);    
    } catch (err) {
        return getResponseError(response, err)
    }    
})

export { doctorRoute };

