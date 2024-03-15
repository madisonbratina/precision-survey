import dbConnect from '~/db/db';
export const dynamic = 'force-dynamic';
import { NextResponse, NextRequest } from 'next/server';
import EmailDomain from '~/models/emaildomain';

function convertStringToArray(string: string): string[] {
  const substrings = string.split(',');
  const uniqueArray: string[] = [];

  for (let i = 0; i < substrings.length; i++) {
    const substring = substrings[i].trim();
    if (!uniqueArray.includes(substring)) {
      uniqueArray.push(substring);
    }
  }

  return uniqueArray;
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json();
    const resultArray = convertStringToArray(data);
    for (let i of resultArray) {
      const emaildomain = new EmailDomain({
        domain: i
      });
      await emaildomain.save();
    }
    return NextResponse.json({ message: 'done recode' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const response = await EmailDomain.find();

    const responseData = {
      data: {
        emaildomain: response
      },
      status: 200
    };

    return NextResponse.json(responseData);
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
