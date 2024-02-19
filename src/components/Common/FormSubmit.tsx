import React from 'react';
import Button from './Button';

type FormSubmitPropType = {
  handler: () => void;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
};

const FormSubmit = ({
  handler,
  text = 'Submit',
  disabled = false,
  loading = false
}: FormSubmitPropType) => {
  return (
    <div className='flex justify-between items-center gap-10 mb-20'>
      <div className='flex items-center gap-3 ml-5'>
        <div className='h-3 w-3 bg-blue3 rounded-full'></div>
        <div className='h-3 w-8 bg-blue5 rounded-md'></div>
        <div className='h-3 w-3 bg-blue3 rounded-full'></div>
      </div>
      <div>
        <Button loading={loading} disabled={disabled || loading} handler={handler} varient='v1'>
          {text}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmit;
