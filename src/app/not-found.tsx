import Link from 'next/link';
const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen items-center justify-center landingPrimary'>
      <div className='w-full rounded-lg p-6 shadow-md md:w-1/2'>
        <h2 className='mt-4 text-center text-2xl font-semibold text-gray-800'>
          Sorry, the page you requested could not be found.
        </h2>
        <p className='mt-2 text-center text-gray-600'>
          Please check the URL or{' '}
          <Link href='/' className='text-blue5'>
            return to the homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
