# API Integration Setup Guide

## ✅ Current API Status

The following APIs are **fully integrated** and ready to use:

### 1. **Contact Form API** (`/api/contact`)
- **Endpoint**: `POST /api/contact`
- **Purpose**: Handles contact form submissions
- **Features**:
  - ✅ Form validation
  - ✅ Rate limiting (3 requests per 15 minutes)
  - ✅ Email notifications
  - ✅ Database storage
  - ✅ IP tracking

### 2. **Job Application API** (`/api/apply`)
- **Endpoint**: `POST /api/apply`
- **Purpose**: Handles job application submissions
- **Features**:
  - ✅ Form validation
  - ✅ Rate limiting (2 requests per 15 minutes)
  - ✅ Email notifications
  - ✅ Database storage
  - ✅ IP tracking

### 3. **Newsletter Subscription API** (`/api/newsletter`)
- **Endpoint**: `POST /api/newsletter`
- **Purpose**: Handles newsletter subscriptions
- **Features**:
  - ✅ Email validation
  - ✅ Rate limiting (5 requests per 15 minutes)
  - ✅ Email notifications
  - ✅ Database storage
  - ✅ Duplicate prevention

## 🔧 Required Setup

### 1. **Environment Variables**
Create a `.env.local` file in the root directory with:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/thenoisylab

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=thenoisylabbb@gmail.com
SMTP_PASS=your_app_password_here

# Alternative email password (if using different env var name)
EMAIL_PASSWORD=your_app_password_here
```

### 2. **Database Setup**
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in `.env.local`
- The APIs will automatically create the required collections

### 3. **Email Setup**
- Configure Gmail App Password for SMTP
- Update `SMTP_PASS` in `.env.local`
- Test email functionality

## 📋 API Endpoints Details

### Contact Form (`/api/contact`)
```typescript
// Request Body
{
  name: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  brandDescription: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  extraNotes?: string;
}

// Response
{
  success: boolean;
  message: string;
  error?: string;
}
```

### Job Application (`/api/apply`)
```typescript
// Request Body
{
  name: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  brandDescription: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  extraNotes?: string;
}

// Response
{
  success: boolean;
  message: string;
  error?: string;
}
```

### Newsletter Subscription (`/api/newsletter`)
```typescript
// Request Body
{
  email: string;
}

// Response
{
  success: boolean;
  message: string;
  error?: string;
}
```

## 🚀 Testing the APIs

### 1. **Start the Development Server**
```bash
npm run dev
```

### 2. **Test Contact Form**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "businessName": "Test Business",
    "email": "test@example.com",
    "phoneNumber": "+1234567890",
    "brandDescription": "Test brand description"
  }'
```

### 3. **Test Newsletter Subscription**
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## 🔒 Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Ensures data integrity
- **Email Validation**: Validates email format
- **Phone Validation**: Basic phone number validation
- **IP Tracking**: For security and analytics
- **Error Handling**: Comprehensive error responses

## 📊 Database Models

### ContactSubmission
- Stores contact form submissions
- Includes all form fields + metadata

### JobApplication
- Stores job application submissions
- Includes all form fields + metadata

### NewsletterSubscription
- Stores newsletter subscriptions
- Prevents duplicate emails
- Tracks subscription status

## 🎯 Frontend Integration

All APIs are already integrated in the frontend components:

- **Contact.tsx**: Uses `/api/contact`
- **Apply.tsx**: Uses `/api/apply`
- **Footer.tsx**: Uses `/api/newsletter`

The forms include:
- ✅ Loading states
- ✅ Success/error messages
- ✅ Form validation
- ✅ Auto-reset on success

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check MongoDB is running
   - Verify `MONGODB_URI` in `.env.local`

2. **Email Sending Failed**
   - Check SMTP credentials
   - Verify Gmail App Password
   - Check `SMTP_PASS` in `.env.local`

3. **Rate Limiting**
   - Wait for the rate limit window to reset
   - Check rate limit settings in API routes

4. **Import Errors**
   - All import paths have been fixed
   - Ensure all dependencies are installed

## ✅ Verification Checklist

- [ ] Environment variables configured
- [ ] MongoDB running and accessible
- [ ] Email SMTP configured
- [ ] All dependencies installed
- [ ] Development server running
- [ ] API endpoints responding
- [ ] Forms submitting successfully
- [ ] Emails being sent
- [ ] Data being stored in database

The APIs are **fully integrated and ready for production use**! 🎉
