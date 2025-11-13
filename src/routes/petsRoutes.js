import { Router } from "express";
import * as PetsController from '../controllers/petsController.js'

const router = Router();

router.get("/", PetsController.listarTodos);
router.get("/:id", PetsController.listarUm);
router.post("/", PetsController.criar);
router.delete("/:id", PetsController.deletar);
router.put("/:id", PetsController.atualizar);

export default router;
