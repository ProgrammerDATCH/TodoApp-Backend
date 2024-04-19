import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);
function registerAndLoginUser(callback: Function) {
  router()
    .post("/api/user/register")
    .send({
      name: "Test User",
      email: "testuserfortodo@gmail.com",
      password: "PasswordForUser",
    })
    .end((error, response) => {
      if (error) {
        return callback(error);
      }

      router()
        .post("/api/user/login")
        .send({
          email: "testuserfortodo@gmail.com",
          password: "PasswordForUser",
        })
        .end((error, response) => {
          if (error) {
            return callback(error);
          }

          const token = response.body.message.token;
          callback(null, token);
        });
    });
}

describe("Todo Test Cases", () => {

  let token="";
  let createdTodo = {};

  before(function (done) {
    registerAndLoginUser((error: any, retrievedToken: string) => {
      if (error) {
        return done(error);
      }
      token = retrievedToken;
      done();
    });
  });

  after(function (done) {
    router()
      .delete("/api/user/delete")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        done();
      });
  });

  it("Should not be able to add todo without login token", (done) => {
    router()
      .post("/api/todo/add")
      .send({
        title: "TodoTest1",
        description: "This is todo for testing",
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object").that.has.property("status", false);
        done(error);
      });
  });

  it("Should not be able to get Todos without login Token", (done) => {
    router()
      .get("/api/todo/todos")
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status", false);
        done(error);
      });
  });

  it("Should be able to add new todo", (done) => {
    router()
      .post("/api/todo/add")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TestTodo",
        description: "This is todo created in testing."
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        expect(response.body).to.have.property("message").that.is.an("object");
        createdTodo=response.body.message;
        done(error);
      });
  });

  it("Should be able to update todo", (done) => {
    router()
      .patch("/api/todo/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: (createdTodo as any)._id,
        title: "Testing todo - updated",
        description: "This is updated todo created in testing.",
        completed: false,
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should be able to mark todo as completed", (done) => {
    router()
      .patch("/api/todo/complete")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: (createdTodo as any)._id
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should be able to mark todo as unCompleted", (done) => {
    router()
      .patch("/api/todo/unComplete")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: (createdTodo as any)._id
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should be able to get All todos", (done) => {
    router()
      .get("/api/todo/todos")
      .set("Authorization", `Bearer ${token}`)
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  it("Should be able to delete todo", (done) => {
    router()
      .delete("/api/todo/delete")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: (createdTodo as any)._id,
      })
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

});



