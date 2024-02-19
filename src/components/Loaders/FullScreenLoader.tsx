import { BeatLoader } from 'react-spinners';

const FullScreenLoader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50'>
      <BeatLoader size={30} color='blue' />
    </div>
  );
};

export default FullScreenLoader;
