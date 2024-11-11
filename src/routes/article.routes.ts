import { Router } from "express";
import { ArticleController } from "../controllers/articles.controllers";

const router = Router();

router.get("/articles", ArticleController.getByName);
router.post("/articles", ArticleController.create);

export default router;
