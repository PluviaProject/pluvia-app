import { CONFIG } from '@/core/config';
import { useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import FieldInput, { FieldInputProps } from '../FieldInput';
import { Place } from './types/place';

interface FieldInputAddressAutocompleteProps extends FieldInputProps {
  onAddressSelected: (place: Place) => void;
  defaultPlaceValue?: Place;
  placesType?: string[];
  language?: string;
  country?: string;
  clearAfterSelect?: boolean;
  focusAfterSelect?: boolean;
}

export default function FieldInputAddressAutocomplete({
  onAddressSelected,
  placeholder = 'Digite um endereço',
  defaultPlaceValue,
  placesType = ['establishment'],
  language = 'en-us',
  country,
  clearAfterSelect,
  focusAfterSelect,
  ...props
}: FieldInputAddressAutocompleteProps) {
  const [currentPlace, setCurrentPlace] = useState<Place | undefined>(
    defaultPlaceValue
  );

  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: CONFIG.google.apiKey,
    libraries: ['places'],
    language,
    options: {
      types: placesType,
      componentRestrictions: { country: country || null }
    },
    onPlaceSelected: (place) => {
      const mapped = mapPlaceResult(place);

      if (mapped.latitude && mapped.longitude) {
        if (!clearAfterSelect) setCurrentPlace(mapped);
        onAddressSelected(mapped);

        if (clearAfterSelect && ref.current) ref.current.value = '';
        if (focusAfterSelect && ref.current) ref.current.focus();
      } else {
        console.warn('Endereço inválido ou sem coordenadas.');
      }
    }
  });

  const mapPlaceResult = (place: google.maps.places.PlaceResult): Place => {
    const getComponent = (type: string) =>
      place.address_components?.find((x) => x.types.includes(type));

    return {
      formattedAddress: place.formatted_address ?? '',
      street: getComponent('route')?.long_name,
      number: getComponent('street_number')?.long_name,
      zipCode: getComponent('postal_code')?.long_name,
      neighborhood: getComponent('sublocality_level_1')?.long_name,
      city: getComponent('administrative_area_level_2')?.long_name,
      state: getComponent('administrative_area_level_1')?.short_name,
      country: getComponent('country')?.long_name,
      latitude: place.geometry?.location?.lat() ?? 0,
      longitude: place.geometry?.location?.lng() ?? 0
    };
  };

  return (
    <FieldInput
      {...props}
      autoComplete="off"
      ref={ref}
      defaultValue={currentPlace?.formattedAddress}
      placeholder={placeholder}
    />
  );
}
