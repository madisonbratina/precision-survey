'use client';

import useRequest from '@/hooks/useRequest';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const loginProvider = (Component: React.FC) => {
  const EnhancedComponent = (props: any) => {
    const router = useRouter();
    const { request, response, isLoading } = useRequest();

    const login = (email: string) => {
      request('POST', 'user', { email });
    };

    useEffect(() => {
      if (response) {
        router.push('/join/success');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);

    return <Component login={login} isLoading={isLoading} {...props} />;
  };

  return EnhancedComponent;
};

export default loginProvider;
