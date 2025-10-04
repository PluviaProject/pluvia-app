import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type SkeletonProps = ComponentProps<'div'>

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge(
        'animate-pulse bg-gray-200 dark:bg-gray-300',
        className
      )}
      {...props}
    ></div>
  );
}
