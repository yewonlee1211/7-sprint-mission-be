import articleCommentRepo from "../repositories/articleComment.js";

const getAll = async (articleId, cursor) => {
  return await articleCommentRepo.getAll(articleId, cursor);
};

const post = async (articleId, data) => {
  return await articleCommentRepo.post(articleId, data);
};

const patch = async (articleId, id, data) => {
  return await articleCommentRepo.patch(articleId, id, data);
};

const deleteById = async (articleId, id) => {
  return await articleCommentRepo.deleteById(articleId, id);
};

export default {
  getAll,
  post,
  patch,
  deleteById,
};
