import app from "../app";
import {expect} from "chai";
import searchFlight from "./searchFlight";

describe("searchFlight", () => {
    it("should call external service", (done) => {
      searchFlight("QF", "SYD", "JFK", new Date(2018, 8, 2))
        .then((result) => {
          expect(result).to.be.an("array").that.have.lengthOf.above(1);

          expect(result[0]).to.have.deep.property("airline", { code: "QF", name: "Qantas"});
          done();
        });
    });
});
