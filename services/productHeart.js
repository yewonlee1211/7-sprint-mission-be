import productHeartRepo from "../repositories/productHeart.js";

const post = async (data) => {
  return await productHeartRepo.post(data);
};

const deleteById = async (id, data) => {
  return await productHeartRepo.deleteById(id, data);
};

export default {
  post,
  deleteById,
};
