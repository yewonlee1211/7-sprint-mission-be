import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// heart post (좋아요 생성. 유저id와 게시물 id가 필요)
const post = async (data) => {
  return await prisma.articleHeart.create({
    data: data,
  });
};

// heart patch (입력값 data는 객체, id는 문자열)
const deleteById = async (id) => {
  return await prisma.articleHeart.delete({
    where: { id },
  });
};

export default {
  post,
  deleteById,
};
