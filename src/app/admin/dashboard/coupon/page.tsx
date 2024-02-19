'use client';

import FullScreenLoader from '@/components/Loaders/FullScreenLoader';
import useRequest from '@/hooks/useRequest';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { parse } from 'papaparse';
import { toast } from 'react-toastify';

const Coupon = () => {
  const { request, response, isLoading, method } = useRequest();
  const [list, setList] = useState([]);
  const [csvFile, setCsvFile] = useState(null);

  useEffect(() => {
    request('GET', 'coupon/list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      if (method === 'PUT') {
        if (response && Number(response.data) > 0) {
          toast.info(`${response.data} records added successfully`);
        } else if (response && Number(response.data) === 0) {
          toast.error(` Duplicate entry, please try again with different values.`);
        }
        return;
      }
      setList(response.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    parse(file, {
      header: true,
      complete: (result: any) => {
        if (result && result.data && result.data.length === 0) {
          return toast.error(` Uploaded File Empty`);
        }
        sendCsvDataToBackend(result.data);
      },
      error: (error: any) => {
        // eslint-disable-next-line no-console
        console.error('Error parsing CSV file:', error);
      }
    });
    // setCsvFile(file);
    reader.readAsText(file);
  };

  const sendCsvDataToBackend = async (csvData: any) => {
    try {
      const importResponse = request(
        /* @ts-ignore */
        'PUT',
        '/coupon',
        { csvData },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error importing CSV data:', error);
    }
  };
  const csvData = list?.map((elem: any) => ({
    Code: elem.code,
    Provider: elem.provider,
    Status: elem?.redeemDate ? 'Redeemed' : 'Not Redeemed',
    'Redeemed by': elem?.user?.email,
    'Redeemed on': elem?.redeemDate ? moment(elem.redeemDate).format('YYYY-MM-DD') : ''
  }));
  return (
    <>
      {isLoading && <FullScreenLoader />}
      <div className='pt-8'>
        <h2 className='text-center font-semibold  text-lg'>Coupons</h2>
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
            <div className='flex flex-row justify-between  pt-4 '>
              <input
                type='file'
                accept='.csv'
                onChange={handleFileUpload}
                className='hidden'
                id='csvFileInput'
              />
              <label
                htmlFor='csvFileInput'
                className='cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Upload CSV
              </label>

              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
                onClick={() => {}}
              >
                <CSVLink data={csvData} filename={'coupons.csv'}>
                  Export CSV
                </CSVLink>
              </button>
            </div>
            <table className='w-full text-sm text-left rtl:text-right '>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue7 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Code
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    provider
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Redeemed by
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Redeemed on
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
                        {elem.code}
                      </th>
                      <th scope='row' className='px-6 py-4 font-medium '>
                        {elem.provider}
                      </th>
                      <th
                        scope='row'
                        className={`px-6 py-4 font-medium text-${elem?.redeemDate ? 'success' : 'red-500'}`}
                      >
                        {elem?.redeemDate ? 'Redeemed' : 'Not Redeemed'}
                      </th>
                      <td className='px-6 py-4'>{elem?.user?.email}</td>
                      <td className='px-6 py-4'>
                        {elem?.redeemDate ? moment(elem.redeemDate).format('YYYY-MM-DD') : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
