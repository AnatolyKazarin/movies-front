'use client';

import { Button, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { FileUpload } from '@/app/movie/components/FileUpload';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createMovieRequest } from '@/api/POST.movies';
import { isAxiosError } from 'axios';
import { inputStyle } from '@/constants/styles';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';

export default function MoviePage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)');

  const router = useRouter();
  const [notify, contextHolder] = notification.useNotification();
  const {
    isSuccess,
    isPending,
    error,
    mutate: createMovie,
  } = useMutation({
    mutationFn: createMovieRequest,
  });
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const formData = new FormData();

  const onSubmit = () => {
    if (file && title.trim().length && year.trim().length) {
      formData.append('file', file);
      formData.append('title', title);
      formData.append('year', year);
      createMovie(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.back();
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (error && isAxiosError(error)) {
      const message = error?.response?.data?.message || 'Something went wrong';
      notify.open({ message, placement: 'topRight' });
    }
  }, [error, notify]);

  return (
    <div className="flex h-[calc(100vh-111px)] w-full flex-1">
      <main className="flex w-full flex-col gap-6 p-6 sm:p-24">
        {contextHolder}
        <h3 className="m-0 mb-12 w-full text-left text-3xl font-semibold sm:mb-24 sm:text-6xl">Create a new movie</h3>
        <div className="flex flex-col sm:flex-row">
          <FileUpload file={file} setFile={setFile} />
          <div className="ml-0 mt-8 flex w-96 flex-col gap-6 sm:ml-24 sm:mt-0">
            <Input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <Input
              style={{ ...inputStyle, ...(!isMobile && { width: 216 }) }}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Publishing year"
            />
            <div className="mt-2 flex flex-row gap-6 sm:mt-16">
              <Button
                onClick={router.back}
                style={{ width: '100%', backgroundColor: 'transparent', color: 'white', height: 45, borderRadius: 10 }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={onSubmit}
                loading={isPending}
                disabled={!file || !year || !title}
                style={{ width: '100%', backgroundColor: 'rgba(43, 209, 126, 1)', height: 45, borderRadius: 10 }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
