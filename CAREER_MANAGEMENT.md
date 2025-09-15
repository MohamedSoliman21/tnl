# Career Management System Documentation

## Overview
The Career Management System allows you to dynamically manage job postings on The Noisy Lab website. You can add, edit, activate/deactivate, and delete career listings through the admin dashboard.

## Features

### 🎯 Dynamic Career Listings
- **Real-time Updates**: Career listings are fetched from the database and displayed dynamically
- **Rich Information**: Each career includes title, department, location, type, description, requirements, responsibilities, benefits, salary, experience, and skills
- **Status Management**: Careers can be active/inactive and featured/non-featured
- **Responsive Design**: Career cards adapt to different screen sizes

### 🔧 Admin Management
- **Full CRUD Operations**: Create, Read, Update, Delete careers
- **Status Toggle**: Activate/deactivate careers without deleting them
- **Featured Careers**: Highlight important job postings
- **Comprehensive Form**: Detailed form for adding/editing careers
- **Real-time Stats**: View total and active career counts

## Database Schema

### Career Model
```typescript
interface ICareer {
  title: string;                    // Job title
  department: string;               // Department (Marketing, Creative, Technology, etc.)
  location: string;                 // Work location
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;              // Job description
  requirements: string[];           // Array of requirements
  responsibilities: string[];       // Array of responsibilities
  benefits: string[];              // Array of benefits
  salary?: {
    min?: number;                  // Minimum salary
    max?: number;                  // Maximum salary
    currency: string;              // Currency (USD, EUR, GBP)
    period: 'hourly' | 'monthly' | 'yearly';
  };
  experience: {
    min: number;                   // Minimum years of experience
    max?: number;                  // Maximum years of experience
  };
  skills: string[];               // Required skills
  isActive: boolean;              // Whether the job is active
  isFeatured: boolean;            // Whether the job is featured
  applicationDeadline?: Date;     // Application deadline
  createdAt: Date;                // Creation date
  updatedAt: Date;                // Last update date
  createdBy: string;              // Who created the career
}
```

## API Endpoints

### Public Endpoints (No Authentication Required)

#### GET /api/careers
Fetch all careers with optional filtering.

**Query Parameters:**
- `active=true` - Only return active careers
- `featured=true` - Only return featured careers

