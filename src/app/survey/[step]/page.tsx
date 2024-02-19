'use client';

import MultiSelectForm from '@/components/Form/MultiSelectForm';
import SingleSelectForm from '@/components/Form/SingleSelectForm';
import useFormStepData from '@/hooks/useFormStepData';
import React from 'react';
interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className='w-full bg-gray-200  h-2.5 dark:bg-gray-700 mb-4'>
      <div className='bg-blue-300 h-2.5 ' style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

type StepPropType = {
  params: {
    step: number;
  };
  searchParams: { token: string };
};

const Step = ({ params, searchParams }: StepPropType) => {
  const { step } = params;
  const { token } = searchParams;
  const totalSteps = 7;

  const formStepData = useFormStepData(step);

  if (!formStepData) {
    return <></>;
  }

  const { type } = formStepData;
  return (
    <>
      <ProgressBar totalSteps={totalSteps} currentStep={step} />
      {type === 'singleSelect' && (
        <SingleSelectForm formStepData={formStepData} step={step} token={token} />
      )}
      {type === 'multiSelect' && (
        <MultiSelectForm formStepData={formStepData} step={step} token={token} />
      )}
    </>
  );
};

export default Step;
