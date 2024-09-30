'use client';

import { useState, useEffect } from 'react';
import { ListEmptyPlaceholder } from '@/app/main/components/ListEmptyPlaceholder';
import Image from 'next/image';
import { Col, Pagination, Row } from 'antd';
import PlusIcon from '@/assets/icons/plus';
import LogoutIcon from '@/assets/icons/logout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesRequest } from '@/api/GET.movies';
import { BASE_URL } from '@/api';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';

export default function Main() {
  const isMobile = useClientMediaQuery('(max-width: 600px)');
  const router = useRouter();
  const { data } = useQuery({ queryKey: ['movies'], queryFn: fetchMoviesRequest });

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [page, setPage] = useState<number>(1);

  const onLogout = () => {
    localStorage.removeItem('token');
    router.replace('/signin');
  };

  const movies = isMobile ? data?.data : data?.data.slice((page - 1) * 8, page * 8);

  useEffect(() => setWidth(window.innerWidth), []);

  return (
    <div className="width-full flex flex-1 items-center justify-center">
      <main className="flex w-full flex-col items-center justify-center gap-6 self-center px-6 sm:px-0">
        {!movies?.length ? (
          <ListEmptyPlaceholder />
        ) : (
          <>
            <div style={{ width: width - 400 }} className="flex w-full items-center justify-between">
              <Link href={'/movie'} style={{ color: 'white', textDecoration: 'none' }}>
                <div className="flex grow items-center gap-4 self-center hover:cursor-pointer">
                  <h2 className="text-regular font-semibold sm:text-5xl">My movies</h2>
                  <PlusIcon />
                </div>
              </Link>
              <a
                onClick={onLogout}
                className="flex w-40 items-center justify-end gap-2 self-center hover:cursor-pointer sm:justify-start"
              >
                <h2 className="hidden text-base font-bold sm:block">Logout</h2>
                <LogoutIcon />
              </a>
            </div>
            <Row gutter={[24, 24]} style={{ width: isMobile ? width : width - 400, marginBottom: 100 }}>
              {movies.map((m) => (
                <Col key={m.id} span={isMobile ? 12 : 6}>
                  <Link href={`/movie/${m.id}`}>
                    <div className="rounded-xl bg-[#092c39] p-2 hover:cursor-pointer hover:bg-[#0f3c4d]">
                      <div className="overflow-hidden rounded-xl">
                        <Image
                          src={`${BASE_URL}/${m.poster}`}
                          width={isMobile ? (width - 68) / 2 : (width - 574) / 4}
                          height={isMobile ? 220 : 400}
                          alt="Cover Image"
                          className="rounded-xl"
                        />
                      </div>

                      <p className="m-0 my-1 ml-2 text-xl font-medium text-white">{m.title}</p>
                      <p className="m-0 my-1 ml-2 text-sm font-normal text-white">{m.year}</p>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
            {!isMobile && (
              <Pagination current={page} onChange={setPage} pageSize={8} defaultCurrent={1} total={movies?.length} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
