import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import { Career } from '../models/Career';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    const featured = searchParams.get('featured') === 'true';

    await connectDB();

    const query: Record<string, unknown> = {};
    
    if (activeOnly) {
      query.isActive = true;
    }
    
    if (featured) {
      query.isFeatured = true;
    }

    const careers = await Career.find(query)
      .sort({ 
        isFeatured: -1, 
        createdAt: -1 
      })
      .lean();

    return NextResponse.json(careers);
  } catch (error) {
    console.error('Careers API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch careers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = request.cookies;
    const sessionToken = cookieStore.get('admin-session');

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'department', 'location', 'type', 'description'];
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

    await connectDB();

    const career = new Career({
      ...body,
      createdBy: 'admin', // In production, get from session
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await career.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Career created successfully',
      career 
    });
  } catch (error) {
    console.error('Create career error:', error);
    return NextResponse.json(
      { error: 'Failed to create career' },
      { status: 500 }
    );
  }
}
