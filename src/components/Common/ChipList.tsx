import React, { ReactNode } from 'react';

const ChipList = ({ children }: { children: ReactNode }) => {
  return <div className='flex justify-center gap-3 flex-wrap mb-20'>{children}</div>;
};

export default ChipList;
