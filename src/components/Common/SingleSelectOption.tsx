import { SelectOptionPropType } from '@/utils/types/types';
import Image from 'next/image';
import React from 'react';

const SingleSelectOption = ({ children, isActive, handler }: SelectOptionPropType) => {
  return (
    <div
      className={`cursor-pointer relative mb-2 border-2 border-blue5 rounded-md p-4 ${
        isActive ? 'bg-blue5' : ''
      } flex items-center`}
      onClick={handler}
    >
      <div className='absolute'>
        {isActive ? (
          <div className='m-3'>
            <Image src='/images/blue-tick.png' alt='blue-tick.png' height={20} width={20} />
          </div>
        ) : (
          <div id='circle' className='h-4 w-4 border-2 border-blue5 rounded-full m-4'></div>
        )}
      </div>

      <div
        className={`text-center flex-grow ${isActive ? 'text-white text-sm' : 'text-#001044-500 text-sm'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SingleSelectOption;
