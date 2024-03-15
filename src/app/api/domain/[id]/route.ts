import dbConnect from '~/db/db';
import Coupon from '~/models/coupon';
export const dynamic = 'force-dynamic';
import { NextResponse, NextRequest } from 'next/server';
import { couponAlertMail } from '~/utils/emailHandler/emailHandler';
import EmailDomain from '~/models/emaildomain';
const couponThreshold = process.env.NEXT_PUBLIC_COUPON_THRESHOLD || '';

export async function DELETE(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const id = pathname.split('/').pop();
  try {
    await dbConnect();
    const response = await EmailDomain.deleteOne({ _id: id });
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
