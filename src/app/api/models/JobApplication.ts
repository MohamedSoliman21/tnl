import mongoose, { Schema, Document } from 'mongoose';

export interface IJobApplication extends Document {
  fullName: string;
  email: string;
  age: number;
  phoneNumber: string;
  portfolio?: string;
  careerId: string; // Reference to the career being applied for
  cvFileName: string;
  cvFileSize: number;
  cvFileType: string;
  cvFileBase64: string; // Store CV file as base64
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const JobApplicationSchema = new Schema<IJobApplication>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  portfolio: { type: String },
  careerId: { type: String, required: true }, // Reference to the career being applied for
  cvFileName: { type: String, required: true },
  cvFileSize: { type: Number, required: true },
  cvFileType: { type: String, required: true },
  cvFileBase64: { type: String, required: true }, // Store CV file as base64
  submittedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String }
});

export const JobApplication = mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
