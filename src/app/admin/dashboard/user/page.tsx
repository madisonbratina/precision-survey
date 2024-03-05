'use client';

import FullScreenLoader from '@/components/Loaders/FullScreenLoader';
import Modal from '@/components/Model';
import useRequest from '@/hooks/useRequest';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

const User = () => {
  const { request, response, isLoading } = useRequest();
  const [list, setList] = useState([]);
  const [selectedUser, setSelectedUser] = useState<null | any>(null);

  useEffect(() => {
    request('GET', 'user/list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      setList(response.data);
    }
  }, [response]);

  const csvData = list.map((elem: any) => {
    const profilingQuestions = elem?.profilingQuestions || [];

    const profilingFields: any = {};

    profilingQuestions.forEach((question: any, index: any) => {
      profilingFields[`Q${index + 1}`] = question.answer;
    });

    return {
      Email: elem.email,
      Status:
        elem?.surveyStep === 6
          ? elem?.coupon
            ? 'Coupon Rewarded'
            : 'Survey Completed'
          : 'Survey Partially Completed',
      'Completed On': elem?.surveyCompleteDate
        ? moment(elem.surveyCompleteDate).format('YYYY-MM-DD')
        : '',
      Coupon: elem?.coupon?.code || '',
      Answers: elem?.coupon ? 'View' : '',
      ...profilingFields
    };
  });
  return (
    <>
      {isLoading && <FullScreenLoader />}
      <div className='pt-8'>
        <h2 className='text-center font-semibold  text-2xl'>Users</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10px'
          }}
        >
          <div
            style={{ width: '90%', maxWidth: '1000px' }}
            className='relative overflow-x-auto shadow-md sm:rounded-lg'
          >
            <div className='flex justify-end'>
              <button
                className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={() => {}}
              >
                <CSVLink data={csvData} filename={'Users.csv'}>
                  Export CSV
                </CSVLink>
              </button>
            </div>
            <table className='w-full text-sm text-left rtl:text-right '>
              <thead className='text-xs text-white uppercase  dark:bg-blue7 dark:text-gray-400 bg-blue-500'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Completed On
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Coupon
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Answers
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((elem: any) => {
                  return (
                    <tr
                      key={elem._id}
                      className='bg-white border-b dark:bg-blue1 dark:border-gray-700'
                    >
                      <th scope='row' className='px-6 py-4 font-medium '>
                        {elem.email}
                      </th>

                      <th
                        scope='row'
                        className={`px-6 py-4 font-medium text-${elem?.surveyStep === 6 ? 'success' : 'red-500'}`}
                      >
                        {elem?.surveyStep === 6
                          ? elem?.coupon
                            ? 'Coupon Rewarded'
                            : 'Survey Completed'
                          : 'Survey Partially Completed'}
                      </th>
                      <td className='px-6 py-4'>
                        {elem?.surveyCompleteDate
                          ? moment(elem.surveyCompleteDate).format('YYYY-MM-DD')
                          : ''}
                      </td>
                      <td className='px-6 py-4'>{elem?.coupon?.code || ''}</td>
                      <td className='px-6 py-4 text-blue5'>
                        {elem?.coupon ? (
                          <span className='cursor-pointer' onClick={() => setSelectedUser(elem)}>
                            View
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        width={1 / 2}
        isOpen={selectedUser ? true : false}
        onClose={() => setSelectedUser(null)}
      >
        <div>
          <div className='text-center font-semibold mb-8 text-lg'>User Selections</div>
          <div className=''>
            {selectedUser &&
              selectedUser.profilingQuestions.map((elem: any, ind: number) => {
                return (
                  <div className='mb-5' key={ind}>
                    <p className='font-semibold'>{elem.question}</p>
                    <p>
                      {elem?.answer &&
                        elem.answer.split(',').map((subelem: any, sunInd: number) => {
                          return <p key={sunInd}>{subelem}</p>;
                        })}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default User;
