import express from "express";
import articleHeartService from "../services/articleHeart.js";
import { authLoginMiddleware } from "../config/passport.js";

const articleHeartController = express.Router();

articleHeartController.post("/", authLoginMiddleware, async (req, res) => {
  const data = req.body;
  try {
    const hearts = await articleHeartService.post(data);
    if (!hearts) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(hearts);
  } catch (error) {
    console.error("❌ [postAHeart] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

articleHeartController.delete("/:id", authLoginMiddleware, async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const hearts = await articleHeartService.deleteById(id, data);
    if (!hearts) {
      return res.status(404).json({ error: "Hearts not found" });
    }
    res.status(200).json(hearts);
  } catch (error) {
    console.error("❌ [patchAHeart] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default articleHeartController;
