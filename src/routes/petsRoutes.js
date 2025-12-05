import { Router } from "express";
import * as PetsController from '../controllers/petsController.js'

const router = Router();

router.get("/", PetsController.listarTodos); //Listar todos
router.get("/buscar", PetsController.buscar); //Busca por ID ou nome
router.get("/:id", PetsController.listarUm); //Busca por ID
router.post("/", PetsController.criar); //Cria pet
router.delete("/:id", PetsController.deletar); //Deleta pet
router.put("/:id", PetsController.atualizar); //Atualiza pet

export default router;