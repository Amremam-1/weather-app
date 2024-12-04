/** @format */
"use client"

import Container from "@/components/Container"
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail"
import NavBar from "@/components/NavBar"
import WeatherDetails from "@/components/WeatherDetails"
import WeatherIcon from "@/components/WeatherIcon"
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius"
import { convertWindSpeed } from "@/utils/convertWindSpeed"
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon"
import { metersToKilometers } from "@/utils/metersToKilometers"
import { format, parseISO, fromUnixTime } from "date-fns"
import { useQuery } from "react-query"
import { loadingCityAtom, placeAtom } from "./atom"
import { useAtom } from "jotai"
import SkeletonLoader from "@/components/SkeletonLoader"
import { useEffect } from "react"
import { WeatherData } from "@/constants"
import axios from "axios"

export default function Home() {
  const [place] = useAtom(placeAtom)
  const [loadingCity] = useAtom(loadingCityAtom)

  // const { isLoading, data } = useQuery(
  //   ["repoData", place],
  //   () => fetchWeatherData(place),
  //   {
  //     enabled: !!place, // Only run query if place is defined
  //   }
  // );

  const { isLoading, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      )
      return data
    }
  )

  useEffect(() => {
    refetch()
  }, [place, refetch])

  // console.log(data);
  // معموله علشان انت المفروض عندك في القائمه حاولي 40 مصفوفه واليوم الواحد ليه اكتر من بيانات لذلك انا عملت دا علشان المصفوفه تكون فيها بيانات خاص بيوم واحد بس
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ]

  // console.log(uniqueDates);

  // Filtering data to get the first entry after 6 AM for each unique date
  const firstDateForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0]

      const entryTime = new Date(entry.dt * 1000).getHours()

      return entryDate === date && entryTime >= 6
    })
  })

  console.log(firstDateForEachDate)
  const firstDate = data?.list[0]

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    )

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <NavBar location={data?.city.name} />

      <main className="max-w-7xl px-3 mx-auto flex flex-col gap-9 w-full pt-4 pb-10">
        {/* date today */}

        {loadingCity ? (
          <SkeletonLoader />
        ) : (
          <>
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 items-end">
                  <p className="text-xl">
                    {format(parseISO(firstDate?.dt_txt ?? ""), "EEEE")}
                  </p>
                  <p className="text-sm ms-1 text-gray-900/50">
                    {format(parseISO(firstDate?.dt_txt ?? ""), "dd.MM.yyyy")}
                  </p>
                </h2>

                <Container className=" mt-2 px-6 gap-10 items-center">
                  {/* Temprature */}
                  <div className="flex flex-col px-4 text-center">
                    <span className="text-4xl text-gray-500">
                      {convertKelvinToCelsius(firstDate?.main.temp ?? 295.57)}°
                    </span>

                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span className="text-gray-900">Feels like</span>
                      <span>
                        {convertKelvinToCelsius(
                          firstDate?.main.feels_like ?? 0
                        )}
                        °
                      </span>
                    </p>

                    <p className="text-xs space-x-2">
                      <span>
                        {convertKelvinToCelsius(firstDate?.main.temp_min ?? 0)}°
                        &#8593;
                      </span>

                      <span>
                        {convertKelvinToCelsius(firstDate?.main.temp_max ?? 0)}°
                        &#8595;
                      </span>
                    </p>
                  </div>

                  {/* time and weather icons */}

                  <div className="w-full pr-3 flex justify-between gap-10 sm:gap-16 items-center overflow-x-auto whitespace-nowrap">
                    {data?.list.map((d, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 text-xs text-center py-3 font-semibold"
                      >
                        <p>{format(parseISO(d.dt_txt ?? ""), "h:mm a")}</p>

                        <WeatherIcon
                          iconname={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />
                        <p>{convertKelvinToCelsius(d.main.temp)}°</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>

              <div className="flex items-center gap-4">
                {/* left */}
                <Container className="w-fit px-4 flex-col justify-center items-center">
                  <p className="text-gray-600 capitalize text-center whitespace-nowrap">
                    {firstDate?.weather[0].description}
                  </p>

                  <WeatherIcon
                    iconname={getDayOrNightIcon(
                      firstDate?.weather[0].icon ?? "",
                      firstDate?.dt_txt ?? ""
                    )}
                  />
                </Container>

                {/* right */}
                <Container className="px-6 bg-yellow-300/80 items-center gap-4 justify-between overflow-x-auto">
                  <WeatherDetails
                    visability={metersToKilometers(
                      firstDate?.visibility ?? 1000
                    )}
                    humidity={`${firstDate?.main.humidity ?? 40}%`}
                    windSpeed={convertWindSpeed(firstDate?.wind.speed ?? 5.25)}
                    airPressure={`${firstDate?.main.pressure}hpa`}
                    sunrise={format(
                      fromUnixTime(data?.city.sunrise ?? 1733114228),
                      "H:mm"
                    )}
                    sunset={format(
                      fromUnixTime(data?.city.sunset ?? 1733114228),
                      "H:mm"
                    )}
                  />
                </Container>
              </div>
            </section>

            {/* data 7 forecast */}
            <section className="w-full flex flex-col gap-4">
              <p className="text-xl">
                Forcast{" "}
                <span className="text-sm ms-1 text-gray-900/50">
                  {`( ${firstDateForEachDate.length} days )`}
                </span>
              </p>

              {firstDateForEachDate.map((d, i) => (
                <ForecastWeatherDetail
                  key={i}
                  weatehrIcon={d?.weather[0].icon ?? "01d"}
                  date={d ? format(parseISO(d.dt_txt), "dd.MM") : ""}
                  day={d ? format(parseISO(d.dt_txt), "EEEE") : ""}
                  temp={d ? d.main.temp : 0}
                  feels_like={d ? d.main.feels_like : 0}
                  description={d ? d.weather[0].description : ""}
                  ///////////
                  visability={`${metersToKilometers(d?.visibility ?? 10000)} `}
                  windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
                  humidity={`${d ? d.main.humidity : ""}%`}
                  airPressure={`${d?.main.pressure} hPa `}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise ?? 1702517657),
                    "H:mm"
                  )}
                  sunset={format(
                    fromUnixTime(data?.city.sunset ?? 1702517657),
                    "H:mm"
                  )}
                  temp_max={d?.main.temp_max ?? 0}
                  temp_min={d?.main.temp_min ?? 0}
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
