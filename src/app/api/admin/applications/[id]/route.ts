import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import { JobApplication } from '../../../models/JobApplication';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;

    const deletedApplication = await JobApplication.findByIdAndDelete(id);

    if (!deletedApplication) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application deleted successfully' 
    });
  } catch (error) {
    console.error('Delete application error:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
