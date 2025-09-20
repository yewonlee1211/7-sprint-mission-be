import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 아이디로 유저 찾기
// 찾으면 유저 객체 리턴
export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

// 이메일로 유저 찾기
// 찾으면 유저 객체 리턴
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email: email },
  });
};

// 입력된 데이터로 유저 생성 (회원가입)
export const postUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};

// 유저 데이터 업데이터
export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};
