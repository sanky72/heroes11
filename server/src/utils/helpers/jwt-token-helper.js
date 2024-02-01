import pkg from "jsonwebtoken";
import { jwtSecretKey, refreshTokenSecretKey } from "../../config/index.js";
const { sign } = pkg;

export function signAccessToken(userId) {
  const accessToken = sign({ _id: userId }, jwtSecretKey, {
    expiresIn: "7d",
  });
  return accessToken;
}
export function signRefreshToken(userId) {
  const refreshToken = sign({ _id: userId }, refreshTokenSecretKey, {
    expiresIn: "28d",
  });
  return refreshToken;
}
export function signConfirmCodeToken(userId, confirmCode) {
  const confirmCodeToken = sign(
    { _id: userId, code: confirmCode },
    jwtSecretKey,
    {
      expiresIn: "5m",
    }
  );
  return confirmCodeToken;
}
