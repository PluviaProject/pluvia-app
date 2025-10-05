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
