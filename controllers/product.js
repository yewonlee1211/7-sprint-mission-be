import express from "express";
import productService from "../services/product.js";
import { authLoginMiddleware } from "../config/passport.js";
import { refreshUserTokens, setTokenCookies } from "../services/user.js";

const productController = express.Router();

productController.get("/", authLoginMiddleware, async (req, res) => {
  const { query } = req;
  console.log(query);
  try {
    const products = await productService.getAll(query);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error("❌ [getAllProducts] error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

productController.get("/:id", authLoginMiddleware, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const products = await productService.getById(id, userId);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    return res.json(products);
  } catch (error) {
    console.error("❌ [getProductById] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

productController.post("/", authLoginMiddleware, async (req, res) => {
  const { data } = req.body;
  const userId = req.user.id;
  try {
    const products = await productService.post({ ...data, userId });
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
