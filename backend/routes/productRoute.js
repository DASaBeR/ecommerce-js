import express from "express";
import {
  read,
  details,
  create,
  update,
  remove,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.get("/read", read);
productRouter.get("/details/:id", details);
productRouter.post(
  "/create",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  create
);
productRouter.post("/update", update);
productRouter.post("/remove/:id", adminAuth, remove);

export default productRouter;
