import { Router } from "express";
import { SpecializationService } from "../service/SpecializationService";

const specializationRoute = Router();
const specializationService = new SpecializationService();

specializationRoute.get("/specializations", async (request, response) => {
    const all = await specializationService.findAll()
    return response.status(200).json(all);   
})

export { specializationRoute };

