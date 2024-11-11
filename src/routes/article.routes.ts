import { Router } from "express";
import { ArticleController } from "../controllers/articles.controllers";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/articles", ArticleController.getByFilters);
router.post("/articles", auth, ArticleController.create);
router.put("/articles/:id", auth, ArticleController.update);
router.delete("/articles/:id", ArticleController.deactivate);


export default router;
