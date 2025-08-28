import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

const getAll = async ({ userId, keyword, offset = 0, limit = 10, orderBy }) => {
  const search = keyword ? `%${keyword}%` : null;

  const whereClause = search
    ? Prisma.sql`AND (p.name ILIKE ${search} OR p.description ILIKE ${search})`
    : Prisma.empty;

  const orderClause =
    orderBy === "hearts"
      ? Prisma.sql`ORDER BY heart_count DESC`
      : Prisma.sql`ORDER BY p."updatedAt" DESC`;

  const rawResult = await prisma.$queryRaw`
    SELECT 
      p.id, 
      p.name, 
      p."updatedAt",
      u.id AS "userId", 
      u.nickname, 
      u.img,
      COUNT(DISTINCT CASE WHEN h.canceled = false THEN h.id END) AS heart_count,
      EXISTS (
        SELECT 1 FROM "ProductHeart" h2 
        WHERE h2."productId" = p.id AND h2."userId" = ${userId}
      ) AS "isHearted",
      (
        SELECT h3.id
        FROM "ProductHeart" h3
        WHERE h3."productId" = p.id
          AND h3."userId" = ${userId}
        LIMIT 1
      ) AS "heartId"
    FROM "Product" p
    JOIN "User" u ON p."userId" = u.id
    LEFT JOIN "ProductHeart" h ON h."productId" = p.id
    WHERE p.deleted = false
      ${whereClause}
    GROUP BY p.id, u.id
    ${orderClause}
    LIMIT ${Number(limit)} OFFSET ${Number(offset)};
  `;

  const result = rawResult.map((row) => ({
    ...row,
    heart_count: Number(row.heart_count),
    comment_count: Number(row.comment_count),
  }));

  return result;
};

// 상품게시글 단일 조회 get
const getById = async (id, userId) => {
  return await prisma.product.findUnique({
    where: { id, deleted: false },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      updatedAt: true,
      user: { select: { id: true, nickname: true, img: true } },
      _count: {
        select: {
          productHeart,
          productComment: { where: { deleted: false } },
        },
      },
      productHeart: {
        where: { userId: userId || "noUser" },
        select: { id: true },
      },
    },
  });
};

// 상품게시글 등록 post (입력값 data는 객체)
const post = async (data) => {
  return await prisma.product.create({
    data: data,
  });
};

// 상품게시글 수정 patch (입력값 data는 객체, id는 문자열)
const patch = async (id, data) => {
  return await prisma.product.update({
    where: { id: id },
    data: data,
  });
};

// 상품게시글 삭제 delete (입력값 id)
const deleteById = async (id) => {
  return await prisma.product.delete({ where: { id: id } });
};

export default {
  getAll,
  getById,
  post,
  patch,
  deleteById,
};
