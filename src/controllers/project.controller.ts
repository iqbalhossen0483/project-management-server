import config from '../config/config';
import statusCodes from '../config/statusCodes';
import asyncHandler from '../libs/asyncHandle';
import Project from '../model/project.model';
import { User } from '../model/user.model';

export const getAllProjects = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || config.dataPerPage;
  const skip = (page - 1) * limit;

  const projects = await Project.find()
    .populate('user', '_id name email role status')
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments();

  res.status(statusCodes.OK).json({
    message: 'Projects fetched successfully',
    success: true,
    data: projects,
    meta: {
      current_page: page,
      last_page: Math.ceil(total / limit),
      per_page: limit,
      total_data: total,
    },
  });
});

export const postProject = asyncHandler(async (req, res) => {
  const isUserExist = await User.findById(req.body.createdBy);
  if (!isUserExist) {
    throw {
      status: statusCodes.NOT_FOUND,
      message: 'User not found',
    };
  }

  const project = await Project.create(req.body);
  res.status(statusCodes.CREATED).json({
    message: 'Project created successfully',
    success: true,
    data: project,
  });
});
