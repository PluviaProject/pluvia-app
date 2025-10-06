import { weatherApi } from '@/core/apis/weather.api';
import { CONFIG } from '@/core/config';
import { WeatherDto, WeatherResult } from '@/types';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body: WeatherDto = await req.json();

    const response = await weatherApi.post<WeatherResult>(
      '/api/weather',
      body,
      { timeout: CONFIG.apis.weatherApi.timeout }
    );

    // return NextResponse.json({
    //   temperature: 21,
    //   windSpeed: 3,
    //   precipitationPercentage: 2,
    //   description:
    //     'Mild spring afternoon with plenty of sunshine, ideal for outdoor activities in Campinas.',
    //   insights: [
    //     'Dress in layers for a comfortable experience.',
    //     'Take advantage of the calm conditions for outdoor games or sports.',
    //     'Enjoy the fresh air and consider serving refreshing drinks.'
    //   ]
    // });

    return NextResponse.json(response.data);
  } catch (err) {
    let message = `Error proxying request: ${err}`;

    if (err instanceof AxiosError) {
      message = `Error proxying request: ${JSON.stringify(err.response?.data)}`;
    }

    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
