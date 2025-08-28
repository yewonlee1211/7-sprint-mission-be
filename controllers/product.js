import express from "express";
import productService from "../services/product.js";
import { authLoginMiddleware } from "../config/passport.js";

const productController = express.Router();

productController.get("/", authLoginMiddleware, async (req, res) => {
  const { query } = req;
  try {
    const products = await productService.getAll(query);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [getAllProducts] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productController.get("/:id", authLoginMiddleware, async (req, res) => {
  const id = req.params.id;
  const userId = req.query.userId;
  try {
    const products = await productService.getById(id, userId);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [getProductById] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productController.post("/", authLoginMiddleware, async (req, res) => {
  const { data } = req.body;
  try {
    const products = await productService.post(data);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [postProduct] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productController.patch("/:id", authLoginMiddleware, async (req, res) => {
  const { data } = req.body;
  const id = req.params.id;
  try {
    const products = await productService.patch(id, data);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [patchProduct] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productController.delete("/:id", authLoginMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const products = await productService.deleteById(id);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [deleteProduct] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default productController;
