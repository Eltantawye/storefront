import supertest from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
const request = supertest(app);

describe("Test users endpoint", () => {
  let token: string;
  beforeAll(async () => {
    const req = await request.get("/seed");
    token = req.body;
  });
  it("response status should be 401 if token is not valid", async () => {
    const req = await request.get("/users");
    expect(req.status).toBe(401);
  });
  it("response status should be 200 if token  valid", async () => {
    let header = { authorization: `Bearer ${token}` };

    const req = await request.get("/users").set(header);

    expect(req.status).toBe(200);
  });
  it("add user successfully", async () => {
    let header = { authorization: `Bearer ${token}` };

    const req = await request
      .post("/users")
      .send({
        firstName: "test",
        lastName: "test",
        password: "test",
      })
      .set(header);
    expect(req.status).toBe(200);
  });
});

describe("Test orders endpoint", () => {
  let token: string;
  let userId: number;
  let productId: number;
  beforeAll(async () => {
    const req = await request.get("/seed");
    token = req.body;
    const decodedToken = jwt.decode(req.body) as { user: { id: number } };
    userId = decodedToken.user.id;
    //create product for adding it to order;
    const productReq = await request
      .post("/products")
      .send({
        name: "dummy product",
        price: 20,
      })
      .set({ authorization: `Bearer ${req.body}` });
    productId = productReq.body.id;
  });

  it("should add order successfully", async () => {
    let header = { authorization: `Bearer ${token}` };

    const order = await request
      .post("/orders")
      .send({
        product_id: productId,
        quantity: 5,
        user_id: userId,
        status: "active",
      })
      .set(header);

    expect(order.status).toEqual(200);
  });

  it("should not add order if data not valid", async () => {
    let header = { authorization: `Bearer ${token}` };

    const order = await request
      .post("/orders")
      .send({
        product_id: "not vaild id",
        quantity: 5,
        user_id: userId,
        status: "active",
      })
      .set(header);

    expect(order.status).toEqual(400);
  });

  it("should get all orders of authenticated user", async () => {
    let header = { authorization: `Bearer ${token}` };

    const order = await request
      .get("/orders")

      .set(header);

    expect(order.status).toEqual(200);
  });
});

describe("Test product endpoint", () => {
  let token: string;
  beforeAll(async () => {
    const req = await request.get("/seed");
    token = req.body;
  });
  it("response status should be 200 without token", async () => {
    const req = await request.get("/products");
    expect(req.status).toBe(200);
  });

  it("add product successfully", async () => {
    let header = { authorization: `Bearer ${token}` };

    const req = await request
      .post("/products")
      .send({
        name: "dummy product",
        price: 25,
      })
      .set(header);
    expect(req.status).toBe(200);
  });
  it("should not add product if token is not valid", async () => {
    let header = { authorization: `Bearer ${token}+notValidToken` };

    const req = await request
      .post("/products")
      .send({
        name: "dummy product",
        price: 25,
      })
      .set(header);
    expect(req.status).toBe(401);
  });
});