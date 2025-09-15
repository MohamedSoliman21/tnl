import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import { ContactSubmission } from '../models/ContactSubmission';
import { sendEmail, createContactEmailTemplate } from '../lib/emailService';
import { rateLimit, getClientIP, getUserAgent } from '../utils/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request, 3, 15 * 60 * 1000); // 3 requests per 15 minutes
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
    const requiredFields = ['name', 'businessName', 'email', 'phoneNumber', 'brandDescription'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
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

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(body.phoneNumber?.replace(/[\s\-\(\)]/g, ''))) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid phone number format' 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get client information
    const ipAddress = getClientIP(request);
    const userAgent = getUserAgent(request);

    // Create submission data
    const submissionData = {
      ...body,
      ipAddress,
      userAgent,
      submittedAt: new Date()
    };

    // Save to database
    const submission = new ContactSubmission(submissionData);
    await submission.save();

    // Send email notification
    const emailTemplate = createContactEmailTemplate(submissionData);
    const emailSent = await sendEmail(emailTemplate);

    if (!emailSent) {
      console.error('Failed to send email notification for contact submission:', submission._id);
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your submission! We\'ll get back to you soon.',
        submissionId: submission._id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
