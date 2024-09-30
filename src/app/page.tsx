'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    router.replace(token ? '/main' : '/signin');
  }, [token, router]);

  return <Fragment />;
}
