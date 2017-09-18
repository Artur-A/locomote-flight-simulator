import getAirlines from "../../FlightAPI/getAirlines";
import * as express from "express";
import * as request from "request";
import requestPromiseToExpress from "../../helpers/requestPromiseToExpress";

const router = express.Router();
router.get("/airlines", (req, res) => requestPromiseToExpress(getAirlines(), res));

export default router;
