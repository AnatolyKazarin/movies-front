import { Button } from 'antd';
import { FC, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { NotificationInstance } from 'antd/lib/notification/interface';
import { signInRequest } from '@/api/POST.signin';

type LoginButtonProps = {
  notify: NotificationInstance;
  email: string;
  password: string;
};

export const SignInButton: FC<LoginButtonProps> = ({ notify, email, password }) => {
  const router = useRouter();
  const {
    isSuccess,
    data,
    isPending,
    error,
    mutate: signIn,
  } = useMutation({
    mutationFn: signInRequest,
  });

  const onSignIn = () => {
    if (email && password) {
      signIn({ email: email.trim(), password: password.trim() });
    }
  };

  useEffect(() => {
    if (isSuccess && data?.data?.token) {
      localStorage.setItem('token', data.data.token);
      router.replace('/main');
    }
  }, [data, isSuccess, router]);

  useEffect(() => {
    if (error && isAxiosError(error)) {
      const errorMessage = Array.isArray(error?.response?.data)
        ? error?.response?.data?.map((i) => i.split('-')[1]).join(',    \n')
        : error?.response?.data?.message;
      const message = errorMessage || 'Something went wrong';
      notify.open({ message, placement: 'topRight' });
    }
  }, [error, notify]);

  return (
    <Button
      type="primary"
      loading={isPending}
      onClick={onSignIn}
      style={{ width: '100%', backgroundColor: 'rgba(43, 209, 126, 1)', height: 45, borderRadius: 10 }}
    >
      SignIn
    </Button>
  );
};
