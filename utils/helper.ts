import jwt from 'jsonwebtoken';
// import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import Admin from '~/models/admin';
import { cookies } from 'next/headers';

// export const encryptText = (text: string) => {
//   return CryptoJS.AES.encrypt(text, key).toString();
// };

// export const decryptText = (encryptedText: string) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedText, key);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

export const getTokenValue = (input: string) => {
  const tokenParam = 'token=';
  const startIndex = input.indexOf(tokenParam);
  if (startIndex !== -1) {
    const tokenStartIndex = startIndex + tokenParam.length;
    const tokenEndIndex =
      input.indexOf('&', tokenStartIndex) !== -1
        ? input.indexOf('&', tokenStartIndex)
        : input.length;
    let token = input.substring(tokenStartIndex, tokenEndIndex);
    return token;
  }
  return null;
};

export const getVerifyEmailTemplate = (link: string) => {
  let text = fs.readFileSync(path.resolve('/emailTemplates/veify.html'), {
    encoding: 'utf-8',
    flag: 'r'
  });
  text = text.replace('{{LINK}}', link);
  return text;
};

export const encryptText = async (_id: string) => {
  const token = jwt.sign({ _id }, process.env.NEXT_PUBLIC_JWT_KEY || '');
  return token;
};

export const decryptText = async (token: string) => {
  const data = await jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY || '');
  // @ts-ignore
  return data?._id;
};

export const hashPassword = async (password: string) => {
  let hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (passRecieved: string, passInDB: string) => {
  return await bcrypt.compare(passRecieved, passInDB);
};

export const attachAdminSession = (session: string) => {
  cookies().set('admin-session', session, {
    expires: Date.now() + +(process.env.NEXT_PUBLIC_ADMIN_SESSION_EXPIRATION_TIME || 30000)
  });
};

export const validateAdminSession = async () => {
  try {
    const sessionToken = cookies().get('admin-session');
    if (!sessionToken || !sessionToken?.value) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const adminId = await decryptText(sessionToken.value);
    const adminData = await Admin.findById(adminId);
    if (!adminData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // updating session ---
    const newSession = await encryptText(adminData._id);
    attachAdminSession(newSession);
    return adminData;
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
};
