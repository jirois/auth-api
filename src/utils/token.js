import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateTokens = async (userId, role) => {
  const accessToken = jwt.sign(
    {
      id: userId,
      role: role,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  await RefreshToken.create({
    token: refreshToken,
    userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
  return { accessToken, refreshToken };
};

// export const generateRefreshToken = async (user) => {
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   console.log("JWT_SECRET:", process.env.JWT_SECRET);

//   const expiresAt = new Date();

//   expiresAt.setDate(expiresAt.getDate() + 7);

//   await RefreshToken.create({
//     iserId: user._id,
//     token,
//     expiresAt,
//   });
//   return token;
// };

// export const verifyRefreshToken = async (token) => {
//   try {
//     const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
//     const tokenDoc = await RefreshToken.findOne({ token, revoked: false });
//     if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
//       throw new Error("Refresh token expired or Invalid");
//     }
//     return payload;
//   } catch (error) {
//     throw new Error("Invalid refresh token");
//   }
// };

// === Revoke Refresh Token ===

const revokeRefreshToken = async (token) => {
  await RefreshToken.deleteOne({ token });
};

// === Revoke All Tokens for a User (Optional for logout everywhere ===
const revokeAllUserTokens = async (userId) => {
  await RefreshToken.deleteMany({ userId });
};

// === Verify Refresh Token ===
const verifyRefreshToken = async (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

// === Verify Access Token ===
const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export {
  generateTokens,
  revokeRefreshToken,
  revokeAllUserTokens,
  verifyRefreshToken,
  verifyAccessToken,
};
