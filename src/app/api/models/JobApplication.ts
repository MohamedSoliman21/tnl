import mongoose, { Schema, Document } from 'mongoose';

export interface IJobApplication extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  brandDescription: string;
  position: string;
  careerId?: string; // Reference to the career being applied for
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  extraNotes?: string;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const JobApplicationSchema = new Schema<IJobApplication>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  businessName: { type: String, required: true },
  brandDescription: { type: String, required: true },
  position: { type: String, required: true },
  careerId: { type: String }, // Reference to the career being applied for
  instagram: { type: String },
  facebook: { type: String },
  tiktok: { type: String },
  extraNotes: { type: String },
  submittedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String }
});

export const JobApplication = mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
