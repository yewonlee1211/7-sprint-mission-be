import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 자유게시글 목록 조회 get
// offset 페이지네이션, 최신순 정렬
// title, content에 포함된 단어로 검색
const getAll = async ({ userId, keyword, offset = 0, limit = 10, orderBy }) => {
  const search = keyword ? `%${keyword}%` : null;

  const whereClause = search
    ? Prisma.sql`AND (a.title ILIKE ${search} OR a.content ILIKE ${search})`
    : Prisma.empty;

  const orderClause =
    orderBy === "hearts"
      ? Prisma.sql`ORDER BY heart_count DESC`
      : Prisma.sql`ORDER BY a."updatedAt" DESC`;

  const rawResult = await prisma.$queryRaw`
    SELECT 
      a.id, 
      a.title, 
      a."updatedAt",
      u.id AS "userId", 
      u.nickname, 
      u.img,
      COUNT(DISTINCT CASE WHEN h.canceled = false THEN h.id END) AS heart_count,
      EXISTS (
        SELECT 1 FROM "ArticleHeart" h2 
        WHERE h2."articleId" = a.id AND h2."userId" = ${userId}
      ) AS "isHearted",
      (
        SELECT h3.id
        FROM "ArticleHeart" h3
        WHERE h3."articleId" = a.id
          AND h3."userId" = ${userId}
        LIMIT 1
      ) AS "heartId"
    FROM "Article" a
    JOIN "User" u ON a."userId" = u.id
    LEFT JOIN "ArticleHeart" h ON h."articleId" = a.id
    WHERE a.deleted = false
      ${whereClause}
    GROUP BY a.id, u.id
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

// 자유게시글 단일 조회 get
const getById = async (id, userId) => {
  return await prisma.article.findUnique({
    where: { id, deleted: false },
    select: {
      id: true,
      title: true,
      content: true,
      updatedAt: true,
      user: { select: { id: true, nickname: true, img: true } },
      _count: {
        select: {
          articleHeart,
          articleComment: { where: { deleted: false } },
        },
      },
      articleHeart: {
        where: { userId: userId || "noUser" },
        select: { id: true },
      },
    },
  });
};

// 자유게시글 등록 post (입력값 data는 객체)
const post = async (data) => {
  return await prisma.article.create({
    data: data,
  });
};

// 자유게시글 수정 patch (입력값 data는 객체, id는 문자열)
const patch = async (id, data) => {
  return await prisma.article.update({
    where: { id: id },
    data: data,
  });
};

export default {
  getAll,
  getById,
  post,
  patch,
};
