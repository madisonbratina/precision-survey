import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '~/db/db';
import { validateAdminSession } from '~/utils/helper';
import User from '~/models/user';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const sessionToken = req.cookies.get('admin-session');
    validateAdminSession();

    const userList = await User.aggregate([
      {
        $lookup: {
          from: 'coupons',
          localField: 'couponId',
          foreignField: '_id',
          as: 'coupon'
        }
      },
      {
        $unwind: {
          path: '$coupon',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          email: 1,
          profilingQuestions: 1,
          surveyStep: 1,
          surveyCompleteDate: 1,
          coupon: {
            _id: 1,
            code: 1,
            provider: 1,
            redeemDate: 1
          }
        }
      }
    ]);

    return NextResponse.json({ data: userList }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
