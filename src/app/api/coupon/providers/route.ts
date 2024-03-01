import { NextResponse } from 'next/server';
import dbConnect from '~/db/db';
import Coupon from '~/models/coupon';

function getUniqueEntriesWithProperties(data: any) {
  const uniqueProviders: any = {};
  const result: any[] = [];

  data.forEach((entry: any) => {
    if (entry.provider === 'tim hortons' || entry.provider === 'amazon') {
      if (!(entry.provider in uniqueProviders)) {
        uniqueProviders[entry.provider] = true;
        const { _id, code, provider, image } = entry;
        result.push({ _id, code, provider, image: image || null });
      }
    }
  });

  return result;
}

export async function GET() {
  try {
    await dbConnect();

    const response = await Coupon.find({ userId: { $exists: false } });
    const result = getUniqueEntriesWithProperties(response);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
