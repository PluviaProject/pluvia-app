'use client';

import Button from '@/components/Button';
import Field from '@/components/Field';
import { Place } from '@/components/Field/components/FieldInputAddressAutocomplete/types/place';
import LoaderProvider from '@/contexts/LoaderContext';
import ToastProvider, { useToast } from '@/contexts/ToastContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Home() {
  const toast = useToast();
  const router = useRouter();

  const [date, setDate] = useState('');
  const [location, setLocation] = useState<Place | undefined>();
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!location) return toast.open('Select a location');

    const query = new URLSearchParams({
      date,
      description,
      lat: location.latitude.toString(),
      lon: location.longitude.toString(),
      address: location.formattedAddress ?? ''
    });

    router.push(`/result?${query.toString()}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0b1220] text-white px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Image
            src="/images/logo-white.png"
            className="mb-10"
            alt="Logo Pluvia"
            width={200}
            height={200}
            priority
          />
        </div>

        {/* DATE FIELD */}
        <Field>
          <Field.Label className="text-xs text-gray-400 uppercase tracking-wider">
            Date
          </Field.Label>
          <Field.HelpText>
            Choose the day of your event, activity, trip...
          </Field.HelpText>
          <Field.Input
            type="date"
            className="bg-[#111a2d] border border-[#1c2a4b] text-gray-100 placeholder-gray-500 rounded-xl p-4 w-full focus:outline-none focus:border-[#3b82f6]"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>

        {/* LOCATION FIELD */}
        <Field>
          <Field.Label className="text-xs text-gray-400 uppercase tracking-wider">
            Location
          </Field.Label>
          <Field.HelpText>Enter the place where it will happen</Field.HelpText>
          <Field.AddressAutocomplete
            placeholder="Enter a location..."
            className="bg-[#111a2d] border border-[#1c2a4b] text-gray-100 placeholder-gray-500 rounded-xl p-4 w-full focus:outline-none focus:border-[#3b82f6]"
            onAddressSelected={(place) => setLocation(place)}
            country="br"
          />
        </Field>

        {/* DESCRIPTION FIELD */}
        <Field>
          <Field.Label className="text-xs text-gray-400 uppercase tracking-wider">
            Description
          </Field.Label>
          <Field.HelpText>
            Briefly describe what will happen — for example: “Outdoor wedding
            with 150 guests,” “Trip to Bonito to explore waterfalls,” or “Picnic
            in the park with family.”
          </Field.HelpText>
          <Field.TextArea
            placeholder="Describe your plans..."
            className="bg-[#111a2d] border border-[#1c2a4b] text-gray-100 placeholder-gray-500 rounded-xl p-4 w-full focus:outline-none focus:border-[#3b82f6]"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        {/* BUTTON */}
        <Button
          theme="primary"
          className="w-full mt-6 bg-[#2563eb] hover:brightness-110 text-white font-semibold text-lg py-4 rounded-xl"
          onClick={handleSubmit}
        >
          Check Weather
        </Button>
      </div>
    </main>
  );
}

export default function HomeWithProviders() {
  return (
    <>
      <LoaderProvider>
        <ToastProvider>
          <Home />
        </ToastProvider>
      </LoaderProvider>
    </>
  );
}
