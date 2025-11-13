import 'dotenv/config';
import express from 'express';
import tiposRoutes from './src/routes/tiposRoutes.js';

const app = express();
app.use(express.json());

const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

app.get('/', (req, res) => {
    res.json({
        mensagem: 'Bem-vindo à API AdoteAqui! 🐾',
        endpoints: {
            pets: '/pets'
        }
    });
});

app.use('/tipos', tiposRoutes);

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});