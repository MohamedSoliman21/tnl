import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import { JobApplication } from '../../models/JobApplication';

export async function GET(request: NextRequest) {
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

    await connectDB();

    const applications = await JobApplication.find()
      .sort({ submittedAt: -1 })
      .lean();

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Applications API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
