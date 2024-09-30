'use client';

import { FC } from 'react';
import DownloadIcon from '@/assets/icons/download';
import Image from 'next/image';
import { BASE_URL } from '@/api';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';

type FileUploadProps = {
  file: File | null;
  setFile: (file: File | null) => void;
  poster?: string | undefined;
  setPoster?: () => void;
};

export const FileUpload: FC<FileUploadProps> = ({ file, poster, setFile, setPoster }) => {
  const isMobile = useClientMediaQuery('(max-width: 600px)');
  return (
    <div>
      {file || poster ? (
        <div className="flex h-full w-full flex-col items-center sm:h-[31em] sm:w-[29rem]">
          <Image
            src={file ? URL.createObjectURL(file) : `${BASE_URL}/${poster}`}
            alt={'Image'}
            width={isMobile ? 200 : 473}
            height={isMobile ? 220 : 504}
            className="h-72 w-full max-w-xs rounded-md"
          />

          <button
            onClick={() => {
              setFile(null);
              if (setPoster) {
                setPoster();
              }
            }}
            className="mt-10 rounded bg-red-600 px-4 py-2 uppercase tracking-widest text-white outline-none"
          >
            Reset
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.items) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              [...e.dataTransfer.items].forEach((item) => {
                if (item.kind === 'file') {
                  const file = item.getAsFile();
                  if (file) {
                    setFile(file);
                  }
                }
              });
            }
          }}
          className="flex h-[calc(100vw-48px)] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-[#224957] hover:cursor-pointer sm:h-[31em] sm:w-[29rem]"
        >
          <label
            htmlFor="file"
            className="flex h-full flex-col items-center justify-center gap-2 text-center hover:cursor-pointer"
          >
            <DownloadIcon />
            Drop an image here
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files[0]) {
                setFile(files[0]);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
