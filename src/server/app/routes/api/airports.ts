import getAirports from "../../FlightAPI/getAirports";
import * as express from "express";
import * as request from "request";
import requestPromiseToExpress from "../../helpers/requestPromiseToExpress";

const router = express.Router();
router.get("/airports", (req, res) => requestPromiseToExpress(getAirports(req.query.q || ""), res));

export default router;
