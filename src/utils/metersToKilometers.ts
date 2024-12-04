

export function metersToKilometers(visabilityInMeters : number):string{
    const visabilityInKm = visabilityInMeters / 1000;

    return `${visabilityInKm.toFixed(0)}Km`
}