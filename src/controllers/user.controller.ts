import config from '../config/config';
import statusCodes from '../config/statusCodes';
import asyncHandler from '../libs/asyncHandle';
import { User } from '../model/user.model';

export const getAllUsers = asyncHandler(async (req, res) => {
  const currentUser = req.user?._id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || config.dataPerPage;
  const skip = (page - 1) * limit;

  const users = await User.find({ _id: { $ne: currentUser } })
    .select('-password')
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments({ _id: { $ne: currentUser } });

  res.status(200).json({
    message: 'Users fetched successfully',
    success: true,
    data: users,
    meta: {
      current_page: page,
      last_page: Math.ceil(total / limit),
      per_page: limit,
      total_data: total,
    },
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const currentUser = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw {
      status: statusCodes.NOT_FOUND,
      message: 'User not found',
    };
  }

  if (currentUser?.email === user.email) {
    throw {
      status: statusCodes.UNAUTHORIZED,
      message: 'You are not authorized to access this resource',
    };
  }

  user.role = role;
  const updatedUser = await user.save();
  const { password, ...rest } = updatedUser.toObject();
  res.status(statusCodes.OK).json({
    message: 'User role updated successfully',
    success: true,
    data: rest,
  });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const currentUser = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw {
      status: statusCodes.NOT_FOUND,
      message: 'User not found',
    };
  }

  if (currentUser?.email === user.email) {
    throw {
      status: statusCodes.UNAUTHORIZED,
      message: 'You are not authorized to access this resource',
    };
  }

  user.status = status;
  const updatedUser = await user.save();
  const { password, ...rest } = updatedUser.toObject();
  res.status(statusCodes.OK).json({
    message: 'User status updated successfully',
    success: true,
    data: rest,
  });
});
