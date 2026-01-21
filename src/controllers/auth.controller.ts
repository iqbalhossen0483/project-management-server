import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import statusCodes from '../config/statusCodes';
import asyncHandler from '../libs/asyncHandle';
import { User } from '../model/user.entity';
import { LoginDto, RegisterDto } from '../validations/auth.validations';

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

  res.status(statusCodes.CREATED).json({
    message: 'User created successfully',
    success: true,
    data: rest,
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

  res.status(statusCodes.OK).json({
    message: 'User logged in successfully',
    success: true,
    data: rest,
  });
});
