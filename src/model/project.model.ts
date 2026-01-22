import mongoose from 'mongoose';
import { PROJECT_STATUS } from '../types/common';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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

projectSchema.virtual('user', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true,
});
projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_, ret: any) {
    delete ret.id;
    return ret;
  },
});

projectSchema.set('toObject', {
  virtuals: true,
  transform(_, ret: any) {
    delete ret.id;
    return ret;
  },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;

export type ProjectDocument = mongoose.Document & {
  name: string;
  description: string;
  status: PROJECT_STATUS;
  createdBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
};
