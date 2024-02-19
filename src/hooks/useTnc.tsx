import Link from 'next/link';
import React, { useState } from 'react';

const useTnc = () => {
  const [isFirstSelected, setIsFirstSelected] = useState(false);
  const [isSecondSelected, setIsSecondSelected] = useState(false);

  return {
    TncComponent: (
      <div>
        <div className='flex items-center gap-6 mb-5'>
          <input
            type='checkbox'
            checked={isFirstSelected}
            onClick={(e: any) => setIsFirstSelected(e.target.checked)}
          />{' '}
          <p className='text-xs'>
            By clicking continue, I agree to the{' '}
            <Link style={{ color: 'blue' }} href='/privacy-policy'>
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link style={{ color: 'blue' }} href='/terms-conditions'>
              Terms of Use
            </Link>{' '}
            of Precision.
          </p>
        </div>
        <div className='flex items-center gap-6'>
          <input
            type='checkbox'
            checked={isSecondSelected}
            onClick={(e: any) => setIsSecondSelected(e.target.checked)}
          />{' '}
          <p className='text-xs'>I agree to receive marketing communication from SMO TEST.</p>
        </div>
      </div>
    ),
    isAccepted: isFirstSelected && isSecondSelected
  };
};

export default useTnc;