**Response:**
```json
[
  {
    "_id": "career_id",
    "title": "Digital Marketing Specialist",
    "department": "Marketing",
    "location": "Remote",
    "type": "full-time",
    "description": "Job description...",
    "requirements": ["Requirement 1", "Requirement 2"],
    "responsibilities": ["Responsibility 1", "Responsibility 2"],
    "benefits": ["Benefit 1", "Benefit 2"],
    "salary": {
      "min": 50000,
      "max": 70000,
      "currency": "USD",
      "period": "yearly"
    },
    "experience": {
      "min": 3,
      "max": 5
    },
    "skills": ["Skill 1", "Skill 2"],
    "isActive": true,
    "isFeatured": true,
    "applicationDeadline": "2024-12-31T23:59:59.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET /api/careers/[id]
Fetch a specific career by ID.

**Response:** Single career object (same structure as above)

### Admin Endpoints (Authentication Required)

#### POST /api/careers
Create a new career.

**Request Body:**
```json
{
  "title": "Job Title",
  "department": "Department",
  "location": "Location",
  "type": "full-time",
  "description": "Job description",
  "requirements": ["Requirement 1"],
  "responsibilities": ["Responsibility 1"],
  "benefits": ["Benefit 1"],
  "salary": {
    "min": 50000,
    "max": 70000,
    "currency": "USD",
    "period": "yearly"
  },
  "experience": {
    "min": 3,
    "max": 5
  },
  "skills": ["Skill 1"],
  "isActive": true,
  "isFeatured": false,
  "applicationDeadline": "2024-12-31T23:59:59.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Career created successfully",
  "career": { /* career object */ }
}
```

#### PUT /api/careers/[id]
Update an existing career.

**Request Body:** Same as POST, but all fields are optional.

**Response:**
```json
{
  "success": true,
  "message": "Career updated successfully",
  "career": { /* updated career object */ }
}
```

#### DELETE /api/careers/[id]
Delete a career.

**Response:**
```json
{
  "success": true,
  "message": "Career deleted successfully"
}
```

## Frontend Components

### Career Component (`/src/components/Career.tsx`)
- Displays dynamic career listings
- Fetches data from `/api/careers?active=true`
- Shows loading and error states
- Responsive design with animations
- Links to application form with career ID

### AdminDashboard Component (`/src/components/AdminDashboard.tsx`)
- Career management tab
- Add/Edit/Delete careers
- Toggle active/inactive status
- View career statistics

### CareerForm Component (`/src/components/CareerForm.tsx`)
- Comprehensive form for adding/editing careers
- Dynamic lists for requirements, responsibilities, benefits, skills
- Salary and experience configuration
- Status and featured options
- Form validation

## Usage Guide

### Adding a New Career

1. **Via Admin Dashboard:**
   - Go to `/admin`
   - Login with admin credentials
   - Click on "Career Management" tab
   - Click "Add New Career" button
   - Fill out the comprehensive form
   - Click "Create Career"

2. **Via API:**
   ```bash
   curl -X POST /api/careers \
     -H "Content-Type: application/json" \
     -d '{
       "title": "New Job Title",
       "department": "Department",
       "location": "Location",
       "type": "full-time",
       "description": "Job description",
       "requirements": ["Requirement 1"],
       "responsibilities": ["Responsibility 1"],
       "benefits": ["Benefit 1"],
       "salary": {
         "min": 50000,
         "max": 70000,
         "currency": "USD",
         "period": "yearly"
       },
       "experience": {
         "min": 3,
         "max": 5
       },
       "skills": ["Skill 1"],
       "isActive": true,
       "isFeatured": false
     }'
   ```

### Managing Careers

1. **Edit Career:**
   - In admin dashboard, click "Edit" next to any career
   - Modify the form fields
   - Click "Update Career"

2. **Toggle Status:**
   - Click "Activate" or "Deactivate" to toggle active status
   - Inactive careers won't appear on the public careers page

3. **Delete Career:**
   - Click "Delete" to permanently remove a career
   - This action cannot be undone

4. **Featured Careers:**
   - Check "Featured" when creating/editing a career
   - Featured careers have a special gradient background
   - They appear first in the listings

## Integration with Application System

### Career-Specific Applications
When users click "Apply Now" on a career card, they're redirected to:
```
/apply?career=career_id
```

The application form can use this career ID to:
- Pre-fill the position field
- Send career-specific application data
- Track which career the application is for

### Example Integration
```typescript
// In Apply component
const urlParams = new URLSearchParams(window.location.search);
const careerId = urlParams.get('career');

if (careerId) {
  // Fetch career details
  const response = await fetch(`/api/careers/${careerId}`);
  const career = await response.json();
  
  // Pre-fill form with career title
  setFormData(prev => ({
    ...prev,
    position: career.title
  }));
}
```

## Sample Data

Use the provided `sample-careers.js` file to get started with sample career data. The file contains three example careers:
- Digital Marketing Specialist
- Video Editor  
- Web Developer

## Security Considerations

- All admin endpoints require authentication
- Career creation/editing is restricted to authenticated admins
- Public endpoints only return active careers by default
- Input validation on all form fields
- Rate limiting on API endpoints

## Environment Variables

Make sure these are set in your `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

## Troubleshooting

### Common Issues

1. **Careers not showing on public page:**
   - Check if careers are marked as `isActive: true`
   - Verify API endpoint `/api/careers?active=true` is working
   - Check browser console for errors

2. **Admin form not saving:**
   - Verify admin authentication
   - Check required fields are filled
   - Look for validation errors in browser console

3. **API errors:**
   - Check MongoDB connection
   - Verify environment variables
   - Check server logs for detailed error messages

### Debug Mode
Enable debug logging by setting:
```env
DEBUG=true
```

This will provide detailed logs for API operations and database queries.

## Future Enhancements

Potential improvements for the career management system:

1. **Advanced Filtering:**
   - Filter by department, location, type
   - Search by keywords
   - Sort by salary, experience, date

2. **Application Tracking:**
   - Track applications per career
   - Application status management
   - Email notifications for new applications

3. **Analytics:**
   - Career view counts
   - Application conversion rates
   - Popular career insights

4. **Bulk Operations:**
   - Bulk activate/deactivate
   - Import/export careers
   - Template system for similar careers

5. **Enhanced UI:**
   - Career preview before publishing
   - Rich text editor for descriptions
   - Image uploads for career banners

## Support

For technical support or questions about the career management system, please refer to the main project documentation or contact the development team.
