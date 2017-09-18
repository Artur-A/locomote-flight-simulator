import * as app from "../../app";
import airports from "./airports";
// tslint:disable-next-line:no-var-requires
const chai = require("chai");
// tslint:disable-next-line:no-var-requires
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("api/airports", () => {
    it("should return json on get request", (done) => {
        chai.request(app)
            .get("/api/airports?q=Melbourne")
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an("array").that.have.lengthOf.above(1);
                done();
            });
    });
});

