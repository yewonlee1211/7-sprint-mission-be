import express from "express";
import productHeartService from "../services/productHeart.js";
import { authLoginMiddleware } from "../config/passport.js";

const productHeartController = express.Router();

productHeartController.post("/", authLoginMiddleware, async (req, res) => {
  const data = req.body;
  try {
    const hearts = await productHeartService.post(data);
    if (!hearts) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(hearts);
  } catch (error) {
    console.error("❌ [postPHeart] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
productHeartController.delete("/:id", authLoginMiddleware, async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const hearts = await productHeartService.deleteById(id, data);
    if (!hearts) {
      return res.status(404).json({ error: "Hearts not found" });
    }
    res.status(200).json(hearts);
  } catch (error) {
    console.error("❌ [patchPHeart] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default productHeartController;
