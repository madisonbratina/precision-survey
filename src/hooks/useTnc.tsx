import Link from 'next/link';
import React, { useState } from 'react';

const useTnc = () => {
  const [isFirstSelected, setIsFirstSelected] = useState(false);
  const [isSecondSelected, setIsSecondSelected] = useState(false);

  const handleDownload = () => {
    const pdfUrl = '/pdf/Privacy Policy.pdf';
    window.open(pdfUrl, '_blank');
  };
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
            I have read and agree to the uses of my information by Precision Research in accordance
            with its{' '}
            <Link style={{ color: 'blue' }} onClick={handleDownload} href={''}>
              Privacy Policy
            </Link>{' '}
          </p>
        </div>
      </div>
    ),
    isAccepted: isFirstSelected
  };
};

export default useTnc;
