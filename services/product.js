import productRepo from "../repositories/product.js";
import tagRepo from "../repositories/tag.js";

const getAll = async (query) => {
  const result = await productRepo.getAll(query);
  console.log(result);
  return result;
};

const getById = async (id, userId) => {
  return await productRepo.getById(id, userId);
};

const post = async (data) => {
  const { tags, ...rest } = data;
  const newItem = await productRepo.post(rest);
  const newTags = await Promise.all(
    tags.map(async (tag) => {
      return await tagRepo.post(tag, newItem.id);
    })
  );
  return { ...newItem, tags: newTags };
};

const patch = async (id, data) => {
  const { tags, ...rest } = data;
  const newItem = await productRepo.patch(id, rest);
  await tagRepo.deleteAll(id);
  const newTags = await Promise.all(
    tags.map(async (tag) => {
      return await tagRepo.post(tag, newItem.id);
    })
  );
  return { ...newItem, tags: newTags };
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
