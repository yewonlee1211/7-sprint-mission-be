import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 상품 댓글 목록 조회 get
// 커서 기반 페이지네이션
const getAll = async (articleId, cursor, limit = 10) => {
  return await prisma.articleComment.findMany({
    where: { articleId, deleted: false },
    select: {
      id: true,
      content: true,
      user: { select: { nickname: true, id: true, img: true } },
      updatedAt: true,
    },
    cursor,
    take: parseInt(limit),
  });
};

// 상품 댓글 등록 post (입력값 data는 객체)
const post = async (articleId, data) => {
  const { userId, content } = data.data;
  return await prisma.articleComment.create({
    data: { userId, content, articleId },
  });
};

// 상품 댓글 수정 patch (입력값 data는 객체, id는 문자열)
const patch = async (articleId, id, data) => {
  return await prisma.articleComment.update({
    where: { id, articleId },
    data: data,
  });
};

// 상품 댓글 삭제 delete (입력값 id)
const deleteById = async (articleId, id) => {
  return await prisma.articleComment.delete({ where: { id, articleId } });
};

export default {
  getAll,
  post,
  patch,
  deleteById,
};
