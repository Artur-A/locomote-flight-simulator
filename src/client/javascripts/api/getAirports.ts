import getJson from "./getJson";

export interface IAirport {
    airportCode: string;
    airportName: string;
    cityCode: string;
    cityName: string;
    countryCode: string;
    countryName: string;
    latitude: number;
    longitude: number;
    stateCode: string;
    timeZone: string;
}

export default async (city: string) =>
    getJson<IAirport[]>(`/api/airports?q=${encodeURIComponent(city)}`);
