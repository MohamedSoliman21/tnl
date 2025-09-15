import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'thenoisylabbb@gmail.com',
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
  },
});

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"The Noisy Lab" <${process.env.SMTP_USER || 'thenoisylabbb@gmail.com'}>`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phoneNumber: string;
  brandDescription: string;
  message: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  extraNotes?: string;
  ipAddress?: string;
}

export function createContactEmailTemplate(data: ContactFormData): EmailData {
  return {
    to: 'thenoisylabbb@gmail.com',
    subject: `New Contact Form Submission from ${data.businessName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F58906; border-bottom: 2px solid #F58906; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Business Information</h3>
          <p><strong>Business Name:</strong> ${data.businessName}</p>
          <p><strong>Contact Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></p>
          <p><strong>Brand Description:</strong> ${data.brandDescription}</p>
        </div>
        
        ${data.instagram ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Social Media</h3>
          ${data.instagram ? `<p><strong>Instagram:</strong> <a href="${data.instagram}" target="_blank">${data.instagram}</a></p>` : ''}
          ${data.facebook ? `<p><strong>Facebook:</strong> <a href="${data.facebook}" target="_blank">${data.facebook}</a></p>` : ''}
          ${data.tiktok ? `<p><strong>TikTok:</strong> <a href="${data.tiktok}" target="_blank">${data.tiktok}</a></p>` : ''}
        </div>
        ` : ''}
        
        ${data.extraNotes ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Additional Notes</h3>
          <p>${data.extraNotes}</p>
        </div>
        ` : ''}
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
          <em>Submitted on: ${new Date().toLocaleString()}</em><br>
          <em>IP Address: ${data.ipAddress || 'Not available'}</em>
        </p>
      </div>
    `,
    text: `
      New Contact Form Submission
      
      Business Information:
      Business Name: ${data.businessName}
      Contact Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phoneNumber}
      Brand Description: ${data.brandDescription}
      
      ${data.instagram ? `Instagram: ${data.instagram}` : ''}
      ${data.facebook ? `Facebook: ${data.facebook}` : ''}
      ${data.tiktok ? `TikTok: ${data.tiktok}` : ''}
      ${data.extraNotes ? `Extra Notes: ${data.extraNotes}` : ''}
      
      Submitted on: ${new Date().toLocaleString()}
      IP Address: ${data.ipAddress || 'Not available'}
    `
  };
}

interface JobApplicationData {
  name: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  brandDescription: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  extraNotes?: string;
  ipAddress?: string;
}

export function createJobApplicationEmailTemplate(data: JobApplicationData): EmailData {
  return {
    to: 'thenoisylabbb@gmail.com',
    subject: `New Job Application from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F58906; border-bottom: 2px solid #F58906; padding-bottom: 10px;">
          New Job Application
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Applicant Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></p>
          <p><strong>Business Name:</strong> ${data.businessName}</p>
          <p><strong>Brand Description:</strong> ${data.brandDescription}</p>
        </div>
        
        ${data.instagram || data.facebook || data.tiktok ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Social Media</h3>
          ${data.instagram ? `<p><strong>Instagram:</strong> <a href="${data.instagram}" target="_blank">${data.instagram}</a></p>` : ''}
          ${data.facebook ? `<p><strong>Facebook:</strong> <a href="${data.facebook}" target="_blank">${data.facebook}</a></p>` : ''}
          ${data.tiktok ? `<p><strong>TikTok:</strong> <a href="${data.tiktok}" target="_blank">${data.tiktok}</a></p>` : ''}
        </div>
        ` : ''}
        
        ${data.extraNotes ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Additional Notes</h3>
          <p>${data.extraNotes}</p>
        </div>
        ` : ''}
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
          <em>Application submitted on: ${new Date().toLocaleString()}</em><br>
          <em>IP Address: ${data.ipAddress || 'Not available'}</em>
        </p>
      </div>
    `,
    text: `
      New Job Application
      
      Applicant Information:
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phoneNumber}
      Business Name: ${data.businessName}
      Brand Description: ${data.brandDescription}
      
      ${data.instagram ? `Instagram: ${data.instagram}` : ''}
      ${data.facebook ? `Facebook: ${data.facebook}` : ''}
      ${data.tiktok ? `TikTok: ${data.tiktok}` : ''}
      ${data.extraNotes ? `Extra Notes: ${data.extraNotes}` : ''}
      
      Application submitted on: ${new Date().toLocaleString()}
      IP Address: ${data.ipAddress || 'Not available'}
    `
  };
}

interface NewsletterData {
  email: string;
  ipAddress?: string;
  userAgent?: string;
}

export function createNewsletterEmailTemplate(data: NewsletterData): EmailData {
  return {
    to: 'thenoisylabbb@gmail.com',
    subject: 'New Newsletter Subscription',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F58906; border-bottom: 2px solid #F58906; padding-bottom: 10px;">
          New Newsletter Subscription
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Subscribed on:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 14px;">
          <em>This person wants to stay updated with The Noisy Lab newsletter.</em><br>
          <em>IP Address: ${data.ipAddress || 'Not available'}</em>
        </p>
      </div>
    `,
    text: `
      New Newsletter Subscription
      
      Email: ${data.email}
      Subscribed on: ${new Date().toLocaleString()}
      
      This person wants to stay updated with The Noisy Lab newsletter.
      IP Address: ${data.ipAddress || 'Not available'}
    `
  };
}
