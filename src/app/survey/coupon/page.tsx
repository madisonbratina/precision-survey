'use client';

import Button from '@/components/Common/Button';
import GradientCard from '@/components/Common/GradientCard';
import useRequest from '@/hooks/useRequest';
import { CouponListType } from '@/utils/types/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Result = ({ searchParams }: { searchParams: { token: string } }) => {
  const { token } = searchParams;
  const { request, response } = useRequest();
  const [providerList, setProviderList] = useState<CouponListType>([]);

  useEffect(() => {
    request('GET', 'coupon/providers');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      setProviderList(response?.data);
    }
  }, [response]);
  return (
    <GradientCard
      image='/images/giftbox.png'
      title='Congrats!'
      subTitle='Pick a gift card of your choice from the options below.'
      addHeight={true}
    >
      <div className='flex justify-center gap-10'>
        {providerList.map((coupon) => {
          return (
            <Button
              key={coupon._id}
              rounded={true}
              addPadding={'py-3'}
              varient='v3'
              handler={() => {}}
              textTransform='capitalize'
              As={Link}
              fontSize={'text-xs'}
              paddingX={'px-4'}
              addFlex={true}
              otherProps={{
                href: `/survey/coupon/${coupon._id}?token=${token}`
              }}
            >
              {`${coupon.provider} $5`}
            </Button>
          );
        })}
      </div>
    </GradientCard>
  );
};

export default Result;
