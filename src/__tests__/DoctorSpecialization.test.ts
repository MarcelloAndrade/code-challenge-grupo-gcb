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
  
    it("Binds Specialization with Doctor", async () => {
        const newDoctor = await doctorService.create("Fernanda Oliveira", 5678921, null, null)

        const response = await request(app).post(`/doctors/${newDoctor.id}/specialization`).send({
            names: ["Buco Maxilo","Cirurgia Cabeça e Pescoço"]
        });

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(newDoctor.id);
        expect(response.body).toHaveProperty("specializations"); 
        
        await doctorService.delete(response.body.id)
    })  
    
    it("Binds Specialization with Doctor - (Specialization not exist)", async () => {
        const newDoctor = await doctorService.create("Fernanda Oliveira", 5678921, null, null/*  */)

        const response = await request(app).post(`/doctors/${newDoctor.id}/specialization`).send({
            names: ["Airplane Pilot","Cirurgia Cabeça e Pescoço"]
        });
        
        expect(response.status).toBe(400);                
        
        await doctorService.delete(newDoctor.id)
    }) 
})