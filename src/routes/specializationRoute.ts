import { Router } from "express";
import { getResponseError } from "../service/exception/ServiceException";
import { SpecializationService } from "../service/SpecializationService";

const specializationRoute = Router();
const specializationService = new SpecializationService();

specializationRoute.get("/specialization", async (request, response) => {
    try {
        const all = await specializationService.find()
        return response.status(200).json(all);    
    } catch (err) {
        return getResponseError(response, err)
    }    
})

export { specializationRoute };

