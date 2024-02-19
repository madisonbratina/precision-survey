import Image from 'next/image';
import React, { ReactNode } from 'react';

const FormContainerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='bg-blue1 min-h-screen'>
      <div className='bg-gradient-to-r from-blue7 to-blue5 h-36 flex items-center justify-center'>
        <Image src='/images/logo.png' alt='precision-light.png' width={185.5} height={49} />
      </div>
      <div className=''>{children}</div>
    </div>
  );
};

export default FormContainerLayout;
