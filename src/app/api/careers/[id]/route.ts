import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import { Career } from '../../models/Career';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const career = await Career.findById(id).lean();

    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(career);
  } catch (error) {
    console.error('Get career error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch career' },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const body = await request.json();
    
    await connectDB();
    const { id } = await params;

    const career = await Career.findByIdAndUpdate(
      id,
      { 
        ...body, 
        updatedAt: new Date() 
      },
      { new: true }
    );

    if (!career) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Career updated successfully',
      career 
    });
  } catch (error) {
    console.error('Update career error:', error);
    return NextResponse.json(
      { error: 'Failed to update career' },
      { status: 500 }
    );
  }
}

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

    const deletedCareer = await Career.findByIdAndDelete(id);

    if (!deletedCareer) {
      return NextResponse.json(
        { error: 'Career not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Career deleted successfully' 
    });
  } catch (error) {
    console.error('Delete career error:', error);
    return NextResponse.json(
      { error: 'Failed to delete career' },
      { status: 500 }
    );
  }
}
