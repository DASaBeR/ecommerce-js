import express from "express"
import { read, details, create, update, remove } from "../controllers/productController.js"

const productRouter = express.Router();

productRouter.get("/read", read);
productRouter.get("/details", details);
productRouter.post("/create", create);
productRouter.post("/update", update);
productRouter.post("/remove", remove);

export default productRouter;