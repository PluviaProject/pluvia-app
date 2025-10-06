'use client';

import Button from '@/components/Button';
import Card from '@/components/Card';
import { useToast } from '@/contexts/ToastContext';
import { WeatherResult } from '@/types';
import axios from 'axios';
import { toBlob } from 'html-to-image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';

function ResultPage() {
  const router = useRouter();
  const params = useSearchParams();
  const toast = useToast();
  const captureRef = useRef<HTMLDivElement>(null);

  const [weather, setWeather] = useState<WeatherResult>();
  const [hasError, setHasError] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

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

    axios
      .post('/api/weather-insights', {
        date,
        place: {
          coordinates: [parseFloat(lat), parseFloat(lon)],
          address: address ?? ''
        },
        description: description ?? ''
      })
      .then((res) => res.data)
      .then((data) => {
        setHasError(false);
        setWeather(data);
      })
      .catch(() => {
        setHasError(true);
        toast.open('Error processing data');
      });
  }, [lat, lon, date, description, address, router]);

  const handleShare = async () => {
    try {
      if (!captureRef.current) return;
      setIsSharing(true);

      const blob = await toBlob(captureRef.current, { cacheBust: true });
      if (!blob) {
        alert('Failed to capture image');
        setIsSharing(false);
        return;
      }

      const file = new File([blob], 'pluvia-weather.png', { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Pluvia Weather Insight 🌦️',
          text: 'Check this long-term weather prediction powered by NASA data:',
          files: [file]
        });
      } else {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      alert('Sorry! Sharing is not supported on this device.');
    } finally {
      setIsSharing(false);
    }
  };

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

        {hasError && (
          <Card className="bg-[#1a2236] border border-red-700 text-center text-gray-200 p-6 rounded-2xl">
            <h2 className="text-2xl mb-2">😅 Oops!</h2>
            <p className="text-gray-300 text-sm">
              Sorry, something went wrong while fetching the data. This is an
              early MVP — sometimes things break, even the weather 🌧️
            </p>
            <div className="mt-4">
              <Button
                theme="primary"
                className="w-full bg-[#2563eb] hover:brightness-110 text-white font-semibold text-lg py-3 rounded-xl"
                onClick={() => router.push('/')}
              >
                ← Back to Home
              </Button>
            </div>
          </Card>
        )}

        {!hasError && weather ? (
          <Card className="bg-[#111a2d] border border-[#1c2a4b] p-6 shadow-lg space-y-6">
            <div
              ref={captureRef}
              className="bg-[#0b1220] text-white rounded-2xl p-6 shadow-2xl w-full flex flex-col items-center space-y-4"
              style={{
                maxWidth: '450px',
                margin: '0 auto',
                border: '1px solid #1c2a4b'
              }}
            >
              <div className="text-center space-y-1">
                <h2 className="text-base font-semibold text-[#f8eccc] break-words">
                  {address}
                </h2>
                <p className="text-gray-400 text-xs">{date}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-1">🌡️</span>
                  <p className="text-lg font-semibold text-white">
                    {weather.temperature}°C
                  </p>
                  <p className="text-xs text-gray-400">Temperature</p>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-1">💨</span>
                  <p className="text-lg font-semibold text-white">
                    {weather.windSpeed} km/h
                  </p>
                  <p className="text-xs text-gray-400">Wind Speed</p>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-1">🌧️</span>
                  <p className="text-lg font-semibold text-white">
                    {weather.precipitationPercentage}%
                  </p>
                  <p className="text-xs text-gray-400">Chance of Rain</p>
                </div>
              </div>

              {weather.description && (
                <div className="bg-[#0e1729] p-4 rounded-xl border border-[#1f2d4e] text-gray-200 text-xs italic text-center leading-snug">
                  “{weather.description}”
                </div>
              )}

              {weather.insights?.length ? (
                <div className="w-full">
                  <h3 className="text-sm font-semibold text-[#f8eccc] mb-2 text-center">
                    Tips & Insights
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {weather.insights.map((tip, i) => (
                      <li
                        key={i}
                        className="flex items-start space-x-2 text-gray-300 leading-snug"
                      >
                        <span className="text-base">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Button
                theme="primary"
                className="w-full bg-[#2563eb] hover:brightness-110 text-white font-semibold text-lg py-4 rounded-xl"
                onClick={() => router.push('/')}
              >
                ← Back to Home
              </Button>
              <Button
                theme="secondary"
                disabled={isSharing}
                className="w-full bg-[#1f2937] hover:bg-[#374151] text-white font-medium text-lg py-4 rounded-xl"
                onClick={handleShare}
              >
                {isSharing ? 'Sharing...' : '📤 Share Forecast'}
              </Button>
            </div>
          </Card>
        ) : !hasError ? (
          <p className="text-gray-400 mt-4 animate-pulse">
            Loading weather data...
          </p>
        ) : null}
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
