import { cn } from "@/utils/cn";
import Image from "next/image";
import { ReactHTMLElement } from "react";

export default function WeatherIcon(
  props: React.HTMLProps<HTMLDivElement> & { iconname: string }
) {
  return (
    <div {...props} className="relative w-20 h-20">
      <Image
        src={`https://openweathermap.org/img/wn/${props.iconname}@4x.png`}
        alt="weather-icon"
        width={100}
        height={100}
        priority={true}
        className={cn("absolute h-full w-full")}
      />
    </div>
  );
}
