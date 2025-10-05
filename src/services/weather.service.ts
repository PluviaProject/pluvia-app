import { weatherApi } from '@/core/apis/weather.api';

export interface WeatherDto {
  /** YYYY-MM-DD */
  date: string;
  place: {
    /** [Lat, Lng] */
    coordinates: [number, number];

    address: string;
  };
  description: string;
}

export interface WeatherResult {
  temperature: number;
  windSpeed: number;
  precipitationPercentage: number;
  description: string;
  insights: string[];
}

export const createWeatherService = () => {
  const processWeatherData = (dto: WeatherDto): Promise<WeatherResult> => {
    return weatherApi
      .post('/api/weather', dto)
      .then((response) => response.data);
  };

  return {
    processWeatherData
  };
};
