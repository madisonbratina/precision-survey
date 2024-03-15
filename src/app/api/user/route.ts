import dbConnect from '~/db/db';
import User from '~/models/user';
export const dynamic = 'force-dynamic';
import { NextResponse, NextRequest } from 'next/server';
import { decryptText, encryptText, getTokenValue } from '~/utils/helper';
import { userEmailVerificationMail } from '~/utils/emailHandler/emailHandler';
import Coupon from '~/models/coupon';
import EmailDomain from '~/models/emaildomain';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();

    const email = data.email;
    const emailParts = email.split('@');
    const domain = emailParts[emailParts.length - 1];
    const isDomainExists = await EmailDomain.findOne({ domain });
    if (isDomainExists) {
      return NextResponse.json({ message: 'Unable to register with email' }, { status: 500 });
    }
    let userData;

    const isUserExists = await User.findOne(data);
    if (isUserExists) {
      userData = isUserExists;
    } else {
      userData = await User.create(data);
    }

    const linkToken = await encryptText(String(userData._id));
    await userEmailVerificationMail(userData.email, linkToken);
    return NextResponse.json({ data: userData }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = getTokenValue(url.search);
  const userId = await decryptText(String(token));
  try {
    await dbConnect();
    let response = await User.findOne({ _id: userId }).select({ profilingQuestions: 0 });
    const hasTransaction = await Coupon.findOne({ userId });
    return NextResponse.json({ data: response, hasTransaction: hasTransaction }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const id = req.cookies.get('userId');
  if (!id) return NextResponse.json({ message: 'error:User id missing' }, { status: 500 });
  try {
    await dbConnect();
    const data = await req.json();
    const { profilingQuestions, surveyStep } = data;
    await User.findOneAndUpdate(
      { _id: id.value },
      {
        $set: {
          surveyStep
        },
        $push: {
          profilingQuestions
        }
      }
    );
    const count = await Coupon.countDocuments({ userId: { $exists: false } });
    return NextResponse.json({ message: 'Data updated', data: count, status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
