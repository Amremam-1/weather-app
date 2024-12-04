import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import Container from "./Container";
import WeatherDetails, { WeatherDetailProps } from "./WeatherDetails";
import WeatherIcon from "./WeatherIcon";

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
  weatehrIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatehrIcon = "02d",
    date = "12.02",
    day = "Monday",
    temp,
    feels_like,
    description = "clean sky",
  } = props;

  return (
    <Container className="gap-4">
      {/* left */}
      <section className="flex gap-4 items-center px-4 ">
        {/*  */}
        <div className="flex flex-col gap-1 items-center">
          <WeatherIcon iconname={weatehrIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        <div className="flex flex-col gap-1 items-center px-4">
          <span className="text-4xl">
            {convertKelvinToCelsius(temp ?? 295.57)}°
          </span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels Like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>

          <p className="capitalize text-xs text-gray-900/70 font-semibold">
            {description}
          </p>
        </div>
      </section>

      {/* right */}
      <section className="overflow-x-auto flex justify-between gap-4 px-4 pr-10 w-full">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
