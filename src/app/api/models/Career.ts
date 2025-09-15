import mongoose, { Schema, Document } from 'mongoose';

export interface ICareer extends Document {
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary?: {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  experience: {
    min: number;
    max?: number;
  };
  skills: string[];
  isActive: boolean;
  isFeatured: boolean;
  applicationDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const CareerSchema = new Schema<ICareer>({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true 
  },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  benefits: [{ type: String }],
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'USD' },
    period: { 
      type: String, 
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  experience: {
    min: { type: Number, required: true, default: 0 },
    max: { type: Number }
  },
  skills: [{ type: String }],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  applicationDeadline: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true }
});

// Update the updatedAt field before saving
CareerSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Career = mongoose.models.Career || mongoose.model<ICareer>('Career', CareerSchema);
