import express from 'express';
import * as TiposController from './../controllers/tiposController.js';

const router = express.Router();

router.get('/', TiposController.listarTodos);
router.get('/:id', TiposController.listarUm);
router.post('/', TiposController.criar);
router.delete('/:id', TiposController.deletar);
router.put('/:id', TiposController.atualizar);

export default router;