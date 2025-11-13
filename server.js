import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import petsRoutes from "./src/routes/petsRoutes.js"
import tiposRoutes from './src/routes/tiposRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

app.use("/pets", petsRoutes);
app.use('/tipos', tiposRoutes);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});