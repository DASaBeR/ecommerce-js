import express from "express";
import {read, addItem, update} from "../controllers/cartController.js"

const cartRouter = express.Router();

cartRouter.get("/read", read);
cartRouter.get("/add", addItem);
cartRouter.get("/update", update);

export default cartRouter;