'use client';
import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

const Modal = ({
  isOpen,
  onClose,
  children,
  width = 80
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: number;
}) => {
  return (
    <>
      {isOpen && (
        <div
          className='fixed top-0 left-0 w-full h-full overflow-auto bg-gray-300 bg-opacity-50'
          onClick={onClose}
        >
          <div
            className={`mx-auto p-6 bg-white rounded-lg  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-${width}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* <button onClick={onClose}>close</button> */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
