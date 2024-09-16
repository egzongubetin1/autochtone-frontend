"use client";

import { useEffect, useState } from "react";

export default function CountDown({ endDate }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    function calculateTimeLeft() {
      const difference = +new Date(endDate) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        alert("Countdown reached zero!");
        clearInterval(timer);
      }
    }, 1000);

    setTimeLeft(calculateTimeLeft()); 

    return () => clearInterval(timer);
  }, [endDate]);

  function formatTime(value) {
    return String(value).padStart(2, "0");
  }

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="flex gap-5 md:gap-20">
      <div className="flex items-center flex-col">
        <h1 className="text-5xl md:text-9xl text-white font-bold">
          {formatTime(timeLeft.days)}
        </h1>
        <span className="text-sm md:text-3xl text-center text-white">days</span>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="text-5xl md:text-9xl text-white font-bold">
          {formatTime(timeLeft.hours)}
        </h1>
        <span className="text-sm md:text-3xl text-center text-white">hours</span>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="text-5xl md:text-9xl text-white font-bold">
          {formatTime(timeLeft.minutes)}
        </h1>
        <span className="text-sm md:text-3xl text-center text-white">minutes</span>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="text-5xl md:text-9xl text-white font-bold">
          {formatTime(timeLeft.seconds)}
        </h1>
        <span className="text-sm md:text-3xl text-center text-white">seconds</span>
      </div>
    </div>
  );
}
