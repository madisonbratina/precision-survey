export type SelectOptionPropType = {
  children: string;
  isActive?: boolean;
  serialNumber: number;
  handler: () => void;
};

export type SelectionChipPropType = {
  children: string;
  isActive?: boolean;
};

export type formQuestionOptionsType = {
  id: string;
  text: string;
};

export type FormDataType = {
  id: string;
  type: 'singleSelect' | 'multiSelect';
  question: string;
  options: formQuestionOptionsType[];
};

export type FormDataListType = FormDataType[];

export type CouponData = {
  userId: string;
  code: string;
  image: string;
  provider: string;
  _id: string;
  redeemDate: Date;
};

export type CouponListType = CouponData[];
