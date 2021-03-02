import request from "supertest";
import { app } from "../app";
import createConnection from "../database/connection"
import { DoctorService } from "../service/DoctorService";

const doctorService = new DoctorService();

describe("Doctor Test", () => {

    beforeAll(async () => {        
        const connection = await createConnection();
        await connection.runMigrations(); 
    })  
  
    it("Create a new Doctor", async () => {
        const response = await request(app).post("/doctors").send({
            name: "Marcus Fernandes",
            crm: "38616",
            cell: "11951732200"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");  
        
        await doctorService.delete(response.body.id)
    })
    
    it("Soft Delete a Doctor", async () => {
        const newDoctor = await request(app).post("/doctors").send({
            name: "Maria de Fatima",
            crm: "861623",
            cell: "15952733210"
        });
        expect(newDoctor.status).toBe(201);

        const response = await request(app).delete(`/doctors/${newDoctor.body.id}`)                
        expect(response.status).toBe(200);

        const responseDoc = await doctorService.get(response.body.id)
        await doctorService.delete(responseDoc.id)
    })
    
})