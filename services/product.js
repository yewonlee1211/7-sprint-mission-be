import productRepo from "../repositories/product.js";

const getAll = async (query) => {
  return await productRepo.getAll(query);
};

const getById = async (id, userId) => {
  return await productRepo.getById(id, userId);
};

const post = async (data) => {
  return await productRepo.post(data);
};

const patch = async (id, data) => {
  return await productRepo.patch(id, data);
};

const deleteById = async (id) => {
  return await productRepo.deleteById(id);
};

export default {
  getAll,
  getById,
  post,
  patch,
  deleteById,
};
