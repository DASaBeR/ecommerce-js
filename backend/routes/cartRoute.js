import express from "express";
import { read, addItem, update } from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.get("/read", authUser, read);
cartRouter.get("/add", authUser, addItem);
cartRouter.get("/update", authUser, update);

export default cartRouter;
