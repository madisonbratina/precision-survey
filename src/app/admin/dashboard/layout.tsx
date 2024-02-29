'use client';

import useRequest from '@/hooks/useRequest';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DashboardLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  // const adminEmail = sessionStorage.getItem('adminEmail') || '';
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { request, response } = useRequest();

  const handleLogout = () => {
    // sessionStorage.clear();
    request('POST', 'admin/logout');
  };

  useEffect(() => {
    if (response) {
      router.push('/admin/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleNavigation = (path: any) => {
    router.push(path);
  };

  return (
    <div className='pb-5'>
      <nav className='bg-blue-600 border-gray-200 dark:bg-blue7'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Image src='/images/logo.png' alt='precision-light.png' width={130} height={49} />
          <div className='relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <button
              type='button'
              className='flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='user-dropdown'
              data-dropdown-placement='bottom'
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
            >
              <span className='sr-only'>Open user menu</span>
              <Image src='/images/noUser.png' alt='precision-light.png' width={30} height={30} />
            </button>
            <div
              className={`z-50 ${isUserMenuOpen ? '' : 'hidden'} absolute top-7 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id='user-dropdown'
            >
              {/* <div className='px-4 py-3'>
                <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                  {adminEmail}
                </span>
              </div> */}
              <ul className='py-2' aria-labelledby='user-menu-button'>
                <li>
                  <span
                    onClick={handleLogout}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle='navbar-user'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-user'
              aria-expanded='false'
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${isMobileNavOpen ? '' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
            id='navbar-user'
          >
            <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 '>
              <li>
                <button
                  onClick={() => handleNavigation('/admin/dashboard/user')}
                  className='block py-2 px-3 text-white'
                >
                  User
                </button>
              </li>
              <li className='md:hidden border-t border-gray-300 w-full mt-2 mb-2'></li>
              <li>
                <button
                  onClick={() => handleNavigation('/admin/dashboard/coupon')}
                  className='block py-2 px-3 text-white'
                >
                  Coupon
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default DashboardLayout;
