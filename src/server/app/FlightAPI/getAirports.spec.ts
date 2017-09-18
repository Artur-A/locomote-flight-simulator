import app from "../app";
import {expect} from "chai";
import getAirports from "./getAirports";

describe("getAirports", () => {
    it("should call external service", async () => {
      const result = await getAirports("Melbourne");
      expect(result).to.be.an("array").that.have.lengthOf.above(1);
      expect(result[0]).to.have.property("airportCode");
    });
});
