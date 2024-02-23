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
  const [selections, setSelections] = useState<formQuestionOptionsType[]>(
    new Array(options.length).fill(undefined)
  );

  const [options1, setOptions] = useState(options);

  const [options2, setOptions2] = useState(options.map((item) => ({ id: item.id, text: '' })));
  const { request, response, isLoading } = useRequest();
  const handleSubmit = () => {
    let answer = '';
    options2.forEach((elem, index) => {
      answer += `${index + 1} - ${elem.text}, `;
    });
    answer = answer.slice(0, answer.length - 2);
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
    <VerticalApart height='80vh'>
      <div>
        <FormQuestion text={question} />
        <OptionList>
          {options2.map((option, index) => (
            <MultiSelectOption
              key={option.id}
              serialNumber={index + 1}
              isActive={option.text}
              // handler={() => handleSelect(option, false, index)}
              handler={() => {
                if (option.text !== '') {
                  let newOption1 = [...options2];
                  let newOption2 = [...options1];
                  newOption2.push({ id: option.id, text: option.text });
                  newOption1[index].text = '';
                  setOptions2(newOption1);
                  setOptions(newOption2);
                }
              }}
            >
              {option.text}
            </MultiSelectOption>
          ))}
        </OptionList>
        <ChipList>
          {options1.map((option, index) => (
            <SelectionChip
              key={option.id}
              isActive={!selections.includes(option)}
              handler={() => {
                let newOption1 = [...options2];
                let newOption2 = [...options1];

                for (let i = 0; i < options2.length; i++) {
                  if (newOption1[i].text === '') {
                    newOption1[i].text = option.text;
                    const targetId = option.id;
                    for (let k = 0; k < newOption1.length; k++) {
                      if (newOption1[k].id === targetId) {
                        newOption1[k].id = newOption1[i].id;
                      }
                    }
                    newOption1[i].id = option.id;
                    newOption2.splice(index, 1);
                    break;
                  }
                }
                setOptions2(newOption1);
                setOptions(newOption2);
              }}
            >
              {option.text}
            </SelectionChip>
          ))}
          {options1.length < 4 &&
            Array.from({ length: 4 - options1.length }).map((_, fakeIndex) => (
              <SelectionChip key={`fake_${fakeIndex}`} isActive={false} handler={() => {}}>
                -
              </SelectionChip>
            ))}
        </ChipList>
      </div>
      <FormSubmit
        loading={isLoading}
        disabled={!(options1.length === 0) || !(options2.length >= 3)}
        handler={() => handleSubmit()}
      />
    </VerticalApart>
  );
};

export default MultiSelectForm;
