const supertest = require("supertest");
const { appReturn } = require("../server");
const { tokenMaker } = require("../utils/tokenMaker");
const { customCreateSecretKey } = require("../utils/customCreateSecretKey");
const User = require("../model/user.model");

const jwt = require("jsonwebtoken");

const app = appReturn();

const newUser = `test${Math.round(Math.random() * 10000)}@example.com`;
const newName = "testName";
const newOwner = `test_owner${Math.round(Math.random() * 10000)}@example.com`;

const userToken = () => {
  const secretKey = customCreateSecretKey();
  const token = jwt.sign(
    {
      email: newUser,
      name: newName,
      identifier: "login",
    },
    secretKey
  );
  console.log({ token });
  return token;
};

const ownerToken = () => {
  const secretKey = customCreateSecretKey();
  const token = jwt.sign(
    {
      email: newOwner,
      name: newName,
      identifier: "login",
    },
    secretKey
  );
  return token;
};

var cafeId = null;
var coffeeOrderId = null;
const urlOwner = "/api/owner";
const urlCafe = "/api/cafe";
const urlCoffeeOrder = `/api/cafe/${cafeId}/coffee-order`;
const urlUser = "/api/user";

const productId = `63c6763b99a711dbb967b5ae`;
describe("api", () => {
  describe("Owner", async () => {
    it("should create a new owner", (done) => {
      supertest(app)
        .post(`${urlOwner}/auth/register`)
        .send({
          name: newName,
          email: newOwner,
          contact: 9808900890,
          password: "12345678",
        })
        .expect("Content-Type", /json/)
        .expect(200, done);
    });

    it("should login owner", (done) => {
      supertest(app)
        .post(`${urlOwner}/auth/login`)
        .send({
          email: newOwner,
          password: "12345678",
        })
        .expect("Content-Type", /json/)
        .expect(200, done);
    });

    it("should get all owner", (done) => {
      supertest(app)
        .get(`${urlOwner}`)
        .set("Cookie", `access_token=${ownerToken()}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });

    it("should logout owner", (done) => {
      supertest(app)
        .post(`${urlOwner}/auth/logout`)
        .set("Cookie", `access_token=${ownerToken()}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("User", async () => {
    it("should create a new User", (done) => {
      supertest(app)
        .post(`${urlUser}/auth/register`)
        .send({
          name: "test user",
          email: `${newUser}`,
          contact: 9808900890,
          password: "12345678",
          address: "kathmandu",
        })
        .expect("Content-Type", /json/)
        .expect(200, done);
    });

    it("should login user", (done) => {
      supertest(app)
        .post(`${urlUser}/auth/login`)
        .send({
          email: newUser,
          password: "12345678",
        })
        .expect("Content-Type", /json/)
        .expect(200, done);
    });

    it("should get all user", (done) => {
      supertest(app)
        .get(`${urlUser}`)
        .set("Cookie", `access_token=${ownerToken()}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });

    it("should logout user", (done) => {
      supertest(app)
        .post(`${urlUser}/auth/logout`)
        .set("Cookie", `access_token=${userToken()}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("Cafe", async () => {
    it("should create a new Cafe", (done) => {
      supertest(app)
        .post(`${urlCafe}`)
        .set("Cookie", `access_token=${ownerToken()}`)
        .send({
          name: "Test Cafe",
          contact: 9899899989,
          location: "kathmandu",
          available: true,
        })
        .expect("Content-Type", /json/)
        .end((err, res) => {
          console.log(res._body.data);
          cafeId = res._body.data?._id;

          done();
        });
    });

    it("should get all cafe", (done) => {
      supertest(app)
        .get(`${urlCafe}`)
        .set("Cookie", `access_token=${userToken()}`)
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });

  describe("CoffeeOrder", async () => {
    it("User can post for a new coffee order", (done) => {
      supertest(app)
        .post(`${urlCafe}/${cafeId}/coffee-order`)
        .set("Cookie", `access_token=${userToken()}`)
        .send({
          quantity: 1,
          typeOfCoffee: "latte",
          extraRequest: "none",
          extraSugar: "yes",
        })
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if(err) throw err
          console.log(res._body);
          coffeeOrderId = res._body?.data?._id;
          done();
        });
    });

    it("should get all user's coffeeOrder", (done) => {
      supertest(app)
        .get(`${urlCafe}/${cafeId}/coffee-order`)
        .set("Cookie", `access_token=${userToken()}`)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if(err) throw err
          done();
        });
    });

    it("Owner can change status of coffeeOrder", (done) => {
      supertest(app)
        .patch(`${urlCafe}/${cafeId}/coffee-order/${coffeeOrderId}`)
        .set("Cookie", `access_token=${ownerToken()}`)
        .send({
          orderStatus: "completed", // ontheway,failed,completed,pending
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          console.log(res._body);
          done();
        });
    });

    it("Fetch CoffeOrder", (done) => {
      supertest(app)
        .get(`${urlCafe}/${cafeId}/coffee-order/${coffeeOrderId}`)
        .set("Cookie", `access_token=${ownerToken()}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          console.log(res._body);
          done();
        });
    });

  });
});
