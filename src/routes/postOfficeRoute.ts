import { Router } from "express";

const postOfficeRoute = Router();

postOfficeRoute.get("/post-office/:cep", async (request, response) => {
    const cep: string = request.params.cep;        
    return response.status(200).json(cep);     
})
export { postOfficeRoute };