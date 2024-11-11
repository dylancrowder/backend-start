import { Router } from "express";
import { ArticleController } from "../controllers/articles.controllers";

const router = Router();

router.get("/articles", ArticleController.getByFilters);
router.post("/articles", ArticleController.create);
router.put("/articles/:id", ArticleController.update);
router.delete("/articles/:id", ArticleController.deactivate);

export default router;
