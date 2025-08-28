import articleHeartRepo from "../repositories/articleHeart.js";

const post = async (data) => {
  return await articleHeartRepo.post(data);
};

const deleteById = async (id, data) => {
  return await articleHeartRepo.deleteById(id, data);
};

export default {
  post,
  deleteById,
};
