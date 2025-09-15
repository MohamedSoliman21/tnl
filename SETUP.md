# The Noisy Lab - Setup Instructions

## Database Setup (MongoDB)

### 1. Install MongoDB
- **Local Installation**: Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **Cloud Option**: Use [MongoDB Atlas](https://www.mongodb.com/atlas) for free cloud hosting

### 2. Environment Variables
Create a `.env.local` file in the root directory with:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/thenoisylab
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/thenoisylab

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=thenoisylabbb@gmail.com
SMTP_PASS=your_app_password_here

# Alternative email password (if using app password)
EMAIL_PASSWORD=your_app_password_here
```

## Email Setup (Gmail)

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication

### 2. Generate App Password
- Go to Google Account → Security → App passwords
- Generate a new app password for "Mail"
- Use this password in `SMTP_PASS` or `EMAIL_PASSWORD`

## Features Implemented

### ✅ Database Integration
- **MongoDB** with Mongoose ODM
- **Three Collections**:
  - `ContactSubmission` - Contact form data
  - `JobApplication` - Job application data  
  - `NewsletterSubscription` - Newsletter subscriptions

### ✅ Email Service
- **Nodemailer** integration
- **Professional HTML templates** with brand styling
- **Text fallbacks** for all emails
- **Error handling** - Forms still work if email fails

### ✅ Rate Limiting
- **IP-based rate limiting**:
  - Contact form: 3 requests per 15 minutes
  - Job applications: 2 requests per 15 minutes
  - Newsletter: 5 requests per 15 minutes
- **Protection against spam** and abuse

### ✅ Data Collection
- **Client tracking**: IP address and User Agent
- **Timestamps**: Automatic submission dates
- **Duplicate prevention**: Newsletter email uniqueness
- **Data validation**: Server-side validation for all forms

### ✅ Error Handling
- **Comprehensive error messages**
- **Graceful degradation** - forms work even if email fails
- **Database connection handling**
- **Rate limit responses**

## API Endpoints

### POST `/api/contact`
- Saves contact form submissions to database
- Sends email notification to admin
- Rate limited to 3 requests per 15 minutes

### POST `/api/apply`
- Saves job applications to database
- Sends email notification to admin
- Rate limited to 2 requests per 15 minutes

### POST `/api/newsletter`
- Saves newsletter subscriptions to database
- Prevents duplicate subscriptions
- Sends email notification to admin
- Rate limited to 5 requests per 15 minutes

## Database Schema

### ContactSubmission
```typescript
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
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}
```

### JobApplication
```typescript
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
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}
```

### NewsletterSubscription
```typescript
{
  email: string;
  subscribedAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
}
```

## Running the Application

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your MongoDB URI and email credentials

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Test the forms**:
   - Contact form: `/contact`
   - Job application: `/apply`
   - Newsletter: Footer subscription

## Production Deployment

### MongoDB Atlas (Recommended)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

### Email Service
- **Gmail**: Already configured
- **SendGrid**: Replace Nodemailer config
- **Mailgun**: Replace Nodemailer config

### Rate Limiting
- **Current**: In-memory (resets on server restart)
- **Production**: Use Redis for persistent rate limiting

## Security Features

- ✅ **Input validation** on all fields
- ✅ **Rate limiting** to prevent spam
- ✅ **IP tracking** for security monitoring
- ✅ **Email format validation**
- ✅ **Phone number validation**
- ✅ **SQL injection protection** (MongoDB)
- ✅ **XSS protection** (Next.js built-in)

## Monitoring & Analytics

All form submissions are logged with:
- Submission timestamps
- Client IP addresses
- User agents
- Form data
- Email delivery status

This data can be used for:
- Analytics and insights
- Security monitoring
- Lead tracking
- Performance optimization
