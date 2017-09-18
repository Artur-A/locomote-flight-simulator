import * as app from "../../app";
import airports from "./airports";
// tslint:disable-next-line:no-var-requires
const chai = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("api/flight_search", () => {
    it("should return json on get request", (done) => {
        chai.request(app)
            .get("/api/flight_search?date=2018-09-02&from=SYD&to=JFK")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an("array").that.have.lengthOf.above(1);
                chai.expect(res.body[1]).to.be.an("Object");
                done();
            });
    });
});

