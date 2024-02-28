import React, { ReactNode } from 'react';
import VerticalApart from './VerticalApart';
import Image from 'next/image';

type GradientCardPropType = {
  children: ReactNode;
  image?: string;
  title?: string;
  subTitle?: string;
  enableImageBackground?: boolean;
  css?: boolean;
  addHeight?: boolean;
};

const GradientCard = ({
  children,
  image,
  title,
  subTitle,
  enableImageBackground = false,
  css = false,
  addHeight = false
}: GradientCardPropType) => {
  return (
    <div
      className='bg-gradient-to-br from-blue6 to-blue7 w-full py-10 px-4 md:px-8'
      style={{ height: '100svh' }}
    >
      <VerticalApart height={`${addHeight ? '85svh' : '80svh'}`}>
        <div>
          {image && (
            <div className='flex justify-center'>
              <div
                className={`flex justify-center items-center w-60 h-60 rounded-2xl ${
                  enableImageBackground ? 'bg-white' : ''
                }`}
              >
                <Image src={image} alt='giftbox' height={200} width={200} />
              </div>
            </div>
          )}
          {title && (
            <h1
              className={`text-white ${css ? 'text-5xl' : 'text-4xl'} font-bold text-center ${css ? '' : 'mt-8'}`}
            >
              {title}
            </h1>
          )}
          {subTitle && (
            <div className={`${css ? 'text-center' : ''}`}>
              <p
                className={`text-white text-base text-center mt-4 ${css ? 'inline-block w-[270px]' : ''}`}
              >
                {subTitle}
              </p>
            </div>
          )}
        </div>
        <div>{children}</div>
      </VerticalApart>
    </div>
  );
};

export default GradientCard;
