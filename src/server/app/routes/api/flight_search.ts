import getAirports from "../../FlightAPI/getAirports";
import getAirlines from "../../FlightAPI/getAirlines";
import * as express from "express";
import * as request from "request";
import requestPromiseToExpress from "../../helpers/requestPromiseToExpress";
import searchFlight from "../../FlightAPI/searchFlight";

const router = express.Router();

router.get("/flight_search", async (req, res) => {
    const dateArg = req.query.date || "";
    const from = req.query.from || "";
    const to = req.query.to || "";

    if (!dateArg || !from || !to) {
        res.status(400).json("`date`, `from` and `to` parameters a required");
        return;
    }

    const date = new Date(dateArg);
    const airlineCodes = (await getAirlines()).map((airline) => airline.code);
    // make parallel request
    Promise.all(
      airlineCodes.map((airlineCode) => searchFlight(airlineCode, from, to, date)))
    .then((flightsPerAirport) => {
      const flights = flightsPerAirport.reduce((a: any[], b: any[]) => a.concat(b), []);
      res.status(200).json(flights);
    });
  });

export default router;
