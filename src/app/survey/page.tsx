'use client';

import Button from '@/components/Common/Button';
import GradientCard from '@/components/Common/GradientCard';
import Link from 'next/link';
import React from 'react';

const Result = ({ searchParams }: { searchParams: { token: string } }) => {
  const { token } = searchParams;
  return (
    <GradientCard
      image='/images/openbox.png'
      title='Get Started'
      subTitle='Complete the six survey questions (est time 2 min) to earn a $5 gift card of your choice.'
      css={true}
    >
      <div className='flex justify-center'>
        <div>
          <Button
            rounded={true}
            varient='v3'
            addFlex={false}
            handler={() => {}}
            As={Link}
            otherProps={{
              href: `/survey/1?token=${token}`
            }}
          >
            Start <span className='text-3xl'>→</span>
          </Button>
        </div>
      </div>
    </GradientCard>
  );
};

export default Result;
