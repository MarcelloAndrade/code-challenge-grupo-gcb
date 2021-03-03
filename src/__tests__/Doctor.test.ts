import request from "supertest";
import { app } from "../app";
import createConnection from "../database/connection";
import { DoctorService } from "../service/DoctorService";

const doctorService = new DoctorService();

describe("Doctor Test", () => {

    beforeAll(async () => {        
        const connection = await createConnection();
        await connection.runMigrations(); 
    })  
  
    it("Create a new Doctor", async () => {
        const response = await request(app).post("/doctor").send({
            name: "Marcus Fernandes",
            crm: "1263978",
            cell: "11951732200"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");  
        
        await doctorService.delete(response.body.id)
    })

    it("Get a Doctor", async () => {
        const newDoctor = await doctorService.create("Fernanda Oliveira", 5678921, null, null)
        
        const response = await request(app).get(`/doctor/${newDoctor.id}`)
        expect(response.body.name).toBe(newDoctor.name);
        expect(response.body.crm).toBe(newDoctor.crm);

        await doctorService.delete(newDoctor.id)
    })

    it("Update a Doctor", async () => {
        const newDoctor = await doctorService.create("Jessica Aparecida", 6584785, null, null)
        
        const response = await request(app).put(`/doctor/${newDoctor.id}`).send({
            name: "Jessica Aparecida Mollo",            
            cell: "11951732232"
        });
        expect(response.body.name).not.toBe(newDoctor.name);
        expect(response.body.name).toBe("Jessica Aparecida Mollo");
        expect(response.body.crm).toBe(newDoctor.crm);
        expect(response.body.cell).not.toBeNull();

        await doctorService.delete(newDoctor.id)
    })
    
    it("Soft Delete a Doctor", async () => {
        const newDoctor = await doctorService.create("Maria de Fatima", 3245878, "15952733210", null)
        
        const response = await request(app).delete(`/doctor/${newDoctor.id}`)
        expect(response.status).toBe(200);
        
        const getDoctor = await doctorService.get(newDoctor.id)
        expect(getDoctor.deleted_at).not.toBeNull();

        await doctorService.delete(newDoctor.id)
    })
    
})