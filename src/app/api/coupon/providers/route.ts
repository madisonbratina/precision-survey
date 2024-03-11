import { NextResponse } from 'next/server';
import dbConnect from '~/db/db';
import Coupon from '~/models/coupon';
export const revalidate = 0;

async function getUniqueEntriesWithProperties() {
  try {
    const [timHortonsCoupon, amazonCoupon] = await Promise.all([
      Coupon.findOne({ provider: 'tim hortons', userId: { $exists: false } }),
      Coupon.findOne({ provider: 'amazon', userId: { $exists: false } })
    ]);

    // Simplify conditional logic
    const foundCoupons = [timHortonsCoupon, amazonCoupon].filter(Boolean);
    if (foundCoupons.length > 0) {
      return foundCoupons;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function GET() {
  try {
    await dbConnect();
    const result = await getUniqueEntriesWithProperties();
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
