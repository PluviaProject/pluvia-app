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
  temporalAverage: {
    temperature: number;
    windSpeed: number;
    precipitationPercentage: number;
  };
  projectionAverage: {
    temperature: number;
    windSpeed: number;
    precipitationPercentage: number;
  };
  description: string;
  insights: string[];
}

export const createWeatherService = () => {
  const processWeatherData = (dto: WeatherDto): Promise<WeatherResult> => {
    return Promise.resolve({
      temporalAverage: {
        temperature: 22,
        windSpeed: 14,
        precipitationPercentage: 35
      },
      projectionAverage: {
        temperature: 21,
        windSpeed: 12,
        precipitationPercentage: 40
      },
      description:
        'A calm and cloudy afternoon with a gentle breeze. Light rain may appear later, but most of the day will remain dry and cool.',
      insights: [
        'A light jacket will keep you comfortable.',
        'Carry a small umbrella just in case.',
        'Great weather for a walk or a coffee outdoors.',
        'Winds are mild, perfect for a relaxed day.'
      ]
    });

    // return weatherApi
    //   .post('/api/weather', dto)
    //   .then((response) => response.data);
  };

  return {
    processWeatherData
  };
};
