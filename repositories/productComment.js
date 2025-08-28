import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 상품 댓글 목록 조회 get
// 커서 기반 페이지네이션
const getAll = async (productId, cursor, limit = 10) => {
  return await prisma.productComment.findMany({
    where: { productId },
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
const post = async (productId, data) => {
  return await prisma.productComment.create({
    data: { ...data, productId },
  });
};

// 상품 댓글 수정 patch (입력값 data는 객체, id는 문자열)
const patch = async (productId, id, data) => {
  return await prisma.productComment.update({
    where: { id, productId },
    data: data,
  });
};

// 상품 댓글 삭제 delete (입력값 id)
const deleteById = async (productId, id) => {
  return await prisma.productComment.delete({ where: { id, productId } });
};

export default {
  getAll,
  post,
  patch,
  deleteById,
};
