#!/usr/bin/env node

// Sample career data for testing
const sampleCareers = [
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "full-time",
    description: "We're looking for a creative digital marketing specialist to join our team and help our clients reach their target audiences through innovative campaigns.",
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "3+ years of digital marketing experience",
      "Proficiency in Google Ads, Facebook Ads, and other platforms",
      "Strong analytical skills",
      "Experience with marketing automation tools"
    ],
    responsibilities: [
      "Develop and execute digital marketing campaigns",
      "Manage social media accounts and content",
      "Analyze campaign performance and optimize ROI",
      "Collaborate with creative team on campaign assets",
      "Stay updated with digital marketing trends"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible working hours",
      "Professional development opportunities",
      "Remote work options"
    ],
    salary: {
      min: 50000,
      max: 70000,
      currency: "USD",
      period: "yearly"
    },
    experience: {
      min: 3,
      max: 5
    },
    skills: ["Google Ads", "Facebook Ads", "Analytics", "SEO", "Content Marketing"],
    isActive: true,
    isFeatured: true,
    createdBy: "admin"
  },
  {
    title: "Video Editor",
    department: "Creative",
    location: "New York, NY",
    type: "full-time",
    description: "Join our creative team as a video editor and bring our clients' stories to life through compelling visual content.",
    requirements: [
      "Bachelor's degree in Film, Media, or related field",
      "2+ years of video editing experience",
      "Proficiency in Adobe Premiere Pro, After Effects",
      "Strong storytelling skills",
      "Portfolio demonstrating creative work"
    ],
    responsibilities: [
      "Edit video content for various platforms",
      "Color correction and audio mixing",
      "Motion graphics and animation",
      "Collaborate with creative directors",
      "Manage video production workflow"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Creative workspace",
      "Latest equipment and software",
      "Team building events"
    ],
    salary: {
      min: 45000,
      max: 65000,
      currency: "USD",
      period: "yearly"
    },
    experience: {
      min: 2,
      max: 4
    },
    skills: ["Premiere Pro", "After Effects", "Color Grading", "Motion Graphics", "Storytelling"],
    isActive: true,
    isFeatured: false,
    createdBy: "admin"
  },
  {
    title: "Web Developer",
    department: "Technology",
    location: "San Francisco, CA",
    type: "full-time",
    description: "We're seeking a talented web developer to build innovative digital experiences for our clients.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of web development experience",
      "Proficiency in React, Node.js, and modern web technologies",
      "Experience with responsive design",
      "Strong problem-solving skills"
    ],
    responsibilities: [
      "Develop responsive web applications",
      "Collaborate with design team on UI/UX",
      "Optimize website performance",
      "Maintain and update existing projects",
      "Stay current with web development trends"
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "401(k) matching",
      "Flexible schedule",
      "Professional development budget"
    ],
    salary: {
      min: 80000,
      max: 120000,
      currency: "USD",
      period: "yearly"
    },
    experience: {
      min: 3,
      max: 6
    },
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "CSS", "Git"],
    isActive: true,
    isFeatured: true,
    createdBy: "admin"
  }
];

console.log('Sample career data created!');
console.log('You can use this data to test the career management system.');
console.log('\nTo add these careers, you can:');
console.log('1. Use the admin dashboard at /admin');
console.log('2. Click on "Career Management" tab');
console.log('3. Click "Add New Career" and fill in the form');
console.log('\nOr use the API directly:');
console.log('POST /api/careers with the career data');

export default sampleCareers;
