import {
  getAllProducts,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct,
} from "../../repositories/product/product.js";

export const fetchAllProducts = async (query) => {
  return await getAllProducts(query);
};

export const fetchProductById = async (id, userId) => {
  return await getProductById(id, userId);
};

export const createProduct = async (data) => {
  return await postProduct(data);
};

export const updateProduct = async (id, data) => {
  return await patchProduct(id, data);
};

export const deleteProductService = async (id) => {
  return await deleteProduct(id);
};
