import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import statusCodes from '../config/statusCodes';
import asyncHandler from '../libs/asyncHandle';
import { User, UserDocument } from '../model/user.model';
import { LoginDto, RegisterDto } from '../validations/auth.validations';

const generateAccessToken = (user: UserDocument) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.tokenSecret, { expiresIn: '1d' });
  return token;
};
const generateRefreshToken = (user: UserDocument) => {
  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, config.tokenSecret, { expiresIn: '7d' });
  return token;
};

const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = asyncHandler(async (req, res) => {
  const payload: RegisterDto = req.body;

  const isExist = await User.findOne({ email: payload.email });
  if (isExist) {
    throw {
      status: statusCodes.CONFLICT,
      message: 'User already exists',
    };
  }

  const hasedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hasedPassword;

  const user = await User.create(payload);
  const { password, ...rest } = user.toObject();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  setCookies(res, accessToken, refreshToken);

  res.status(statusCodes.CREATED).json({
    message: 'User created successfully',
    success: true,
    data: rest,
    accessToken,
    refreshToken,
  });
});

export const login = asyncHandler(async (req, res) => {
  const payload: LoginDto = req.body;

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw {
      status: statusCodes.UNAUTHORIZED,
      message: 'Invalid credentials or user does not exist',
    };
  }

  const isValid = await bcrypt.compare(payload.password, user.password!);
  if (!isValid) {
    throw {
      status: statusCodes.UNAUTHORIZED,
      message: 'Invalid credentials or user does not exist',
    };
  }

  const { password, ...rest } = user.toObject();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  setCookies(res, accessToken, refreshToken);

  res.status(statusCodes.OK).json({
    message: 'User logged in successfully',
    success: true,
    data: rest,
    accessToken,
    refreshToken,
  });
});
