import "reflect-metadata" // type-orm
import "./database/connection"

import express from "express";

import { doctorRoute } from "./routes/doctorRoute"
import { specializationRoute } from "./routes/specializationRoute"

const app = express();

app.use(express.json());

app.use(doctorRoute);
app.use(specializationRoute);

app.listen(3000, () => console.log("Server is running!"))