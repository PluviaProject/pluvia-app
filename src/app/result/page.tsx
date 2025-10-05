'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import {
  createWeatherService,
  WeatherResult
} from '@/services/weather.service';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const weatherService = createWeatherService();

function ResultPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [weather, setWeather] = useState<WeatherResult>();

  const date = params.get('date');
  const description = params.get('description');
  const lat = params.get('lat');
  const lon = params.get('lon');
  const address = params.get('address');

  useEffect(() => {
    if (!lat || !lon || !date) {
      router.push('/');
      return;
    }

    weatherService
      .processWeatherData({
        date,
        place: {
          coordinates: [parseFloat(lat), parseFloat(lon)],
          address: address ?? ''
        },
        description: description ?? ''
      })
      .then(setWeather)
      .catch(console.error);
  }, [lat, lon, date, description, address, router]);

  if (!date || !lat || !lon) {
    return (
      <main className="min-h-screen bg-[#0b1220] text-white flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Redirecting...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b1220] text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-[#f8eccc] text-center">
          Weather Result
        </h1>

        {weather ? (
          <Card className="bg-[#111a2d] border border-[#1c2a4b] p-6 shadow-lg space-y-6">
            {/* LOCATION AND DATE */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-semibold text-[#f8eccc]">
                {address}
              </h2>
              <p className="text-gray-400 text-sm">{date}</p>
            </div>

            {/* WEATHER STATS */}
            <div className="grid grid-cols-3 gap-4 text-center mt-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">🌡️</span>
                <p className="text-2xl font-semibold text-white">
                  {weather.temperature}°C
                </p>
                <p className="text-sm text-gray-400">Temperature</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">💨</span>
                <p className="text-2xl font-semibold text-white">
                  {weather.windSpeed} km/h
                </p>
                <p className="text-sm text-gray-400">Wind Speed</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2">🌧️</span>
                <p className="text-2xl font-semibold text-white">
                  {weather.precipitationPercentage}%
                </p>
                <p className="text-sm text-gray-400">Chance of Rain</p>
              </div>
            </div>

            {/* SUMMARY */}
            {weather.description && (
              <div className="bg-[#0e1729] p-4 rounded-xl border border-[#1f2d4e] text-gray-200 text-sm italic">
                “{weather.description}”
              </div>
            )}

            {/* INSIGHTS */}
            {weather.insights?.length ? (
              <div>
                <h3 className="text-lg font-semibold text-[#f8eccc] mb-3 text-center">
                  Tips & Insights
                </h3>
                <ul className="space-y-2">
                  {weather.insights.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-2 text-gray-300 text-sm"
                    >
                      <span className="text-lg">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* RETURN BUTTON */}
            <div className="pt-4">
              <Button
                theme="primary"
                className="w-full bg-[#2563eb] hover:brightness-110 text-white font-semibold text-lg py-4 rounded-xl"
                onClick={() => router.push('/')}
              >
                ← Back to Home
              </Button>
            </div>
          </Card>
        ) : (
          <p className="text-gray-400 mt-4 animate-pulse">
            Loading weather data...
          </p>
        )}
      </div>
    </main>
  );
}

export default function ResultPageWrapper() {
  return (
    <Suspense
      fallback={<div className="text-gray-400 p-8 text-center">Loading...</div>}
    >
      <ResultPage />
    </Suspense>
  );
}
