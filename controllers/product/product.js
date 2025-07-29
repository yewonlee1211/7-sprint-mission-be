import {
  fetchAllProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProductService,
} from "../../services/product/product.js";

export const getAllProducts = async (req, res) => {
  const { query } = req;
  try {
    const products = await fetchAllProducts(query);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [getAllProducts] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id;
  const userId = req.query.userId;
  try {
    const products = await fetchProductById(id, userId);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [getProductById] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postProduct = async (req, res) => {
  const { data } = req.body;
  try {
    const products = await createProduct(data);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [postProduct] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchProduct = async (req, res) => {
  const { data } = req.body;
  const id = req.params.id;
  try {
    const products = await updateProduct(id, data);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [patchProduct] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await deleteProductService(id);
    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ [deleteProduct] error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
