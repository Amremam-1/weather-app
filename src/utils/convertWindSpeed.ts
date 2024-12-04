

export function convertWindSpeed (speedInMetersPerSecond: number):string{
   const speedInKmperHour = speedInMetersPerSecond * 3.6

   return `${speedInKmperHour.toFixed(0)}Km/h`
}