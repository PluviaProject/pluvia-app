import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import FieldHelpText from '@/components/Field/components/FieldError';
import FieldError from '@/components/Field/components/FieldHelpText';
import FieldInput from '@/components/Field/components/FieldInput';
import FieldInputAddressAutocomplete from '@/components/Field/components/FieldInputAddressAutocomplete';
import FieldLabel from '@/components/Field/components/FieldLabel';
import FieldTextArea from '@/components/Field/components/FieldTextArea';
import Skeleton from '@/components/Skeleton';

interface FieldProps {
  className?: string;
  isLoading?: boolean;
  children: ReactNode;
}

export default function Field({ className, isLoading, children }: FieldProps) {
  if (isLoading)
    return (
      <div className="space-y-2 mb-4">
        <Skeleton className="rounded-md h-6 w-24" />
        <Skeleton className="rounded-lg h-14 w-full" />
      </div>
    );

  return (
    <div className={twMerge('mb-4 flex flex-col gap-1', className)}>
      {children}
    </div>
  );
}

Field.Label = FieldLabel;
Field.Input = FieldInput;
Field.TextArea = FieldTextArea;
Field.AddressAutocomplete = FieldInputAddressAutocomplete;
Field.HelpText = FieldHelpText;
Field.Error = FieldError;
