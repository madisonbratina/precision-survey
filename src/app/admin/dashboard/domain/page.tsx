'use client';

import FullScreenLoader from '@/components/Loaders/FullScreenLoader';
import useRequest from '@/hooks/useRequest';
import moment from 'moment';
import Modal from '@/components/Model';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Domain = () => {
  const { request, response, isLoading, method } = useRequest();
  const [list, setList] = useState<ListItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const originalList = useRef<ListItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showpages, setShowpages] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(false);
  const usersPerPage = 10;
  const idRef = useRef(null);

  interface ListItem {
    _id: string;
    domain: string;
  }
  useEffect(() => {
    request('GET', `domain`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: any) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/domain/${id}`);
      if (response && response.status === 200) {
        const res1 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/domain`);
        if (res1 && res1.data && res1.data.data.emaildomain) {
          setList(res1.data.data.emaildomain);
        }
        // Close the modal
        setShowModal(false);
      } else {
        // Handle error case for DELETE request
        toast.error(`Error deleting domain`);
        setShowModal(false);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      // console.error('Error occurred:', error);
      toast.error('An error occurred while deleting domain');
      setShowModal(false);
    }
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
  };

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setList(originalList.current);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchQuery);
    const regex = new RegExp(searchQuery, 'i');
    const filtered = originalList.current.filter((item) => regex.test(item.domain));
    setList(filtered);
  };

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
      setList(response.data.emaildomain);
      originalList.current = response.data.emaildomain;
      const totalcounts = response.data.totalcounts;
      if (totalcounts > 10) {
        setShowpages(true);
        setTotalPages(Math.ceil(totalcounts / usersPerPage));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handlePrevious = () => {
    setLoader(true);
    if (currentPage === 1) {
    } else {
      setCurrentPage(currentPage - 1);
      fetchData();
    }
  };

  const fetchData = async () => {
    // console.log('fetch');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/domain`, {
        method: 'GET'
      });
      const data = await response.json();
      setList(data.data.emaildomain);
      setLoader(false);
      // console.log('API Response:', data);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const handleNext = () => {
    // console.log('click');
    setLoader(true);
    if (currentPage === totalPages + 1) {
    } else {
      setCurrentPage(currentPage + 1);
      fetchData();
      // .catch((error) => console.error('Error fetching data:', error));
    }
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  const sendInputValue = async (data: any) => {
    try {
      const importResponse = await fetch('/api/domain', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });
      if (importResponse.status === 200) {
        request('GET', 'domain');
      }
      // Handle response if necessary
    } catch (error) {
      toast.error('Error sending data to backend:');
    }
  };
  const handleSave = () => {
    sendInputValue(inputValue);
    setInputValue('');

    // Close the modal
    toggleModal();
  };

  //   };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <div className='pt-8'>
        <h2 className='text-center font-semibold  text-lg'>Domain</h2>
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
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor='default-search'
                  className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                >
                  Search
                </label>
                <div className='relative w-96'>
                  <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                      />
                    </svg>
                  </div>
                  <input
                    type='search'
                    id='default-search'
                    className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Search Domain....'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    required
                  />
                  <button
                    type='submit'
                    className='text-white absolute end-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-700focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 '
                  >
                    Search
                  </button>
                </div>
              </form>

              <button
                className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
                onClick={toggleModal} // Toggle modal open/close on button click
              >
                Add Button
              </button>

              <Modal isOpen={modalOpen} onClose={toggleModal}>
                <p className='flex justify-center text-lg'>Add Domains</p>

                <textarea
                  placeholder='Enter  domain name,domain1'
                  // type='text'
                  value={inputValue}
                  onChange={handleChange}
                  className='border border-gray-300 rounded-md p-2 w-full h-32' // Adjusted className
                  style={{ width: '800px' }}
                />
                <div className='mt-4'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </Modal>
            </div>
            {/* <table className='w-full text-sm text-left rtl:text-right '>
              <thead className='text-xs text-white uppercase bg-blue-600 dark:bg-blue7 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Added on
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Domain
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.length > 0 &&
                  list?.map((elem: any) => {
                    return (
                      <tr
                        key={elem._id}
                        className='bg-white border-b dark:bg-blue1 dark:border-gray-700'
                      >
                        <td className='px-6 py-4'>
                          {elem?.createdAt ? moment(elem?.createdAt).format('YYYY-MM-DD') : ''}
                        </td>
                        <th scope='row' className='px-6 py-4 font-medium '>
                          {elem.domain}
                        </th>
                        <td className='px-6 py-4'>
                          <button
                            type='button'
                            className='"focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                            onClick={() => {
                              idRef.current = elem?._id;
                              setShowModal(true);
                            }}
                          >
                            Delete
                          </button>
                          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <div className='flex flex-col items-center'>
                              <p>Are you sure you want to delete this item?</p>
                              <div className='flex mt-4'>
                                <button
                                  onClick={() => {
                                    handleDelete(idRef.current);
                                    // console.log(idRef.current)
                                  }}
                                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2'
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setShowModal(false)}
                                  className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </Modal>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table> */}

            <table
              className='w-full text-sm text-left rtl:text-right'
              style={{ tableLayout: 'fixed' }}
            >
              <thead className='text-xs text-white uppercase bg-blue-600 dark:bg-blue7 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3' style={{ width: '33%' }}>
                    Added on
                  </th>
                  <th scope='col' className='px-6 py-3' style={{ width: '33%' }}>
                    Domain
                  </th>
                  <th scope='col' className='px-6 py-3' style={{ width: '33%' }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.length > 0 &&
                  list?.map((elem: any) => {
                    return (
                      <tr
                        key={elem._id}
                        className='bg-white border-b dark:bg-blue1 dark:border-gray-700'
                      >
                        <td className='px-6 py-4' style={{ width: '33%' }}>
                          {elem?.createdAt ? moment(elem?.createdAt).format('YYYY-MM-DD') : ''}
                        </td>
                        <th scope='row' className='px-6 py-4 font-medium' style={{ width: '33%' }}>
                          {elem.domain}
                        </th>
                        <td className='px-6 py-4' style={{ width: '33%' }}>
                          <button
                            type='button'
                            className='"focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                            onClick={() => {
                              idRef.current = elem?._id;
                              setShowModal(true);
                            }}
                          >
                            Delete
                          </button>
                          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <div className='flex flex-col items-center'>
                              <p>Are you sure you want to delete this item?</p>
                              <div className='flex mt-4'>
                                <button
                                  onClick={() => {
                                    handleDelete(idRef.current);
                                    // console.log(idRef.current)
                                  }}
                                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2'
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setShowModal(false)}
                                  className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </Modal>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div className='flex justify-end'>
        <button
          onClick={handlePrevious}
          className='flex items-center justify-center px-3 h-8 text-sm font-medium text-white border border-gray-300 rounded-lg bg-blue-400 hover:bg-blue-700 '
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {currentPage}
        <button
          onClick={handleNext}
          className='flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-white border border-gray-300 rounded-lg bg-blue-400 hover:bg-blue-700'
          // disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
    </>
  );
};

export default Domain;
