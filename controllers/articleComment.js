import { authLoginMiddleware } from "../config/passport.js";
import articleCommentService from "../services/articleComment.js";
import express from "express";

const articleCommentController = express.Router();

articleCommentController.get(
  "/:articleId",
  authLoginMiddleware,
  async (req, res) => {
    const articleId = req.params.articleId;
    const { cursor } = req.query;
    try {
      const aComments = await articleCommentService.getAll(articleId, cursor);
      if (!aComments) {
        return res.status(404).json({ error: "AComments not found" });
      }
      res.status(200).json(aComments);
    } catch (error) {
      console.error("❌ [getAllAComments] error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

articleCommentController.post(
  "/:articleId",
  authLoginMiddleware,
  async (req, res) => {
    const articleId = req.params.articleId;
    const data = req.body;
    try {
      const aComments = await articleCommentService.post(articleId, data);
      if (!aComments) {
        return res.status(404).json({ error: "AComments not found" });
      }
      res.status(200).json(aComments);
    } catch (error) {
      console.error("❌ [postAComment] error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

articleCommentController.patch(
  "/:articleId",
  authLoginMiddleware,
  async (req, res) => {
    const articleId = req.params.articleId;
    const { id, data } = req.body;
    try {
      const aComments = await articleCommentService.patch(articleId, id, data);
      if (!aComments) {
        return res.status(404).json({ error: "AComments not found" });
      }
      res.status(200).json(aComments);
    } catch (error) {
      console.error("❌ [patchAComment] error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

articleCommentController.delete(
  "/:articleId.:id",
  authLoginMiddleware,
  async (req, res) => {
    const articleId = req.params.articleId;
    const id = req.params.id;
    try {
      const aComments = await articleCommentService.deleteById(articleId, id);
      if (!aComments) {
        return res.status(404).json({ error: "AComments not found" });
      }
      res.status(200).json(aComments);
    } catch (error) {
      console.error("❌ [deleteAComment] error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default articleCommentController;
