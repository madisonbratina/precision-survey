import FormContainerLayout from '@/layout/FormContainerLayout';
import React from 'react';

const SurveyLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <FormContainerLayout>{children}</FormContainerLayout>;
};

export default SurveyLayout;
