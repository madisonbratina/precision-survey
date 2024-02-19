import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '~/db/db';
import Admin from '~/models/admin';
import { hashPassword } from '~/utils/helper';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const { email, password } = data;
    const hashedPassword = await hashPassword(password);
    const newAdmin = new Admin({
      email,
      password: hashedPassword
    });

    await newAdmin.save();

    return NextResponse.json({ message: 'Created successfully.' }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
