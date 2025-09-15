import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import { ContactSubmission } from '../../models/ContactSubmission';

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

    const contacts = await ContactSubmission.find()
      .sort({ submittedAt: -1 })
      .lean();

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Contacts API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
