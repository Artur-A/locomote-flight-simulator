import * as rp from "request-promise";
import yyyymmdd from "../helpers/yyyymmdd";

export default async function searchFlight(
      airline: string,
      fromAirport: string,
      toAirport: string,
      date: Date) {
        return rp(
        {
          headers: { Accept: "application/json"},
          json: true,
          qs: {date: yyyymmdd(date), from: fromAirport, to: toAirport },
          uri: `http://node.locomote.com/code-task/flight_search/${airline}`,
        });
}

