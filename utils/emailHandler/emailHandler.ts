import { couponAlertTemplate, emailVerificationTemplate } from './emailTemplates';
const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY || '');
export const sentMail = async (toMail: string, subject: string, html: string = '') => {
  try {
    await sgMail.send({
      from: `${process.env.NEXT_PUBLIC_SENDGRID_EMAIL}`,
      to: toMail,
      subject,
      html
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
export const userEmailVerificationMail = async (email: string, token: string) => {
  try {
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/survey?token=${token}`;
    await sentMail(email, 'Verify Your Email', emailVerificationTemplate(link));
  } catch (error: any) {
    throw new Error(error);
  }
};

export const couponAlertMail = async (availableCount: any) => {
  try {
    const subject = `Alert`;
    const content = couponAlertTemplate(availableCount);

    await sentMail(adminEmail, subject, content);
  } catch (error: any) {
    throw new Error(error);
  }
};
