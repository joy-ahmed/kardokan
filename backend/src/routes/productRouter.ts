import { Router } from "express";
import { getProducts, getProduct, createProduct } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);

export default router;