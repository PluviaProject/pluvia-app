import { AxiosError } from 'axios';

export const mapHttpError = (error: AxiosError) => {
  return (
    (error.response?.data as any).message || 'Unknown error...'
  );
};
