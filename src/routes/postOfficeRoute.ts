import { Router } from "express";
import { getResponseError } from "../service/exception/ServiceException";

const postOfficeRoute = Router();

postOfficeRoute.get("/post-office/:cep", async (request, response) => {
    try {
        const cep: string = request.params.cep;
        
        return response.status(200).json(cep);    
    } catch (error) {
        return getResponseError(response, error)
    }    
})
export { postOfficeRoute };
