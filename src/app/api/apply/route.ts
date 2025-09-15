import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import { JobApplication } from '../models/JobApplication';
import { sendEmail, createJobApplicationEmailTemplate } from '../lib/emailService';
import { rateLimit, getClientIP, getUserAgent } from '../utils/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request, 2, 15 * 60 * 1000); // 2 requests per 15 minutes
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    
    // Extract form data
    const body = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      age: formData.get('age') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      portfolio: formData.get('portfolio') as string,
      careerId: formData.get('careerId') as string,
      cvFile: formData.get('cvFile') as File | null
    };
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'age', 'phoneNumber', 'careerId'];
    const missingFields = requiredFields.filter(field => !body[field as keyof typeof body]);
    
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

    // Validate CV file
    if (!body.cvFile || body.cvFile.size === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'CV file is required' 
        },
        { status: 400 }
      );
    }

    // Validate CV file size (2MB limit)
    if (body.cvFile.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'CV file size must be less than 2MB' 
        },
        { status: 400 }
      );
    }

    // Validate CV file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(body.cvFile.type)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'CV file must be a PDF or Word document' 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get client information
    const ipAddress = getClientIP(request);
    const userAgent = getUserAgent(request);

    // Convert CV file to base64
    const cvFileBuffer = await body.cvFile.arrayBuffer();
    const cvFileBase64 = Buffer.from(cvFileBuffer).toString('base64');

    // Create application data
    const applicationData = {
      fullName: body.fullName,
      email: body.email,
      age: parseInt(body.age),
      phoneNumber: body.phoneNumber,
      portfolio: body.portfolio || '',
      careerId: body.careerId,
      cvFileName: body.cvFile.name,
      cvFileSize: body.cvFile.size,
      cvFileType: body.cvFile.type,
      cvFileBase64: cvFileBase64,
      ipAddress,
      userAgent,
      submittedAt: new Date()
    };

    // Save to database
    const application = new JobApplication(applicationData);
    await application.save();

    // Send email notification
    const emailTemplate = createJobApplicationEmailTemplate(applicationData);
    const emailSent = await sendEmail(emailTemplate);

    if (!emailSent) {
      console.error('Failed to send email notification for job application:', application._id);
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your application! We\'ll review it and get back to you soon.',
        applicationId: application._id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
