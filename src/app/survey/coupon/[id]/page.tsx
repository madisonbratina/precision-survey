'use client';

import Button from '@/components/Common/Button';
import GradientCard from '@/components/Common/GradientCard';
import useRequest from '@/hooks/useRequest';
import { copyToClipboard } from '@/utils/types/helpers';
import { CouponData } from '@/utils/types/types';
import React, { useEffect, useState } from 'react';

const Coupon = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isCopied, setIsCopied] = useState(false);
  const { request, response } = useRequest();
  const [couponData, setCouponData] = useState<CouponData | null>(null);

  useEffect(() => {
    request('PATCH', `coupon`, {
      couponId: id
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      setCouponData(response?.data);
    }
  }, [response]);

  const handleCopy = async (code: string) => {
    const isDone = await copyToClipboard(code);
    setIsCopied(isDone);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <GradientCard
      image={couponData?.image ? couponData?.image : '/images/noimage.jpg'}
      title='Winner!'
      subTitle='You’ve won! Use the prize code below at online checkout to redeem your prize.'
      enableImageBackground={true}
    >
      <div className='relative'>
        {couponData?.code && (
          <>
            <div className='border border-white rounded-full text-white text-base flex justify-between items-center pl-5'>
              {couponData.code}
              <div
                style={{
                  width: 'fit-content'
                }}
              >
                <Button
                  rounded={true}
                  varient='v1'
                  handler={() => handleCopy(couponData.code)}
                  textTransform='capitalize'
                >
                  {isCopied ? 'Copied !' : 'Copy'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </GradientCard>
  );
};

export default Coupon;
