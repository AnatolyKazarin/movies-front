import { appInstance, BASE_URL } from '@/api/index';

export type Movie = {
  id: number;
  userId: number;
  title: string;
  year: number;
  poster: string;
};

export const fetchMoviesRequest = () => appInstance.get<Movie[]>(`${BASE_URL}/movies`);
