import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import { NewsletterSubscription } from '../models/NewsletterSubscription';
import { sendEmail, createNewsletterEmailTemplate } from '../lib/emailService';
import { rateLimit, getClientIP, getUserAgent } from '../utils/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request, 5, 15 * 60 * 1000); // 5 requests per 15 minutes
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email is required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get client information
    const ipAddress = getClientIP(request);
    const userAgent = getUserAgent(request);

    // Check if email already exists
    const existingSubscription = await NewsletterSubscription.findOne({ 
      email: body.email.toLowerCase() 
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'This email is already subscribed to our newsletter.' 
          },
          { status: 409 }
        );
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.subscribedAt = new Date();
        await existingSubscription.save();
      }
    } else {
      // Create new subscription
      const subscriptionData = {
        email: body.email.toLowerCase(),
        ipAddress,
        userAgent,
        subscribedAt: new Date(),
        isActive: true
      };

      const subscription = new NewsletterSubscription(subscriptionData);
      await subscription.save();
    }

    // Send email notification
    const emailTemplate = createNewsletterEmailTemplate({
      email: body.email,
      ipAddress,
      userAgent
    });
    const emailSent = await sendEmail(emailTemplate);

    if (!emailSent) {
      console.error('Failed to send email notification for newsletter subscription:', body.email);
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for subscribing! You\'ll receive our latest updates soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
