'use client';

import WelcomeCard from '@/components/Common/WelcomeCard';
import loginProvider from '@/hoc/loginProvider';
import { gogleLoginFail, gogleLoginSuccess } from '@/utils/types/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import Modal from '@/components/Model';
import useTnc from '@/hooks/useTnc';
import Button from '@/components/Common/Button';
import FullScreenLoader from '@/components/Loaders/FullScreenLoader';

const Page = ({ login, isLoading }: any) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { TncComponent, isAccepted } = useTnc();
  const [googleEmail, setGoogleEmail] = useState(null);

  // google login ---
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (data) => {
      const email = await gogleLoginSuccess(data);
      if (email) {
        setGoogleEmail(email);
        setIsConfirmOpen(true);
      }
    },
    onError: gogleLoginFail
  });

  const router = useRouter();
  const handleLogin = (provider: 'email' | 'google') => {
    if (provider === 'email') {
      router.push('/join');
    }
    if (provider === 'google') {
      loginWithGoogle();
    }
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <WelcomeCard subTitle='Earn a gift card of your choice by filling out a short survey.'>
        <div className='flex flex-col items-center gap-4'>
          <LiginLink
            image='/images/email.png'
            text='Continue with Email'
            handler={() => handleLogin('email')}
          />
          <LiginLink
            image='/images/google.png'
            text='Continue with Google'
            handler={() => handleLogin('google')}
          />
        </div>
      </WelcomeCard>
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <div>
          <div className='text-center font-semibold mb-8 text-lg'>
            Privacy Policy & Terms of Use
          </div>
          {TncComponent}
          <div className='flex gap-10 mt-10'>
            <Button
              varient='v2'
              handler={() => {
                setIsConfirmOpen(false);
                setGoogleEmail(null);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!googleEmail || !isAccepted || isLoading}
              varient='v1'
              handler={() => {
                login(googleEmail);
                setIsConfirmOpen(false);
              }}
              loading={isLoading}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const LiginLink = ({
  image,
  text,
  handler
}: {
  image: string;
  text: string;
  handler: () => void;
}) => {
  return (
    <div
      className='p-3 rounded bg-white text-#001044 text-sm cursor-pointer relative'
      style={{ width: '300px', textAlign: 'center' }}
      onClick={handler}
    >
      <Image
        className='mr-8 absolute top-1/2 left-7 transform -translate-y-1/2'
        src={image}
        alt='email'
        height={30}
        width={30}
      />
      {text}
    </div>
  );
};

export default loginProvider(Page);
