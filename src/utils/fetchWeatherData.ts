import axios from "axios";
import { WeatherData } from "@/constants";
import { API_BASE_URL, WEATHER_API_KEY } from "@/utils/apiConfig";

export const fetchWeatherData = async (place: string): Promise<WeatherData> => {
  const { data } = await axios.get(
    `${API_BASE_URL}/forecast?q=${place}&appid=${WEATHER_API_KEY}`
  );
  return data;
};

