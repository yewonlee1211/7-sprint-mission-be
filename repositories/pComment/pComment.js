import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 상품 댓글 목록 조회 get
// 커서 기반 페이지네이션
export const getAllPComments = async (productId, cursor, limit = 10) => {
  return await prisma.pComment.findMany({
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
export const postPComment = async (productId, data) => {
  return await prisma.pComment.create({
    data: { ...data, productId },
  });
};

// 상품 댓글 수정 patch (입력값 data는 객체, id는 문자열)
export const patchPComment = async (productId, id, data) => {
  return await prisma.pComment.update({
    where: { id, productId },
    data: data,
  });
};

// 상품 댓글 삭제 delete (입력값 id)
export const deletePComment = async (productId, id) => {
  return await prisma.pComment.delete({ where: { id, productId } });
};
