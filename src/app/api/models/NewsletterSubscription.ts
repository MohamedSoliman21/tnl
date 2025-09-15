import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletterSubscription extends Document {
  email: string;
  subscribedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
}

const NewsletterSubscriptionSchema = new Schema<INewsletterSubscription>({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String },
  isActive: { type: Boolean, default: true }
});

export const NewsletterSubscription = mongoose.models.NewsletterSubscription || mongoose.model<INewsletterSubscription>('NewsletterSubscription', NewsletterSubscriptionSchema);
