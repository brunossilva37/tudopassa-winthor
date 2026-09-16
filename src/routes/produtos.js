import { Router } from "express";
import * as controller from "../controllers/produtosController.js";

const router = Router();

router.get("/", controller.listar);
router.get("/:codigo", controller.buscar);

export default router;
