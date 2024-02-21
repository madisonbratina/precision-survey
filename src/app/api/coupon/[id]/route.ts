import dbConnect from '~/db/db';
import Coupon from '~/models/coupon';
export const dynamic = 'force-dynamic';
import { NextResponse, NextRequest } from 'next/server';
import { couponAlertMail } from '~/utils/emailHandler/emailHandler';
const couponThreshold = process.env.NEXT_PUBLIC_COUPON_THRESHOLD || '';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const id = pathname.split('/').pop();
  try {
    await dbConnect();
    const response = await Coupon.findOne({ _id: id });
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const id = pathname.split('/').pop();
  if (!id) return NextResponse.json({ message: 'error:Coupon id missing', status: 500 });
  try {
    await dbConnect();
    const data = await req.json();
    const getCount = async () => {
      try {
        const result = await Coupon.aggregate([
          {
            $match: {
              userId: null
            }
          },
          {
            $group: {
              _id: '$provider',
              count: { $sum: 1 }
            }
          }
        ]);

        return result;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error:', error);
        throw error;
      }
    };
    const res = await getCount();
    res.map(async (entry, index) => {
      if (Number(entry.count) <= Number(couponThreshold)) {
        await couponAlertMail(entry._id);
      }
    });

    return NextResponse.json({ message: 'Data updated', status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
