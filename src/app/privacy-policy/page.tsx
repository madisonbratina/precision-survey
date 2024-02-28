'use client';
import React from 'react';

const PrivacyPolicy = () => {
  const handleDownload = () => {
    const pdfUrl = '/pdf/Privacy Policy.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'privacy-policy.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
      <p>
        This is our Privacy Policy. You can download it{' '}
        <a style={{ color: 'blue', cursor: 'pointer' }} onClick={handleDownload}>
          here
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
