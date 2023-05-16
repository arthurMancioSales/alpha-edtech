const supertest = require("supertest");
const { app } = require("../../src/app");
const {
  generateAuthorizationHeaderForUser,
  eraseDatabase,
  createDatabaseFromSchema,
  disconnectDatabase,
} = require("../helpers");
const ordersRepo = require("../../src/repositories/orders");
const usersRepo = require("../../src/repositories/users");
const productsRepo = require("../../src/repositories/products");
const categoriesRepo = require("../../src/repositories/categories");
const orderItemsRepo = require("../../src/repositories/orderItems");
const discountCodesRepo = require("../../src/repositories/discountCodes");
const orderDiscountsRepo = require("../../src/repositories/orderDiscounts");
const applicableCategoriesRepo = require("../../src/repositories/applicableCategories");

const request = supertest(app);

beforeEach(async () => {
  await eraseDatabase();
  await createDatabaseFromSchema();
});

afterAll(async () => {
  await eraseDatabase();
  await disconnectDatabase();
});

describe("GET /orders/:order_id/items", () => {
  it("should return status 401 if user token is missing", async () => {
    const response = await request.get("/orders/1/items");

    expect(response.status).toBe(401);
  });

  it("should return status 401 if user token is invalid", async () => {
    const authorization = "Bearer xxxxx";

    const response = await request
      .get("/orders/1/items")
      .set("authorization", authorization);

    expect(response.status).toBe(401);
  });

  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .get("/orders/x/items")
      .set("authorization", authorization);

    expect(response.status).toBe(400);
  });

  it("should return status 404 if order does not exist", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .get("/orders/999/items")
      .set("authorization", authorization);

    expect(response.status).toBe(404);
  });

  it("should return status 403 if user is not owner of the order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const user2 = await usersRepo.createUser(
      "user2",
      "user2@mail.com",
      "password2"
    );
    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user2.id);

    const response = await request
      .get(`/orders/${order.id}/items`)
      .set("authorization", authorization);

    expect(response.status).toBe(403);
  });

  it("should return the order items and status 200 if user is the owner of the order", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const category2 = await categoriesRepo.createCategory("category2");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );
    const product2 = await productsRepo.createProduct(
      "product2",
      20,
      category2.id
    );
    const order = await ordersRepo.createOrder(user.id, false);
    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
      await orderItemsRepo.createOrderItem(order.id, product2.id, 4),
    ];

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
      .get(`/orders/${order.id}/items`)
      .set("authorization", authorization);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(orderItems);
  });
});

describe("PATCH /orders/:order_id/items/:product_id", () => {
  it("should return status 401 if user token is missing", async () => {
    const response = await request
      .patch("/orders/1/items/1")
      .send({
        quantity: 3
      });

    expect(response.status).toBe(401);
  });

  it("should return status 401 if user token is invalid", async () => {
    const authorization = "abacate";

    const response = await request
      .patch("/orders/1/items/1")
      .set("authorization", authorization)
      .send({
        quantity: 3
      });

    expect(response.status).toBe(401);
  });

  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .patch("/orders/y/items/1")
      .set("authorization", authorization)
      .send({
        quantity: 3
      });

    expect(response.status).toBe(400);
  });

  it("should return status 400 if product_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .patch("/orders/1/items/y")
      .set("authorization", authorization)
      .send({
        quantity: 3
      });

    expect(response.status).toBe(400);
  });

  it("should return status 400 if quantity is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .patch("/orders/1/items/1")
      .set("authorization", authorization)
      .send({
        quantity: -2596
      });

    expect(response.status).toBe(400);
  });

  it("should return status 404 if order does not exist", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .patch("/orders/999/items/1")
      .set("authorization", authorization)
      .send({
        quantity: 3
      });

    expect(response.status).toBe(404);
  });
  
  it("should return status 404 if product does not exist", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .patch("/orders/1/items/999")
      .set("authorization", authorization)
      .send({
        quantity: 3
      });

    expect(response.status).toBe(404);
  });

  it("should return status 403 if user is not owner of the order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const user2 = await usersRepo.createUser(
      "user2",
      "user2@mail.com",
      "password2"
    );
    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user2.id);

    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const response = await request
      .patch(`/orders/${order.id}/items/${product1.id}`)
      .set("authorization", authorization)
      .send({
        quantity: 3
      });
      
    expect(response.status).toBe(403);
  });
  
  it("should return status 404 if product is not on the order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user1.id);

    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const response = await request
      .patch(`/orders/${order.id}/items/${product1.id}`)
      .set("authorization", authorization)
      .send({
        quantity: 3
      });

    expect(response.status).toBe(404);
  });

  it("should return body as {data: null, err: null} and status 200 if user is the owner of the order", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const order = await ordersRepo.createOrder(user.id, false);
    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
    ];

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
      .patch(`/orders/${order.id}/items/${product1.id}`)
      .set("authorization", authorization)
      .send({
        quantity: 6
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({data: null, err: null});
  });
});

