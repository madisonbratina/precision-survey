'use client';

import { formElementByStep } from '@/utils/types/staticData';
import { useEffect, useState } from 'react';

const useFormStepData = (stepNumber: number) => {
  const [formStepData, setFormStepData] = useState(null);

  useEffect(() => {
    setFormStepData(formElementByStep[stepNumber]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return formStepData;
};

export default useFormStepData;
