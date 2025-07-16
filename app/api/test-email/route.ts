import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import config from '@/config';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {
    const testEmail = request.nextUrl.searchParams.get('email') || 'test@example.com';

    const { data, error } = await resend.emails.send({
      from: config.resend.fromNoReply,
      to: [testEmail],
      subject: 'Test Email - LearningScience.io',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Test Email from LearningScience.io</h2>
          <p>This is a test email to verify the email configuration is working correctly.</p>
          <p><strong>From:</strong> ${config.resend.fromNoReply}</p>
          <p><strong>To:</strong> ${testEmail}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <hr>
          <p>If you received this email, your email configuration is working correctly!</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { 
          error: 'Email sending failed', 
          details: error,
          config: {
            from: config.resend.fromNoReply,
            to: testEmail,
            apiKeyPresent: !!process.env.RESEND_API_KEY
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      data,
      config: {
        from: config.resend.fromNoReply,
        to: testEmail,
        apiKeyPresent: !!process.env.RESEND_API_KEY
      }
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        config: {
          from: config.resend.fromNoReply,
          apiKeyPresent: !!process.env.RESEND_API_KEY
        }
      },
      { status: 500 }
    );
  }
}
