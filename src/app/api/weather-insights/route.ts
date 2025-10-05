import { weatherApi } from '@/core/apis/weather.api';
import { CONFIG } from '@/core/config';
import { WeatherDto, WeatherResult } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body: WeatherDto = await req.json();

    const response = await weatherApi.post<WeatherResult>(
      '/api/weather',
      body,
      { timeout: CONFIG.apis.weatherApi.timeout }
    );

    return NextResponse.json(response.data);
  } catch (err) {
    console.error('Error proxying request:', err);
    return NextResponse.json({ error: 'Failed to reach API' }, { status: 500 });
  }
}
