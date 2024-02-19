import { ReactNode } from 'react';

const OptionList = ({ children }: { children: ReactNode }) => {
  return <div className='mb-5'>{children}</div>;
};

export default OptionList;
