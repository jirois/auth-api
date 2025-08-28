import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateTokens,
  revokeRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";
import RefreshToken from "../models/RefreshToken.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const signupUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.create({ username, email, password, role });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(404).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });
  const refreshToken = await generateRefreshToken(user);

  res.status(200).json({ accessToken, refreshToken });
};

//
export const refreshToken = async (req, res) => {
  const { refreshToken: oldToken } = req.body;
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) await revokeRefreshToken(refreshToken);

  res.status(200).json({ message: "Logged out successfully" });
};
