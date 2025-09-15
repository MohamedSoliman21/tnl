import mongoose, { Schema, Document } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  brandDescription: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  extraNotes?: string;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>({
  name: { type: String, required: true },
  businessName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  brandDescription: { type: String, required: true },
  instagram: { type: String },
  facebook: { type: String },
  tiktok: { type: String },
  extraNotes: { type: String },
  submittedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String }
});

export const ContactSubmission = mongoose.models.ContactSubmission || mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);
