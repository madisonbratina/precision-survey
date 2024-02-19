import React, { ReactNode } from 'react';

const VerticalApart = ({ children, height }: { children: ReactNode; height: string }) => {
  return (
    <div
      style={{
        minHeight: height,
        padding: '1rem'
      }}
      className={`flex flex-col justify-between`}
    >
      {children}
    </div>
  );
};

export default VerticalApart;
