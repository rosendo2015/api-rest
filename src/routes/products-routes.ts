import { Router } from "express";
import { myMiddleware } from "../middleware/my-middleware";
import { ProductsController } from "../controllers/ProductsController";

const productsRoutes = Router()
const productsController = new ProductsController()
productsRoutes.use(myMiddleware)

productsRoutes.get("/:id", productsController.index)
productsRoutes.post("/", productsController.create)

export { productsRoutes }