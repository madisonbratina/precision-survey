import ChipList from '@/components/Common/ChipList';
import { NextResponse } from 'next/server';
import dbConnect from '~/db/db';
import Coupon from '~/models/coupon';

function getUniqueEntriesWithProperties(data: any) {
  console.log('Starting getUniqueEntriesWithProperties function');
  const uniqueProviders: any = {};
  const result = [];
  console.log('Data received:', data);

  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    console.log(`Processing entry ${i}:`, entry);
    if (entry.provider === 'tim hortons' || entry.provider === 'amazon') {
      console.log(`Entry provider is ${entry.provider}`);
      if (!(entry.provider in uniqueProviders)) {
        console.log(`Adding provider ${entry.provider} to uniqueProviders`);
        uniqueProviders[entry.provider] = true;
        const { _id, code, provider, image } = entry;
        result.push({ _id, code, provider, image: image || null });
        console.log(uniqueProviders, 'uniqueProviders');
        console.log(result, 'result');
      }
    }
  }

  return result;
}

export async function GET() {
  try {
    // await dbConnect();
    // const response = await Coupon.find({ userId: { $exists: false } });
    // const result = getUniqueEntriesWithProperties(response);

    console.log('Starting GET function');
    await dbConnect();
    const response = await Coupon.find({ userId: { $exists: false } });
    console.log('Response from database:', response);
    const result = getUniqueEntriesWithProperties(response);
    console.log('Result from getUniqueEntriesWithProperties:', result);
    // console.log(response, 'response in the coupon/provider');
    // console.log(result, 'result  in the coupon/provider');
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
