import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    cookies().delete('admin-session');
    return NextResponse.json({ message: 'Logged out!' }, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
