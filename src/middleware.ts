import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathName = request.nextUrl.pathname;

  if (pathName.includes('/admin')) {
    // PROTECTING ADMIN ROUTES -------------------------
    if (pathName.includes('/admin/dashboard')) {
      const adminSession = cookies().get('admin-session');
      if (!adminSession || !adminSession?.value) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  } else {
    // PROTECTING SURVEY ROUTES -------------------------
    let token = request.nextUrl.search;
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    token = token.split('token=')[1];
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // const decodedToken = decodeURIComponent(token);
    const decodedToken = token;

    let couponData = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}coupon`)).json();

    let data = await (
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}user?token=${decodedToken}`)
    ).json();

    if (!data?.data || !data.data?._id) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    response.cookies.set('userId', data.data._id);
    const actualStep = data.data.surveyStep;
    const existingCoupon = data?.hasTransaction?._id || null;
    const allowedSteps = [actualStep, actualStep + 1];

    let step: number | string = request.nextUrl.pathname.split('survey/')[1];

    if (
      existingCoupon &&
      request.nextUrl.pathname.includes('coupon') &&
      !request.nextUrl.pathname.includes(existingCoupon)
    ) {
      return NextResponse.redirect(
        new URL(`/survey/coupon/${existingCoupon}?token=${decodedToken}`, request.url)
      );
    }

    if (request.nextUrl.pathname.includes('coupon') && actualStep === 6) {
      return response;
    }

    if (actualStep === 6) {
      if (couponData.data.availableCount <= 0) {
        return;
      }

      return NextResponse.redirect(new URL(`/survey/coupon?token=${decodedToken}`, request.url));
    }

    // @ts-ignore
    if (step && !isNaN(step)) {
      if (actualStep === +step) {
        return NextResponse.redirect(
          new URL(`/survey/${actualStep ? actualStep + 1 : ''}?token=${decodedToken}`, request.url)
        );
      }
      if (!allowedSteps.includes(+step)) {
        return NextResponse.redirect(
          new URL(`/survey/${actualStep ? actualStep + 1 : ''}?token=${decodedToken}`, request.url)
        );
      }
    } else {
      if (actualStep > 0 && actualStep <= 6) {
        return NextResponse.redirect(
          new URL(`/survey/${actualStep ? actualStep + 1 : ''}?token=${decodedToken}`, request.url)
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/survey',
    '/survey/:step*',
    '/survey/coupon/:id*',
    '/admin',
    '/admin/dashboard/user',
    '/admin/dashboard/coupon'
  ]
};
