import "reflect-metadata" // type-orm
import createConnection from "./database/connection"
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { doctorRoute } from "./routes/doctorRoute"
import { specializationRoute } from "./routes/specializationRoute"
import { doctorSpecializationRoute } from "./routes/doctorSpecializationRoute";
import { postOfficeRoute } from "./routes/postOfficeRoute"
import { ServiceError } from "./service/exception/ServiceError";

createConnection();

const app = express();

app.use(express.json());

app.use(doctorRoute);
app.use(specializationRoute);
app.use(doctorSpecializationRoute);
app.use(postOfficeRoute);

app.use(
    (error: Error, request: Request, response: Response, _next: NextFunction) => {
        if(error instanceof ServiceError){
            console.log(">", error.log, "status code:", error.statusCode, "message:", error.message)
            return response.status(error.statusCode).json({message: error.message});    
        }

        console.log(">", error.message)
        return response.status(500).json({message: "Internal Server Error"});
    }
)

export { app }