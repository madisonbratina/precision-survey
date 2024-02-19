import React from 'react';
import { SelectOptionPropType } from '@/utils/types/types';

const MultiSelectOption = ({ children, isActive, serialNumber, handler }: SelectOptionPropType) => {
  return (
    <div
      className={`mb-2 border-2 border-blue5 rounded-full p-2 ${isActive ? 'bg-blue5' : ''} flex items-center cursor-pointer`}
      onClick={handler}
    >
      <div
        className={`h-8 w-8 border-2 border-blue5 rounded-full p-2 mr-5 flex items-center justify-center font-semibold ${isActive ? 'text-white border-white' : 'text-blue5 border-blue5'}`}
      >
        {serialNumber}
      </div>
      <div className={isActive ? 'text-white text-sm' : 'text-black text-sm'}>{children}</div>
    </div>
  );
};

export default MultiSelectOption;
