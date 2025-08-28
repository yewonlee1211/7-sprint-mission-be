import { authLoginMiddleware } from "../config/passport.js";
import articleService from "../services/article.js";
import express from "express";

const articleController = express.Router();

articleController.get("/", authLoginMiddleware, async (req, res) => {
  const { query } = req;
  try {
    const articles = await articleService.getAll(query);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [getAllArticles] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

articleController.get("/:id", authLoginMiddleware, async (req, res) => {
  const id = req.params.id;
  const userId = req.query.userId;
  try {
    const articles = await articleService.getById(id, userId);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [getArticleById] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

articleController.post("/", authLoginMiddleware, async (req, res) => {
  const { data } = req.body;
  try {
    const articles = await articleService.post(data);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [postArticle] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

articleController.patch("/:id", authLoginMiddleware, async (req, res) => {
  const { data } = req.body;
  const id = req.params.id;
  try {
    const articles = await articleService.patch(id, data);
    if (!articles) {
      return res.status(404).json({ error: "Articles not found" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error("❌ [patchArticle] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default articleController;
