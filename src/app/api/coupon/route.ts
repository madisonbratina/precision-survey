import dbConnect from '~/db/db';
import Coupon from '~/models/coupon';
export const dynamic = 'force-dynamic';
import { NextResponse, NextRequest } from 'next/server';
import User from '~/models/user';
import { couponAlertMail } from '~/utils/emailHandler/emailHandler';
const couponThreshold = process.env.NEXT_PUBLIC_COUPON_THRESHOLD || '';

export async function GET() {
  try {
    await dbConnect();

    const availableCount = await Coupon.countDocuments({
      userId: { $exists: false }
    });

    const response = await Coupon.find();

    const responseData = {
      data: {
        coupons: response,
        availableCount: availableCount
      },
      status: 200
    };

    return NextResponse.json(responseData);
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const response = await Coupon.create(data);
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.cookies.get('userId');
    if (!id) return NextResponse.json({ message: 'error:User id missing' }, { status: 500 });
    await dbConnect();
    const data = await req.json();

    const { couponId } = data;
    let coupon;
    let existingCoupon = await Coupon.findOne({ userId: id.value });

    if (existingCoupon) {
      coupon = existingCoupon;
    } else {
      coupon = await Coupon.findOneAndUpdate(
        { _id: couponId },
        {
          $set: {
            userId: id.value,
            redeemDate: new Date()
          }
        }
      );

      await User.findOneAndUpdate(
        { _id: id.value },
        {
          $set: {
            couponId: coupon._id,
            surveyCompleteDate: new Date()
          }
        }
      );
    }
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
    return NextResponse.json({ data: coupon, status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
