import { FormDataType, formQuestionOptionsType } from '@/utils/types/types';
import React, { useEffect, useState } from 'react';
import MultiSelectOption from '../Common/MultiSelectOption';
import SelectionChip from '../Common/SelectionChip';
import FormQuestion from '../Common/FormQuestion';
import ChipList from '../Common/ChipList';
import FormSubmit from '../Common/FormSubmit';
import OptionList from '../Common/OptionList';
import VerticalApart from '../Common/VerticalApart';
import { useRouter } from 'next/navigation';
import useRequest from '@/hooks/useRequest';

const MultiSelectForm = ({
  formStepData,
  step,
  token
}: {
  formStepData: FormDataType;
  step: number;
  token: string;
}) => {
  const router = useRouter();
  const { options, question } = formStepData;
  const [selections, setSelections] = useState<formQuestionOptionsType[]>([]);
  const { request, response, isLoading } = useRequest();

  const handleSelect = (option: formQuestionOptionsType) => {
    setSelections((prev) => {
      const alreadyHas = prev.find((e: any) => e.id === option.id);
      if (alreadyHas) {
        return prev.filter((item: any) => item.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleSubmit = () => {
    let answer = '';
    selections.forEach((elem) => {
      answer += `${elem.id} - ${elem.text}, `;
    });
    answer.slice(0, answer.length - 2);
    request('PATCH', `user`, {
      profilingQuestions: { question, answer },
      surveyStep: step
    });
  };

  useEffect(() => {
    if (response) {
      if (step < 6) {
        router.push(`/survey/${+step + 1}?token=${token}`);
      } else {
        router.push(`/survey/coupon?token=${token}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  return (
    <VerticalApart height='80svh'>
      <div>
        <FormQuestion text={question} />
        <OptionList>
          {options.map((option, index) => {
            return (
              <MultiSelectOption
                key={option.id}
                serialNumber={index + 1}
                isActive={!!selections.find((e: any) => e.id === option.id)}
                handler={() => handleSelect(option)}
              >
                {option.text}
              </MultiSelectOption>
            );
          })}
        </OptionList>
        <ChipList>
          {options.map((option, index) => {
            return (
              <SelectionChip
                key={option.id}
                isActive={!selections.find((e: any) => e.id === option.id)}
              >
                {option.text}
              </SelectionChip>
            );
          })}
        </ChipList>
      </div>
      <FormSubmit
        loading={isLoading}
        disabled={selections.length <= 0}
        handler={() => handleSubmit()}
      />
    </VerticalApart>
  );
};

export default MultiSelectForm;
