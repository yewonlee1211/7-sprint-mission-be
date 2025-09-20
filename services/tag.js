import tagRepo from "../repositories/tag.js";

const postAll = async () => {
  Promise.all(
    tags.map(async (tag) => {
      return await tagRepo.post(tag);
    })
  );
};

export default {
  postAll,
};
