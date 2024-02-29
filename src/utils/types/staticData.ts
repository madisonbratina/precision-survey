import { FormDataListType } from './types';

const formDataList: FormDataListType = [
  {
    id: 'q1',
    type: 'multiSelect',
    question: 'What is most important to you when shopping for home furnishings?',
    options: [
      {
        id: 'A',
        text: 'Design/Aesthetic'
      },
      {
        id: 'B',
        text: 'Quality'
      },
      {
        id: 'C',
        text: 'Affordability'
      },
      {
        id: 'D',
        text: 'Eco-Friendly'
      }
    ]
  },
  {
    id: 'q2',
    type: 'singleSelect',
    question: 'Will you be redecorating or furnishing a space this year?',
    options: [
      {
        id: 'A',
        text: 'Yes'
      },
      {
        id: 'B',
        text: 'No'
      }
    ]
  },
  {
    id: 'q3',
    type: 'singleSelect',
    question: 'How long do you normally take to review and purchase big furniture items?',
    options: [
      {
        id: 'A',
        text: '2 weeks or less'
      },
      {
        id: 'B',
        text: '2-4 weeks'
      },
      {
        id: 'C',
        text: '4-6 weeks'
      },
      {
        id: 'D',
        text: '6 weeks or longer'
      }
    ]
  },
  {
    id: 'q4',
    type: 'multiSelect',
    question: 'What is your top priority for your space in 2024?',
    options: [
      {
        id: 'A',
        text: 'Small Refresh'
      },
      {
        id: 'B',
        text: 'Complete Redesign'
      },
      {
        id: 'C',
        text: 'Optimize Exisiting'
      },
      {
        id: 'D',
        text: 'Declutter'
      }
    ]
  },
  {
    id: 'q5',
    type: 'singleSelect',
    question: 'What room are you most likely to redecorate or upgrade this year?',
    options: [
      {
        id: 'A',
        text: 'Kitchen'
      },
      {
        id: 'B',
        text: 'Bedroom'
      },
      {
        id: 'C',
        text: 'Living Room'
      },
      {
        id: 'D',
        text: 'Home Office/Ent Room'
      }
    ]
  },
  {
    id: 'q6',
    type: 'singleSelect',
    question: 'Are you more likely to shop in store or online?',
    options: [
      {
        id: 'A',
        text: 'In Store'
      },
      {
        id: 'B',
        text: 'Online'
      }
    ]
  }
];

export const formElementByStep: any = {
  1: formDataList[0],
  2: formDataList[1],
  3: formDataList[2],
  4: formDataList[3],
  5: formDataList[4],
  6: formDataList[5]
};
