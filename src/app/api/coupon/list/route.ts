import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '~/db/db';
import { validateAdminSession } from '~/utils/helper';
import User from '~/models/user';
import Coupon from '~/models/coupon';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const sessionToken = req.cookies.get('admin-session');
    validateAdminSession();

    const couponList = await Coupon.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          code: 1,
          user: {
            email: 1
          },
          provider: 1,
          redeemDate: 1
        }
      }
    ]);
    return NextResponse.json({ data: couponList }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
