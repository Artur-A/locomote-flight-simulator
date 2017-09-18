import getJson from "./getJson";

export interface IFlightPlace {
    dateTime: string;
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

export interface IFlightSearchItem {
    key: string;
    airline: {
        code: string;
        name: string;
    };
    flightNum: number;
    start: IFlightPlace;
    finish: IFlightPlace;
    plane: {
        code: string;
        shortName: string;
        fullName: string;
        manufacturer: string;
        model: string;
    };
    distance: number;
    durationMin: number;
    price: number;
}

export interface IFlightSearchParams {
    fromAirportCode: string;
    toAirportCode: string;
    date: Date;
}


export default async function flightSearch(args: IFlightSearchParams) {
    return getJson<IFlightSearchItem[]>(
        `/api/flight_search?date=${args.date.toISOString()}&from=${args.fromAirportCode}&to=${args.toAirportCode}` );
}
