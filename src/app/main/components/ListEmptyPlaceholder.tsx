import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export const ListEmptyPlaceholder = () => {
  const router = useRouter();

  const onAddMovie = () => {
    router.push('/movie');
  };

  return (
    <div className="flex h-[calc(100vh-111px)] w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold">Your movie list is empty</h1>
      <Button
        type="primary"
        onClick={onAddMovie}
        style={{ width: 202, backgroundColor: 'rgba(43, 209, 126, 1)', height: 45, borderRadius: 10 }}
      >
        Add a new movie
      </Button>
    </div>
  );
};
