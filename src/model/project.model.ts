import mongoose from 'mongoose';
import { PROJECT_STATUS } from '../types/common';

const projectSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    status: {
      type: String,
      enum: PROJECT_STATUS,
      default: PROJECT_STATUS.ACTIVE,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', projectSchema);
export default Project;

export type ProjectDocument = mongoose.Document & {
  name: string;
  description: string;
  status: PROJECT_STATUS;
  createdBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
};
