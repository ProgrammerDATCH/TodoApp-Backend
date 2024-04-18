import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("User Test Cases", () => {

    it("Should be able register new user", (done) => {
      router()
        .post("/api/user/register")
        .send({
          name: "TestingUser1",
          email: "testuser1@gmail.com",
          password: "PasswordForUser1",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status");
          expect(response.body).to.have.property("message");
          expect(response.body.status).to.equal(true);
          done(error);
        });
    });
  
    it("Should not add same user twice", (done) => {
      router()
        .post("/api/user/register")
        .send({
          name: "TestingUser1",
          email: "testuser1@gmail.com",
          password: "PasswordForUser1",
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status");
          expect(response.body).to.have.property("message");
          expect(response.body.status).to.equal(false);
          expect(response.body.message).to.equal("User already exist.");
          done(error);
        });
    });
  
    it("User should not be able to login with invalid credentials", (done) => {
      router()
        .post("/api/user/login")
        .send({
          email: "fake@gmail.com",
          password: "fakePassword"
        })
        .end((error, response) => {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status");
          expect(response.body).to.have.property("message");
          expect(response.body.status).to.equal(false)
          expect(response.body.message).to.equal("Invalid credentials")
          done(error);
        });
    });
  
  });