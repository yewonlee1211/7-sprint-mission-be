import articleRepo from "../repositories/article.js";

const getAll = async (query) => {
  return await articleRepo.getAll(query);
};

const getById = async (id, userId) => {
  return await articleRepo.getById(id, userId);
};

const post = async (data) => {
  return await articleRepo.post(data);
};

const patch = async (id, data) => {
  return await articleRepo.patch(id, data);
};

export default {
  getAll,
  getById,
  post,
  patch,
};
