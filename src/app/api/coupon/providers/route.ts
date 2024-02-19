import { NextResponse } from 'next/server';
import dbConnect from '~/db/db';
import Coupon from '~/models/coupon';

export async function GET() {
  try {
    await dbConnect();
    const response = await Coupon.aggregate([
      {
        $match: {
          $or: [{ couponId: { $exists: true } }, { couponId: null }]
        }
      },
      {
        $addFields: {
          providerId: '$_id'
        }
      },
      {
        $group: {
          _id: '$provider',
          id: {
            $first: '$_id'
          },
          image: {
            $first: '$image'
          }
        }
      },
      {
        $project: {
          _id: '$id',
          image: 1,
          provider: '$_id'
        }
      }
    ]);
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
