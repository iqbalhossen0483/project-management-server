import config from '../config/config';
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
