import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

const post = async (tag, id) => {
  return await prisma.tag.create({
    data: { content: tag, productId: id },
  });
};

export default {
  post,
};
