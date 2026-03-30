const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const crypto = require('crypto');

const resend = process.env.NODE_ENV === 'production' ? new Resend(process.env.RESEND_API_KEY) : null;

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.MAILTRAP_PORT || 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Diagnostic log to verify .env loading
console.log(`[Mailer] Attempting connection with User: ${process.env.MAILTRAP_USER ? process.env.MAILTRAP_USER.substring(0, 3) + '***' : 'UNDEFINED'}`);

const sendApprovalEmail = async ({ ticketId, title, assigneeName, approvalToken }) => {
  const approvalLink = `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/tickets/approve/${approvalToken}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        .container { font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; }
        .header { font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 16px; }
        .content { font-size: 16px; color: #374151; line-height: 1.5; }
        .ticket-info { background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin: 20px 0; }
        .label { font-weight: 600; color: #4b5563; }
        .button { display: inline-block; background-color: #2563eb; color: #ffffff !important; font-weight: bold; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 20px; }
        .footer { font-size: 14px; color: #6b7280; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Ticket Assignment Approval</div>
        <div class="content">
          <p>Hello Admin,</p>
          <p>A request has been made to assign a ticket to <strong>${assigneeName}</strong>. Please review the details below:</p>
          <div class="ticket-info">
            <p><span class="label">Ticket ID:</span> ${ticketId}</p>
            <p><span class="label">Title:</span> ${title}</p>
            <p><span class="label">Assignee:</span> ${assigneeName}</p>
          </div>
          <p>Click the button below to approve this assignment:</p>
          <a href="${approvalLink}" class="button">Approve Assignment</a>
          <p>This link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Encipher Health. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  if (process.env.NODE_ENV === 'production' && resend) {
    await resend.emails.send({
      from: 'Encipher Health <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'abc@encipherhealth.com',
      subject: `Approval Required: ${ticketId} - ${title}`,
      html: htmlContent,
    });
  } else {
    await transporter.sendMail({
      from: '"Encipher Health" <noreply@encipherhealth.com>',
      to: process.env.ADMIN_EMAIL || 'abc@encipherhealth.com',
      subject: `Approval Required: ${ticketId} - ${title}`,
      html: htmlContent,
    });
  }
};

module.exports = {
  sendApprovalEmail,
};
