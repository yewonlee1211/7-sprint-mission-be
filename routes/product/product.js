import express from "express";
import {
  getAllProducts,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} from "../../controllers/product/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", postProduct);
router.patch("/:id", patchProduct);
router.delete("/:id", deleteProduct);

export default router;
