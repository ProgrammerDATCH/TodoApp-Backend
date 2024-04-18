import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Todo Test Cases", () => {

  it("Can't add to do without login token", (done) => {
    router()
      .post("/api/todo/add")
      .send({
        title: "TodoTest1",
        description: "This is todo for testing",
      })
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status");
        expect(response.body.status).to.equal(false);
        expect(response.body).to.have.property("message");
        done(error);
      });
  });

  it("Should not be able to get Todos without login Token", (done) => {
    router()
      .get("/api/todo/todos")
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status");
        expect(response.body.status).to.equal(false)
        done(error);
      });
  });
  
});



