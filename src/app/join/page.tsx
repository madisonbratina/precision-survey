'use client';

import Button from '@/components/Common/Button';
import VerticalApart from '@/components/Common/VerticalApart';
import loginProvider from '@/hoc/loginProvider';
import useTnc from '@/hooks/useTnc';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Join = ({ login, isLoading }: any) => {
  const [email, setEmail] = useState('');
  const [inputres, setInputRes] = useState();
  const router = useRouter();
  const { TncComponent, isAccepted } = useTnc();
  const handleSubmit = () => {
    login(email);
    postDataAsync(email);
  };

  async function postDataAsync(email: any) {
    const postData = { email };

    try {
      const response = await fetch('api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      const data = await response.json();
      setInputRes(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className='bg-blue2 p-8' style={{ minHeight: '100svh' }}>
      <VerticalApart height='80svh'>
        <div>
          <div className='relative text-center font-semibold mb-8'>
            <Image
              className='absolute top-1/2 left-3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer'
              src='/images/arrow-left.png'
              alt='email'
              height={25}
              width={25}
              onClick={() => router.back()}
            />
            Personal Information
          </div>
          <div className='mb-10'>
            <label className='text-blue5 text-opacity-80 text-sm font-semibold'>
              EMAIL ADDRESS <span className='text-red-500'>*</span>
            </label>
            <input
              className={`w-full p-3 border rounded-lg outline-none ${inputres ? 'border-red-500' : 'border-blue4'}`}
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {inputres && <span className='text-red-500 ml-2'>{inputres}</span>}
          </div>
          {TncComponent}
        </div>
        <Button
          disabled={!isAccepted || !email || isLoading}
          textTransform='capitalize'
          handler={() => handleSubmit()}
          loading={isLoading}
        >
          Continue
        </Button>
      </VerticalApart>
    </div>
  );
};

export default loginProvider(Join);
