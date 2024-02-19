import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '~/db/db';
import Admin from '~/models/admin';
import { attachAdminSession, comparePassword, encryptText } from '~/utils/helper';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const { email, password } = data;

    const adminData = await Admin.findOne({ email });
    if (!adminData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    if (!(await comparePassword(password, adminData.password))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const sessionToken = await encryptText(adminData._id);
    attachAdminSession(sessionToken);

    return NextResponse.json({ data: { email } }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
