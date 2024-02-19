'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Common/Button';
import Image from 'next/image';
import useRequest from '@/hooks/useRequest';

const LoginForm = () => {
  const router = useRouter();
  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: ''
  });
  const { request, response, isLoading } = useRequest();

  const handleSubmit = () => {
    request('POST', 'admin/login', fieldValues);
  };

  useEffect(() => {
    if (response) {
      // sessionStorage.setItem('adminEmail', response.data.email);
      router.push('/admin/dashboard/user');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <div className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-blue1 dark:border-gray-700'>
        <div className='bg-gradient-to-r from-blue7 to-blue5 h-36 flex items-center justify-center'>
          <Image src='/images/logo.png' alt='precision-light.png' width={185.5} height={49} />
        </div>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2xl '>
            Admin Login
          </h1>
          <div className='space-y-4 md:space-y-6'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium  '>
                Your email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='w-full p-3 border border-blue4 rounded-lg outline-none'
                placeholder='name@company.com'
                value={fieldValues.email}
                onChange={(e) => setFieldValues((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor='password' className='block mb-2 text-sm font-medium  '>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='w-full p-3 border border-blue4 rounded-lg outline-none'
                value={fieldValues.password}
                onChange={(e) => setFieldValues((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div className='flex justify-end'>
              <Button
                loading={isLoading}
                disabled={!fieldValues.email || !fieldValues.password || isLoading}
                handler={handleSubmit}
              >
                Log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
