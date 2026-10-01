import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./StaffTopBar.css";

const LATITUDE = 52.57;
const LONGITUDE = -1.82;
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=" +
  LATITUDE +
  "&longitude=" +
  LONGITUDE +
  "&current=temperature_2m,weather_code&timezone=Europe%2FLondon";

function describeWeather(code) {
  if (code === 0) return { label: "Clear", icon: "☀️" };
  if (code === 1 || code === 2) return { label: "Partly cloudy", icon: "⛅" };
  if (code === 3) return { label: "Cloudy", icon: "☁️" };
  if (code === 45 || code === 48) return { label: "Foggy", icon: "🌫️" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", icon: "🌦️" };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return { label: "Rain", icon: "🌧️" };
  }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return { label: "Snow", icon: "❄️" };
  }
  if (code >= 95) return { label: "Thunderstorm", icon: "⛈️" };
  return { label: "Unknown", icon: "🌡️" };
}

export default function StaffTopBar({ onMenuClick }) {
  const { staffName, user } = useAuth();
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async () => {
      try {
        const response = await fetch(WEATHER_URL);
        const data = await response.json();
        if (!cancelled && data.current) {
          setWeather({
            temperature: Math.round(data.current.temperature_2m),
            ...describeWeather(data.current.weather_code),
          });
        }
      } catch (err) {
        console.error("Could not load weather:", err);
      }
    };

    loadWeather();
    const refresh = setInterval(loadWeather, 15 * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(refresh);
    };
  }, []);

  const dateText = now.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Europe/London",
  });

  const timeText = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/London",
  });

  return (
    <div className="staff-topbar">
      <div className="staff-topbar__left">
        <button
          className="staff-topbar__menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          ☰
        </button>
        <div className="staff-topbar__identity">
          <span className="staff-topbar__welcome">Welcome back,</span>
          <span className="staff-topbar__name">
            {staffName || user?.email || "Staff"}
          </span>
        </div>
      </div>

      <div className="staff-topbar__right">
        <div className="staff-topbar__datetime">
          <span className="staff-topbar__time">{timeText}</span>
          <span className="staff-topbar__date">{dateText}</span>
        </div>

        <div className="staff-topbar__weather">
          {weather ? (
            <>
              <span className="staff-topbar__weather-icon">{weather.icon}</span>
              <div className="staff-topbar__weather-text">
                <span className="staff-topbar__temp">{weather.temperature}°C</span>
                <span className="staff-topbar__condition">{weather.label}</span>
              </div>
            </>
          ) : (
            <span className="staff-topbar__condition">Weather loading...</span>
          )}
        </div>
      </div>
    </div>
  );
}