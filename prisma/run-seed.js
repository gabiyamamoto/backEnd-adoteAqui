import seed from "./seed.js";

export default async function runSeed(req, res) {
    try {
        await seed();
        res.send("Seed rodado com sucesso!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao rodar o seed");
    }
}