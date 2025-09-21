import express from "express";
import productCommentService from "../services/productComment.js";
import { authLoginMiddleware } from "../config/passport.js";

const productCommentController = express.Router();

productCommentController.get(
  "/:productId",
  authLoginMiddleware,
  async (req, res) => {
    const productId = req.params.productId;
    const { cursor } = req.query;
    try {
      const pComments = await productCommentService.getAll(productId, cursor);
      if (!pComments) {
        return res.status(404).json({ error: "PComments not found" });
      }
      res.status(200).json(pComments);
    } catch (error) {
      console.error("❌ [getAllPComments] error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

productCommentController.post(
  "/:productId",
  authLoginMiddleware,
  async (req, res) => {
    const productId = req.params.productId;
    const { data } = req.body;
    const { id: userId } = req.user;
    try {
      const pComments = await productCommentService.post({
        ...data,
        userId,
        productId,
      });
      if (!pComments) {
        return res.status(404).json({ error: "PComments not found" });
      }
      res.status(200).json(pComments);
    } catch (error) {
      console.error("❌ [postPComment] error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

productCommentController.patch(
  "/:productId",
  authLoginMiddleware,
  async (req, res) => {
    const productId = req.params.productId;
    const { id, data } = req.body;
    try {
      const pComments = await productCommentService.patch(productId, id, data);
      if (!pComments) {
        return res.status(404).json({ error: "PComments not found" });
      }
      res.status(200).json(pComments);
    } catch (error) {
      console.error("❌ [patchPComment] error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

productCommentController.delete(
  "/:productId.:id",
  authLoginMiddleware,
  async (req, res) => {
    const productId = req.params.productId;
    const id = req.params.id;
    try {
      const pComments = await productCommentService.deleteById(productId, id);
      if (!pComments) {
        return res.status(404).json({ error: "PComments not found" });
      }
      res.status(200).json(pComments);
    } catch (error) {
      console.error("❌ [deletePComment] error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default productCommentController;
