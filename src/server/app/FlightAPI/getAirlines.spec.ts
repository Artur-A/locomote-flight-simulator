import app from "../app";
import {expect} from "chai";
import getAirlines from "./getAirlines";

describe("getAirlines", () => {
    it("should call external service", async () => {
      const result = await getAirlines();
      expect(result).to.deep.include({code: "SU", name: "Aeroflot"});
    });
});
