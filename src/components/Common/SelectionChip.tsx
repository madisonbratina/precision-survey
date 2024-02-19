import { truncateString } from '@/utils/types/helpers';
import { SelectionChipPropType } from '@/utils/types/types';
import React from 'react';

const SelectionChip = ({ children, isActive }: SelectionChipPropType) => {
  return (
    <div
      className={`text-sm px-5 py-1 border-2 rounded-full ${
        isActive ? 'bg-blue5 text-white border-blue5' : 'border-blue4 text-blue4'
      }`}
    >
      {truncateString(children)}
    </div>
  );
};

export default SelectionChip;
