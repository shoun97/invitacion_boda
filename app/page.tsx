'use client';

import { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Video, Clock } from 'lucide-react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Wedding date: September 14, 2025 at 19:00 Chile time (GMT-3)
    const weddingDate = new Date('2025-09-14T19:00:00-03:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50">
      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 text-pink-200 w-6 h-6 animate-float" />
        <Heart className="absolute top-40 right-20 text-rose-200 w-4 h-4 animate-float" style={{ animationDelay: '2s' }} />
        <Heart className="absolute bottom-40 left-20 text-pink-300 w-5 h-5 animate-float" style={{ animationDelay: '4s' }} />
        <Heart className="absolute bottom-60 right-10 text-rose-300 w-3 h-3 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <p className="font-dancing text-2xl md:text-3xl text-rose-600 mb-4 animate-pulse-slow">
            Te invitamos a celebrar
          </p>
          <h1 className="font-great-vibes text-6xl md:text-8xl lg:text-9xl text-gradient mb-8 leading-none">
            Igmar & Manuel
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-rose-300"></div>
            <Heart className="text-rose-400 w-6 h-6 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-rose-300"></div>
          </div>
          <p className="font-dancing text-3xl md:text-4xl text-rose-700 mb-4">
            Nuestra Boda
          </p>
        </div>

        {/* Countdown Section */}
        <div className="glass-card rounded-3xl p-8 mb-16 max-w-4xl mx-auto shadow-2xl">
          <h2 className="font-dancing text-3xl md:text-4xl text-center text-rose-800 mb-8">
            Cuenta Regresiva
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: timeLeft.days, label: 'Días' },
              { value: timeLeft.hours, label: 'Horas' },
              { value: timeLeft.minutes, label: 'Minutos' },
              { value: timeLeft.seconds, label: 'Segundos' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-4 md:p-6 mb-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-rose-800 mb-2">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="font-dancing text-xl md:text-2xl text-rose-600">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {/* Date & Time */}
          <div className="glass-card rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="text-rose-500 w-12 h-12" />
            </div>
            <h3 className="font-dancing text-3xl text-center text-rose-800 mb-4">
              Fecha y Hora
            </h3>
            <div className="text-center space-y-2">
              <p className="text-2xl font-semibold text-rose-700">
                14 de Septiembre, 2025
              </p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="text-rose-500 w-5 h-5" />
                <p className="text-xl text-rose-600">
                  7:00 PM (Hora de Chile)
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="glass-card rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="text-rose-500 w-12 h-12" />
            </div>
            <h3 className="font-dancing text-3xl text-center text-rose-800 mb-4">
              Ubicación
            </h3>
            <div className="text-center space-y-2">
              <p className="text-2xl font-semibold text-rose-700">
                Bogotá, Colombia
              </p>
              <p className="text-lg text-rose-600">
                Ceremonia religiosa
              </p>
            </div>
          </div>
        </div>

        {/* Live Stream Section */}
        <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl mb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Video className="text-rose-500 w-12 h-12" />
            </div>
            <h3 className="font-dancing text-4xl text-rose-800 mb-6">
              Transmisión en Vivo
            </h3>
            <p className="text-lg text-rose-600 mb-8 leading-relaxed">
              No podrás estar físicamente con nosotros, pero podrás ser parte de este momento especial 
              a través de nuestra transmisión en vivo. ¡Acompáñanos virtualmente en este día tan importante!
            </p>
            <a
              href="https://www.youtube.com/live/LUG7heWcero"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform"
            >
              <Video className="w-6 h-6" />
              Ver Transmisión en YouTube
            </a>
          </div>
        </div>

        {/* Message Section */}
        <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl text-center">
          <Heart className="text-rose-400 w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h3 className="font-dancing text-4xl text-rose-800 mb-6">
            Con Todo Nuestro Amor
          </h3>
          <p className="text-lg text-rose-600 leading-relaxed mb-6">
            Después de tanto tiempo esperando este momento, finalmente llegó el día de unirnos 
            en matrimonio. Aunque la distancia nos separe físicamente, sabemos que estarás 
            presente en nuestros corazones en este día tan especial.
          </p>
          <p className="font-dancing text-2xl text-rose-700">
            ¡Gracias por ser parte de nuestra historia de amor!
          </p>
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="text-right">
              <p className="font-dancing text-3xl text-rose-700">Igmar</p>
            </div>
            <Heart className="text-rose-400 w-8 h-8" />
            <div className="text-left">
              <p className="font-dancing text-3xl text-rose-700">Manuel</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="font-dancing text-2xl text-rose-500">
            14 • 09 • 2025
          </p>
        </div>
      </div>
    </div>
  );
}