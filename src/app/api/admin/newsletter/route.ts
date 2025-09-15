import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import { NewsletterSubscription } from '../../models/NewsletterSubscription';

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

    const subscribers = await NewsletterSubscription.find()
      .sort({ subscribedAt: -1 })
      .lean();

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
}
