import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import { ContactSubmission } from '../../models/ContactSubmission';
import { JobApplication } from '../../models/JobApplication';
import { NewsletterSubscription } from '../../models/NewsletterSubscription';
import { Career } from '../../models/Career';

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

    // Get counts
    const [totalContacts, totalApplications, totalNewsletterSubscribers, totalCareers, activeCareers] = await Promise.all([
      ContactSubmission.countDocuments(),
      JobApplication.countDocuments(),
      NewsletterSubscription.countDocuments(),
      Career.countDocuments(),
      Career.countDocuments({ isActive: true })
    ]);

    // Get recent submissions
    const [recentContacts, recentApplications, recentNewsletter] = await Promise.all([
      ContactSubmission.find().sort({ submittedAt: -1 }).limit(5).lean(),
      JobApplication.find().sort({ submittedAt: -1 }).limit(5).lean(),
      NewsletterSubscription.find().sort({ subscribedAt: -1 }).limit(5).lean()
    ]);

    // Combine and format recent submissions
    const recentSubmissions = [
      ...recentContacts.map(item => ({ ...item, type: 'Contact' })),
      ...recentApplications.map(item => ({ ...item, type: 'Application' })),
      ...recentNewsletter.map(item => ({ ...item, type: 'Newsletter', name: item.email }))
    ]
      .sort((a, b) => {
        const dateAStr = (a as { submittedAt?: string; subscribedAt?: string }).submittedAt || (a as { submittedAt?: string; subscribedAt?: string }).subscribedAt;
        const dateBStr = (b as { submittedAt?: string; subscribedAt?: string }).submittedAt || (b as { submittedAt?: string; subscribedAt?: string }).subscribedAt;
        
        const dateA = dateAStr ? new Date(dateAStr).getTime() : 0;
        const dateB = dateBStr ? new Date(dateBStr).getTime() : 0;
        
        return dateB - dateA;
      })
      .slice(0, 10);

    return NextResponse.json({
      totalContacts,
      totalApplications,
      totalNewsletterSubscribers,
      totalCareers,
      activeCareers,
      recentSubmissions
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
