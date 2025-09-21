import productCommentRepo from "../repositories/productComment.js";

const getAll = async (productId, cursor) => {
  return await productCommentRepo.getAll(productId, cursor);
};

const post = async (data) => {
  return await productCommentRepo.post(data);
};

const patch = async (productId, id, data) => {
  return await productCommentRepo.patch(productId, id, data);
};

const deleteById = async (productId, id) => {
  return await productCommentRepo.deleteById(productId, id);
};

export default {
  getAll,
  post,
  patch,
  deleteById,
};
