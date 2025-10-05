export const CONFIG = {
  google: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  },
  apis: {
    weatherApi: {
      baseUrl: process.env.WEATHER_API_BASE_URL,
      timeout: 60_000
    }
  }
};
