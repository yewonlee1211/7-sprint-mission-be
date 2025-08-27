import {
  findUserByEmail,
  findUserById,
  postUser,
  updateUser,
} from "../repositories/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 비밀번호 해시 함수
async function hashingPassword(password) {
  return bcrypt.hash(password, 10);
}

// 토큰 생성 함수 (리프레쉬 기능 추가. type이 true라면 리프레쉬 발급.)
export function createToken(user, type = false) {
  const payload = { userId: user.id };
  const options = {
    expiresIn: type ? "2w" : "1h",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

// 리프레쉬 토큰으로 토큰 재발급
export async function refreshToken(userId, refreshToken) {
  const user = await findUserById(userId);
  if (!user || user.refreshToken !== refreshToken) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }

  const accessToken = createToken(user);
  const newRefreshToken = createToken(user, true);
  return { accessToken, newRefreshToken };
}

// 회원가입
export const createUser = async (user) => {
  const existedUser = await findUserByEmail(user.email);

  if (existedUser) {
    const error = new Error("User already exists");
    error.code = 422;
    error.data = { email: user.email };
    throw error;
  }

  const hassedPassword = await hashingPassword(user.password);
  const newUser = await postUser({ ...user, password: hassedPassword });
  const safeUser = filterSensitiveUserData(newUser);
  return safeUser;
};

// 로그인
export const getUser = async (email, password) => {
  const user = await findUserByEmail(email);
  // 이메일이 존재하지 않는 경우
  if (!user) {
    noUserError();
  }

  // 비밀번호 해싱해서 일치하는지 확인
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    const safeUser = filterSensitiveUserData(user);
    return safeUser;
  } else {
    noUserError();
  }
};

// id로 유저 찾기. 그리고 해당 id의 유저 정보 반환.
export const getUserById = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    noUserError();
  }

  const safeUser = filterSensitiveUserData(user);
  return safeUser;
};

// 유저 업데이트
export const patchUser = async (id, data) => {
  return await updateUser(id, data);
};

// 사용자 없을 때 에러
const noUserError = () => {
  const error = new Error("입력된 정보와 일치하는 사용자가 존재하지 않습니다.");
  error.code = 401;
  throw error;
};

// 민감한 정보 필터링
function filterSensitiveUserData(user) {
  const { password, refreshToken, ...rest } = user;
  return rest;
}
