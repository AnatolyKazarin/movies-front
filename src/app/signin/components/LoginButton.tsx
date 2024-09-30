import css from 'styled-jsx/css';
import { Button } from 'antd';
import { FC, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@/api/POST.login';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { NotificationInstance } from 'antd/lib/notification/interface';

type LoginButtonProps = {
  notify: NotificationInstance;
  email: string;
  password: string;
};

export const LoginButton: FC<LoginButtonProps> = ({ notify, email, password }) => {
  const router = useRouter();
  const {
    isSuccess,
    data,
    isPending,
    error,
    mutate: login,
  } = useMutation({
    mutationFn: loginRequest,
  });

  const onLogin = () => {
    if (email && password) {
      login({ email: email.trim(), password: password.trim() });
    }
  };

  useEffect(() => {
    if (isSuccess && data?.data?.token) {
      localStorage.setItem('token', data.data.token);
      router.replace('/main');
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (error && isAxiosError(error)) {
      const message = error?.response?.data?.message || 'Something went wrong';
      notify.open({ message, placement: 'topRight' });
    }
  }, [error, notify]);

  return (
    <Button
      type="primary"
      loading={isPending}
      onClick={onLogin}
      style={{ width: '100%', backgroundColor: 'rgba(43, 209, 126, 1)', height: 45, borderRadius: 10 }}
    >
      Login
    </Button>
  );
};
