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
  const processWeatherData = async (
    dto: WeatherDto
  ): Promise<WeatherResult> => {
    // return Promise.resolve({
    //   temperature: 23,
    //   windSpeed: 30,
    //   precipitationPercentage: 0,
    //   description:
    //     'Um dia agradável e ensolarado para o casamento externo, com uma brisa moderada trazendo frescor.',
    //   insights: [
    //     'Certifique-se de fixar bem as decorações e arranjos devido ao vento.',
    //     'Forneça sombra para os convidados, especialmente idosos e crianças.',
    //     'Aproveite o clima para atividades ao ar livre e fotos memoráveis.'
    //   ]
    // });

    try {
      const response = await weatherApi.post('/api/weather', dto, {
        timeout: 15000
      });

      return response.data;
    } catch (error) {
      console.error(error);
      
      return {
        temperature: 23,
        windSpeed: 30,
        precipitationPercentage: 0,
        description:
          'Um dia agradável e ensolarado para o casamento externo, com uma brisa moderada trazendo frescor.',
        insights: [
          'Certifique-se de fixar bem as decorações e arranjos devido ao vento.',
          'Forneça sombra para os convidados, especialmente idosos e crianças.',
          'Aproveite o clima para atividades ao ar livre e fotos memoráveis.'
        ]
      };
    }
  };

  return {
    processWeatherData
  };
};
