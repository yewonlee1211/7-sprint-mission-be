import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export const getAllProducts = async ({
  userId,
  keyword,
  offset = 0,
  limit = 10,
  orderBy,
}) => {
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
        SELECT 1 FROM "PHeart" h2 
        WHERE h2."productId" = p.id AND h2."userId" = ${userId} AND h2.canceled = false
      ) AS "isHearted",
      (
        SELECT h3.id
        FROM "PHeart" h3
        WHERE h3."productId" = p.id
          AND h3."userId" = ${userId}
          AND h3.canceled = false
        LIMIT 1
      ) AS "heartId"
    FROM "Product" p
    JOIN "User" u ON p."userId" = u.id
    LEFT JOIN "PHeart" h ON h."productId" = p.id
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
export const getProductById = async (id, userId) => {
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
          PHeart: { where: { canceled: false } },
          pComment: { where: { deleted: false } },
        },
      },
      PHeart: {
        where: { userId: userId || "noUser", canceled: false },
        select: { id: true },
      },
    },
  });
};

// 상품게시글 등록 post (입력값 data는 객체)
export const postProduct = async (data) => {
  return await prisma.product.create({
    data: data,
  });
};

// 상품게시글 수정 patch (입력값 data는 객체, id는 문자열)
export const patchProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id: id },
    data: data,
  });
};

// 상품게시글 삭제 delete (입력값 id)
export const deleteProduct = async (id) => {
  return await prisma.product.delete({ where: { id: id } });
};