describe("POST /orders/:order_id/discount-codes", () => {
  it("should return status 401 if user token is missing", async () => {
    const response = await request
      .post("/orders/1/discount-codes")
      .send({
        code: "25OFF2023EDTECH"
      });

    expect(response.status).toBe(401);
  });

  it("should return status 401 if user token is invalid", async () => {
    const authorization = "abacate";

    const response = await request
      .post("/orders/1/discount-codes")
      .set("authorization", authorization)
      .send({
        code: "25OFF2023EDTECH"
      });

    expect(response.status).toBe(401);
  });

  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .post("/orders/x/discount-codes")
      .set("authorization", authorization)
      .send({
        code: "25OFF2023EDTECH"
      });

    expect(response.status).toBe(400);
  });

  it("should return status 400 if the code is not a string", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .post("/orders/1/discount-codes")
      .set("authorization", authorization)
      .send({
        code: 89
      });

      expect(response.status).toBe(400);
  });

  it("should return status 404 if order does not exist", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .post("/orders/1/discount-codes")
      .set("authorization", authorization)
      .send({
        code: "25OFF2023EDTECH"
      });
  
    expect(response.status).toBe(404);
  });

  it("should return status 403 if user is not owner of the order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const user2 = await usersRepo.createUser(
      "user2",
      "user2@mail.com",
      "password2"
    );
    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user2.id);

    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({
        code: "25OFF2023EDTECH"
      });
    
    expect(response.status).toBe(403);
  });
  
  it("should return status 403 if order is already closed", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );

    const order = await ordersRepo.createOrder(user1.id, true);

    const authorization = generateAuthorizationHeaderForUser(user1.id);

    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({
        code: "25OFF2023EDTECH"
      });
    
    expect(response.status).toBe(403);
  });
  
  it("should return status 404 if code does not exists", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );

    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user1.id);

    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
    ];

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({
        code: "AULAGRANDEDOCÃO"
      });
    
    expect(response.status).toBe(404);
  });
  
  it("should return status 403 if code is expired", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );

    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user1.id);

    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
    ];

    await discountCodesRepo.createDiscountCode("BARBARIDADE", "absolute", 10, '10/01/2023', 1000)

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({
        code: "BARBARIDADE"
      });
    
    expect(response.status).toBe(403);
  });

  it("should return status 403 if order's total price is lesser than code's minimun order price", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );

    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user1.id);

    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
    ];

    await discountCodesRepo.createDiscountCode("SOCORROVITOR", "absolute", 10, '10/10/2023', 1000)

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({
        code: "SOCORROVITOR"
      });
    
    expect(response.status).toBe(403);
  });
  
  it("should return status 403 if code is not eligible for current order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );

    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user1.id);

    const category1 = await categoriesRepo.createCategory("doces");
    const category2 = await categoriesRepo.createCategory("salgados");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
    ];

    const code = await discountCodesRepo.createDiscountCode("TAMALUCO", "absolute", 10, '10/10/2023', 0)

    await applicableCategoriesRepo.addApplicableCategory(code.id, category2.id)

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({
        code: "TAMALUCO"
      });
    
    expect(response.status).toBe(403);
  });
  
  it("should return status 403 if code was already used", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );

    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user1.id);

    const category1 = await categoriesRepo.createCategory("doces");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
    ];

    const code = await discountCodesRepo.createDiscountCode("CEHLOCO", "absolute", 10, '10/10/2023', 0)

    await orderDiscountsRepo.addDiscountCodeToOrder(order.id, code.id)

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({
        code: "CEHLOCO"
      });
    console.log(response.body)
    expect(response.status).toBe(403);
  });

  it("should return body as {data: null, err: null} and status 200 if a valid code is applyed", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const order = await ordersRepo.createOrder(user.id, false);

    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
    ];

    await discountCodesRepo.createDiscountCode("TABOMJANEH", "absolute", 10, '10/10/2023', 0)

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({
        code: "TABOMJANEH"
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({data: null, err: null});
  });
});
