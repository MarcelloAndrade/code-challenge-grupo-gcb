import "reflect-metadata" // type-orm
import createConnection from "./database/connection"
import express from "express";

import { doctorRoute } from "./routes/doctorRoute"
import { specializationRoute } from "./routes/specializationRoute"
import { doctorSpecializationRoute } from "./routes/doctorSpecializationRoute";

createConnection();

const app = express();

app.use(express.json());

app.use(doctorRoute);
app.use(specializationRoute);
app.use(doctorSpecializationRoute);

export { app }