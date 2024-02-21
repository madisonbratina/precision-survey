import WelcomeCard from '@/components/Common/WelcomeCard';
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <WelcomeCard subTitle='Check your email'>
        <div>
          <div className='flex justify-center'>
            <Image src='/images/envelope.png' alt='email' height={100} width={100} />
          </div>
          <p className='text-center text-white mt-6'>
            Check your email to verify your email address and access your account.
          </p>
        </div>
      </WelcomeCard>
    </>
  );
}
