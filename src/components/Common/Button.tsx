import React, { ReactNode } from 'react';
import SpinnerLoader from '../Loaders/SpinnerLoader';

type ButtonPropsType = {
  disabled?: boolean;
  children: ReactNode | string;
  handler?: () => void;
  rounded?: boolean;
  varient?: 'v1' | 'v2' | 'v3' | 'v4';
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
  As?: React.ElementType;
  loading?: boolean;
  otherProps?: any;
  addFlex?: boolean;
  addPadding?: string;
  paddingX?: string;
  fontSize?: string;
};

const varientColorMap: any = {
  v1: {
    bgColor: 'bg-blue5',
    color: 'text-white',
    disabledBgColor: 'bg-blue5 opacity-50',
    disabledColor: 'text-white'
  },
  v2: {
    bgColor: 'bg-gray-300',
    color: 'text-gray-700'
  },
  v3: {
    bgColor: 'bg-white',
    color: 'text-blue5'
  },
  v4: {
    bgColor: 'bg-white',
    color: 'text-blue5'
  }
};

const Button = ({
  disabled,
  children,
  handler = () => {},
  rounded = false,
  varient = 'v1',
  textTransform = 'uppercase',
  As: Component = 'button',
  loading = false,
  addFlex = false,
  otherProps = {},
  addPadding = '',
  paddingX = '',
  fontSize = ''
}: ButtonPropsType) => {
  const bgColor = disabled
    ? varientColorMap[varient].disabledBgColor
    : varientColorMap[varient].bgColor;
  const color = disabled ? varientColorMap[varient].disabledColor : varientColorMap[varient].color;
  return (
    <Component
      className={`${addFlex ? `` : `py-3`} ${paddingX ? paddingX : `px-5`} ${rounded ? 'rounded-full' : 'rounded-md'} ${color} ${textTransform === 'none' ? '' : textTransform} font-semibold ${bgColor}   ${addFlex ? 'flex items-center' : ``} ${addPadding} ${fontSize}  `}
      disabled={disabled}
      onClick={handler}
      {...otherProps}
    >
      {loading ? <SpinnerLoader /> : children}
    </Component>
  );
};

export default Button;
