'use client';

import Loader from '@/components/Loader';
import { createContext, JSX, useContext, useState } from 'react';

export interface ILoaderProvider {
  show: (message?: string) => void;
  hide: () => void;
}

interface LoaderProviderProps {
  children: JSX.Element;
}

const LoaderContext = createContext<ILoaderProvider | undefined>(undefined);

const LoaderProvider = (props: LoaderProviderProps) => {
  const [showing, setShowing] = useState(false);

  const show = () => {
    setShowing(true);
  };

  const hide = () => {
    setShowing(false);
  };

  return (
    <LoaderContext.Provider value={{ show, hide }}>
      {showing && <Loader />}
      {props.children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;

export const useLoader = () => useContext(LoaderContext)!;
