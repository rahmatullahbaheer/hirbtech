import { NextResponse } from 'next/server';
import { addLead } from '@/data/leadsStore';

// Simple server-side rate limiting memory map
const rateLimitMap = new Map();

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequests = 5; // max 5 requests per minute

    const userRequests = rateLimitMap.get(ip) || [];
    const validRequests = userRequests.filter(timestamp => now - timestamp < windowMs);

    if (validRequests.length >= maxRequests) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    validRequests.push(now);
    rateLimitMap.set(ip, validRequests);

    const body = await request.json();
    const { name, email, company, phone, service, budget, timeline, projectDescription } = body;

    // Server-side input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter a valid full name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!projectDescription || typeof projectDescription !== 'string' || projectDescription.trim().length < 5) {
      return NextResponse.json({ success: false, error: 'Please enter a detailed project description.' }, { status: 400 });
    }

    if (projectDescription.length > 5000) {
      return NextResponse.json({ success: false, error: 'Project description exceeds maximum length limit.' }, { status: 400 });
    }

    // Sanitize input
    const cleanLead = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      company: company ? String(company).trim().slice(0, 100) : '',
      phone: phone ? String(phone).trim().slice(0, 50) : '',
      service: service || 'Custom Software',
      budget: budget || 'Custom Scope',
      timeline: timeline || 'Flexible',
      projectDescription: projectDescription.trim().slice(0, 5000)
    };

    // Store lead safely
    const created = addLead(cleanLead);

    return NextResponse.json({
      success: true,
      message: 'Thanks! Your project request has been received.',
      leadId: created.id
    }, { status: 200 });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
