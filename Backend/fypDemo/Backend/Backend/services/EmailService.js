import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

export const sendWelcomeEmail = async (email, username) => {
  try {
    const transporter = createTransporter();

    const welcomeHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to TaskFlow AI</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
            }
            .header h1 {
                font-size: 28px;
                margin-bottom: 10px;
            }
            .header p {
                font-size: 16px;
                opacity: 0.9;
            }
            .content {
                padding: 40px 30px;
            }
            .welcome-message {
                text-align: center;
                margin-bottom: 30px;
            }
            .welcome-message h2 {
                color: #6366f1;
                font-size: 24px;
                margin-bottom: 15px;
            }
            .welcome-message p {
                font-size: 16px;
                color: #666;
                line-height: 1.8;
            }
            .features {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 25px;
                margin: 30px 0;
            }
            .features h3 {
                color: #333;
                margin-bottom: 20px;
                text-align: center;
            }
            .feature-list {
                list-style: none;
            }
            .feature-list li {
                padding: 8px 0;
                border-bottom: 1px solid #e9ecef;
                position: relative;
                padding-left: 25px;
            }
            .feature-list li:before {
                content: "🤖";
                font-size: 16px;
                position: absolute;
                left: 0;
            }
            .feature-list li:last-child {
                border-bottom: none;
            }
            .cta-button {
                display: block;
                width: 200px;
                margin: 30px auto;
                padding: 12px 24px;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                text-decoration: none;
                border-radius: 25px;
                text-align: center;
                font-weight: bold;
                transition: transform 0.3s ease;
            }
            .cta-button:hover {
                transform: translateY(-2px);
            }
            .footer {
                background-color: #f8f9fa;
                padding: 25px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #666;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .social-links {
                margin-top: 15px;
            }
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: #6366f1;
                text-decoration: none;
            }
            @media (max-width: 600px) {
                .content {
                    padding: 20px;
                }
                .header {
                    padding: 30px 20px;
                }
                .header h1 {
                    font-size: 24px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 TaskFlow AI</h1>
                <p>Intelligent Workflow Automation for Students</p>
            </div>
            
            <div class="content">
                <div class="welcome-message">
                    <h2>Welcome to the future, ${username}! 🚀</h2>
                    <p>You've just joined TaskFlow AI - the revolutionary platform that transforms your natural conversations into intelligent workflows. No more manual task creation or complex scheduling. Just speak naturally, and let AI do the rest.</p>
                </div>

                <div class="features">
                    <h3>What makes TaskFlow AI special:</h3>
                    <ul class="feature-list">
                        <li>Convert natural speech to structured workflows automatically</li>
                        <li>AI-powered task dependency identification and optimization</li>
                        <li>Smart scheduling across academics, health, work, and social life</li>
                        <li>Intelligent workflow suggestions based on your patterns</li>
                        <li>Automatic conflict detection and resolution</li>
                        <li>Real-time workflow adjustments and recommendations</li>
                        <li>Seamless integration with your university schedule</li>
                    </ul>
                </div>

                <a href="http://localhost:3000" class="cta-button">Start Your AI Journey</a>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #666; font-size: 14px;">
                        <strong>Ready to experience the magic?</strong><br>
                        Simply start talking to TaskFlow AI about your day, and watch as it creates 
                        intelligent workflows tailored to your student life. Need help getting started? 
                        Contact us at <a href="mailto:support@taskflowai.com" style="color: #6366f1;">support@taskflowai.com</a>
                    </p>
                </div>
            </div>

            <div class="footer">
                <p><strong>Welcome to Intelligent Productivity!</strong></p>
                <p>The TaskFlow AI Team</p>
                <div class="social-links">
                    <a href="#">📧 Email</a>
                    <a href="#">🌐 Website</a>
                    <a href="#">📱 Mobile App</a>
                </div>
                <p style="margin-top: 15px; font-size: 12px; color: #999;">
                    This email was sent to ${email}. If you didn't create an account, please contact us.
                </p>
            </div>
        </div>
    </body>
    </html>`;

    const mailOptions = {
      from: `"TaskFlow AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject:
        "🤖 Welcome to TaskFlow AI - Your Intelligent Workflow Assistant!",
      html: welcomeHtml,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}:`, result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (err) {
    console.error("❌ Error sending welcome email:", err.message);
    return { success: false, error: err.message };
  }
};

export const sendResetPasswordEmail = async (email, resetToken) => {
  try {
    const transporter = createTransporter();

    const resetHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your TaskFlow AI Password</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
            }
            .header h1 {
                font-size: 28px;
                margin-bottom: 10px;
            }
            .header p {
                font-size: 16px;
                opacity: 0.9;
            }
            .content {
                padding: 40px 30px;
            }
            .alert-box {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 30px;
                text-align: center;
            }
            .alert-box .icon {
                font-size: 48px;
                margin-bottom: 15px;
            }
            .alert-box h2 {
                color: #856404;
                margin-bottom: 10px;
            }
            .alert-box p {
                color: #856404;
                font-size: 14px;
            }
            .reset-section {
                text-align: center;
                margin: 30px 0;
            }
            .reset-section h3 {
                color: #333;
                margin-bottom: 15px;
            }
            .reset-section p {
                color: #666;
                margin-bottom: 25px;
                line-height: 1.8;
            }
            .token-box {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border: 2px dashed #6c757d;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
            }
            .token {
                font-family: 'Courier New', monospace;
                font-size: 24px;
                font-weight: bold;
                color: #495057;
                letter-spacing: 2px;
                word-break: break-all;
                background-color: #fff;
                padding: 15px;
                border-radius: 5px;
                border: 1px solid #dee2e6;
                margin: 10px 0;
            }
            .copy-instruction {
                font-size: 12px;
                color: #6c757d;
                margin-top: 10px;
            }
            .security-notice {
                background-color: #f8f9fa;
                border-left: 4px solid #ef4444;
                padding: 20px;
                margin: 30px 0;
                border-radius: 0 8px 8px 0;
            }
            .security-notice h4 {
                color: #ef4444;
                margin-bottom: 10px;
            }
            .security-notice ul {
                color: #666;
                padding-left: 20px;
            }
            .security-notice li {
                margin-bottom: 5px;
            }
            .expiry-notice {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 15px;
                text-align: center;
                margin: 20px 0;
            }
            .expiry-notice strong {
                color: #856404;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 25px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #666;
                font-size: 14px;
                margin-bottom: 10px;
            }
            @media (max-width: 600px) {
                .content {
                    padding: 20px;
                }
                .header {
                    padding: 30px 20px;
                }
                .header h1 {
                    font-size: 24px;
                }
                .token {
                    font-size: 18px;
                    letter-spacing: 1px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔐 Password Reset Request</h1>
                <p>TaskFlow AI Security</p>
            </div>
            
            <div class="content">
                <div class="alert-box">
                    <div class="icon">🛡️</div>
                    <h2>Secure Password Reset</h2>
                    <p>Someone has requested a password reset for your TaskFlow AI account</p>
                </div>

                <div class="reset-section">
                    <h3>Your Password Reset Token</h3>
                    <p>Use the token below to reset your TaskFlow AI password. Copy this token and paste it in the application when prompted.</p>
                    
                    <div class="token-box">
                        <div class="token">${resetToken}</div>
                        <div class="copy-instruction">Click to select and copy the token above</div>
                    </div>
                </div>

                <div class="expiry-notice">
                    <strong>⏰ Important:</strong> This token will expire in 15 minutes for security reasons.
                </div>

                <div class="security-notice">
                    <h4>🔒 Security Guidelines</h4>
                    <ul>
                        <li>Never share this token with anyone</li>
                        <li>Use this token only in the official TaskFlow AI application</li>
                        <li>If you didn't request this reset, please contact support immediately</li>
                        <li>This token can only be used once</li>
                        <li>Choose a strong password to protect your workflows and AI data</li>
                        <li>Consider enabling two-factor authentication after reset</li>
                    </ul>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #666;">
                        <strong>Need help?</strong><br>
                        Contact our TaskFlow AI support team at 
                        <a href="mailto:security@taskflowai.com" style="color: #ef4444;">security@taskflowai.com</a>
                    </p>
                </div>
            </div>

            <div class="footer">
                <p><strong>TaskFlow AI Security Team</strong></p>
                <p>This email was sent to ${email}</p>
                <p style="margin-top: 15px; font-size: 12px; color: #999;">
                    If you didn't request a password reset, please ignore this email or contact support if you have concerns about your account security.
                </p>
            </div>
        </div>
    </body>
    </html>`;

    const mailOptions = {
      from: `"TaskFlow AI Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 TaskFlow AI Password Reset Token - Action Required",
      html: resetHtml,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Reset token sent to ${email}:`, result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (err) {
    console.error("❌ Error sending token email:", err.message);
    return { success: false, error: err.message };
  }
};

export const sendEmailVerificationToken = async (email, verificationToken) => {
  try {
    const transporter = createTransporter();

    const verificationHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your TaskFlow AI Email</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
            }
            .header h1 {
                font-size: 28px;
                margin-bottom: 10px;
            }
            .header p {
                font-size: 16px;
                opacity: 0.9;
            }
            .content {
                padding: 40px 30px;
            }
            .verification-box {
                background-color: #d1fae5;
                border: 1px solid #a7f3d0;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 30px;
                text-align: center;
            }
            .verification-box .icon {
                font-size: 48px;
                margin-bottom: 15px;
            }
            .verification-box h2 {
                color: #065f46;
                margin-bottom: 10px;
            }
            .verification-box p {
                color: #065f46;
                font-size: 14px;
            }
            .verification-section {
                text-align: center;
                margin: 30px 0;
            }
            .verification-section h3 {
                color: #333;
                margin-bottom: 15px;
            }
            .verification-section p {
                color: #666;
                margin-bottom: 25px;
                line-height: 1.8;
            }
            .token-box {
                background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
                border: 2px dashed #10b981;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
            }
            .token {
                font-family: 'Courier New', monospace;
                font-size: 24px;
                font-weight: bold;
                color: #065f46;
                letter-spacing: 2px;
                word-break: break-all;
                background-color: #fff;
                padding: 15px;
                border-radius: 5px;
                border: 1px solid #a7f3d0;
                margin: 10px 0;
            }
            .copy-instruction {
                font-size: 12px;
                color: #065f46;
                margin-top: 10px;
            }
            .verification-steps {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 25px;
                margin: 30px 0;
            }
            .verification-steps h4 {
                color: #10b981;
                margin-bottom: 15px;
                text-align: center;
            }
            .steps-list {
                list-style: none;
                counter-reset: step-counter;
            }
            .steps-list li {
                counter-increment: step-counter;
                padding: 10px 0;
                position: relative;
                padding-left: 40px;
            }
            .steps-list li:before {
                content: counter(step-counter);
                position: absolute;
                left: 0;
                top: 10px;
                background: #10b981;
                color: white;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            }
            .expiry-notice {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                padding: 15px;
                text-align: center;
                margin: 20px 0;
            }
            .expiry-notice strong {
                color: #856404;
            }
            .benefits-box {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border-left: 4px solid #10b981;
                padding: 20px;
                margin: 30px 0;
                border-radius: 0 8px 8px 0;
            }
            .benefits-box h4 {
                color: #10b981;
                margin-bottom: 15px;
            }
            .benefits-list {
                list-style: none;
                color: #666;
            }
            .benefits-list li {
                margin-bottom: 8px;
                position: relative;
                padding-left: 25px;
            }
            .benefits-list li:before {
                content: "🤖";
                font-size: 16px;
                position: absolute;
                left: 0;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 25px;
                text-align: center;
                border-top: 1px solid #e9ecef;
            }
            .footer p {
                color: #666;
                font-size: 14px;
                margin-bottom: 10px;
            }
            @media (max-width: 600px) {
                .content {
                    padding: 20px;
                }
                .header {
                    padding: 30px 20px;
                }
                .header h1 {
                    font-size: 24px;
                }
                .token {
                    font-size: 18px;
                    letter-spacing: 1px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📧 Verify Your Email</h1>
                <p>TaskFlow AI Account Activation</p>
            </div>
            
            <div class="content">
                <div class="verification-box">
                    <div class="icon">🚀</div>
                    <h2>Activate Your AI Assistant</h2>
                    <p>Verify your email to unlock the full power of TaskFlow AI</p>
                </div>

                <div class="verification-section">
                    <h3>Your Email Verification Token</h3>
                    <p>Use the token below to verify your email address and activate your TaskFlow AI account. Copy this token and paste it in the application when prompted.</p>
                    
                    <div class="token-box">
                        <div class="token">${verificationToken}</div>
                        <div class="copy-instruction">Click to select and copy the token above</div>
                    </div>
                </div>

                <div class="expiry-notice">
                    <strong>⏰ Important:</strong> This verification token will expire in 24 hours.
                </div>

                <div class="verification-steps">
                    <h4>🎯 How to Verify Your Email</h4>
                    <ol class="steps-list">
                        <li>Copy the verification token above</li>
                        <li>Open the TaskFlow AI application</li>
                        <li>Select "Verify Email" from the menu</li>
                        <li>Paste the token when prompted</li>
                        <li>Start creating intelligent workflows!</li>
                    </ol>
                </div>

                <div class="benefits-box">
                    <h4>🤖 What Awaits You After Verification</h4>
                    <ul class="benefits-list">
                        <li>AI-powered workflow creation from natural language</li>
                        <li>Intelligent task dependency analysis and optimization</li>
                        <li>Smart scheduling across all life domains</li>
                        <li>Personalized productivity insights and recommendations</li>
                        <li>Automatic conflict detection and resolution</li>
                        <li>Real-time workflow adjustments based on your patterns</li>
                        <li>Seamless integration with your academic schedule</li>
                    </ul>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #666;">
                        <strong>Ready to transform your productivity?</strong><br>
                        Contact our TaskFlow AI team at 
                        <a href="mailto:support@taskflowai.com" style="color: #10b981;">support@taskflowai.com</a>
                    </p>
                </div>
            </div>

            <div class="footer">
                <p><strong>TaskFlow AI Team</strong></p>
                <p>This verification email was sent to ${email}</p>
                <p style="margin-top: 15px; font-size: 12px; color: #999;">
                    If you didn't create a TaskFlow AI account, please ignore this email or contact support if you have concerns.
                </p>
            </div>
        </div>
    </body>
    </html>`;

    const mailOptions = {
      from: `"TaskFlow AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🚀 Activate Your TaskFlow AI Account - Verification Required",
      html: verificationHtml,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(
      `✅ Email verification token sent to ${email}:`,
      result.messageId
    );
    return { success: true, messageId: result.messageId };
  } catch (err) {
    console.error("❌ Error sending verification email:", err.message);
    return { success: false, error: err.message };
  }
};
