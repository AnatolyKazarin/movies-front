'use client';

import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { FileUpload } from '@/app/movie/components/FileUpload';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchMovieRequest } from '@/api/GET.movies.id';
import { updateMovieRequest } from '@/api/UPDATE.movie.id';
import { inputStyle } from '@/constants/styles';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';

export default function MoviePage({ params }: { params: { id: string } }) {
  const isMobile = useClientMediaQuery('(max-width: 600px)');

  const router = useRouter();
  const {
    isPending: isLoading,
    isSuccess: isUpdateSuccess,
    mutate: updateMovie,
  } = useMutation({
    mutationFn: updateMovieRequest,
  });
  const { isSuccess, data } = useQuery({
    queryKey: ['movie'],
    queryFn: () => fetchMovieRequest(+params.id),
  });

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [poster, setPoster] = useState<string>('');

  const canUpdate =
    title.trim().length && year && data && (title !== data.data.title || year !== data.data.year || file);

  const onUpdate = () => {
    if (canUpdate) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('year', year);
      if (file) {
        formData.append('file', file);
      }
      updateMovie({ id: data.data.id, data: formData });
    }
  };

  useEffect(() => {
    if (isSuccess && data?.data.title && data?.data.year) {
      setTitle(data.data.title);
      setYear(data.data.year);
      setPoster(data.data.poster);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isUpdateSuccess) {
      router.back();
    }
  }, [isUpdateSuccess]);

  return (
    <div className="flex h-[calc(100vh-111px)] w-full flex-1">
      <main className="flex w-full flex-col gap-6 p-6 sm:p-24">
        <h3 className="m-0 mb-12 w-full text-left text-3xl font-semibold sm:mb-24 sm:text-6xl">Edit</h3>
        <div className="flex flex-col sm:flex-row">
          <FileUpload
            file={file}
            setFile={setFile}
            poster={poster}
            setPoster={() => {
              setPoster('');
            }}
          />
          <div className="ml-0 mt-8 flex w-full flex-col gap-6 sm:ml-24 sm:mt-0 sm:w-96">
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
                disabled={!canUpdate}
                loading={isLoading}
                onClick={onUpdate}
                style={{ width: '100%', backgroundColor: 'rgba(43, 209, 126, 1)', height: 45, borderRadius: 10 }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
