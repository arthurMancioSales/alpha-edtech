jest.mock("../../src/repositories/orders");
jest.mock("../../src/repositories/discountCodes");
jest.mock("../../src/repositories/orderItems");
jest.mock("../../src/repositories/applicableCategories");
jest.mock("../../src/repositories/orderDiscounts");

const ordersService = require("../../src/services/orders");
const ordersRepo = require("../../src/repositories/orders");
const discountCodeRepo = require("../../src/repositories/discountCodes");
const orderItemsRepo = require("../../src/repositories/orderItems");
const applicableCategoriesRepo = require("../../src/repositories/applicableCategories");
const orderDiscountsRepo = require("../../src/repositories/orderDiscounts");

beforeEach(async () => {
  jest.resetAllMocks();
});

describe("Service addOrderDiscountCodeToOrderByCode", () => {
  it("should return status 404 if order does not exist", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return null;
    });

    await expect(() =>
      ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
    ).rejects.toMatchObject({
      message: `Order ${order_id} was not found`,
      name: "NotFoundError",
    });
  });

  it("should return status 403 if user is not owner of the order", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return { id: 1, confirmed: false, created_at: "10/10/2023", user_id: 2 };
    });

    await expect(() =>
      ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
    ).rejects.toMatchObject({
      message: `User ${user_id} does not have access to order ${order_id}`,
      name: "ForbiddenError",
    });
  });

  it("should return status 403 if order is already closed", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return { id: 1, confirmed: true, created_at: "10/10/2023", user_id: 1 };
    });

    await expect(() =>
      ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
    ).rejects.toMatchObject({
      message: `Order ${order_id} is closed`,
      name: "ForbiddenError",
    });
  });

  it("should return status 404 if code does not exists", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return { id: 1, confirmed: false, created_at: "10/10/2023", user_id: 1 };
    });

    await expect(() =>
      ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
    ).rejects.toMatchObject({
      message: `Code "${code}" does not exists`,
      name: "NotFoundError",
    });
  });

  it("should return status 403 if code is expired", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return { id: 1, confirmed: false, created_at: "10/10/2023", user_id: 1 };
    });

    jest
      .mocked(discountCodeRepo.getDiscountCodeByCode)
      .mockImplementation(async () => {
        return {
          id: 1,
          code: "TOENTENDENDONADA",
          expiration_date: "01/01/2023",
          minimum_order_value: null,
          value: 10,
          type: "absolute",
        };
      });

    await expect(() =>
      ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
    ).rejects.toMatchObject({
      message: `Code "${code}" is expired`,
      name: "ForbiddenError",
    });
  });

  it("should return status 403 if order's total price is lesser than code's minimun order price", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return { id: 1, confirmed: false, created_at: "10/10/2023", user_id: 1 };
    });

    jest
      .mocked(discountCodeRepo.getDiscountCodeByCode)
      .mockImplementation(async () => {
        return {
          id: 1,
          code: "TOENTENDENDONADA",
          expiration_date: "10/10/2023",
          minimum_order_value: 100,
          value: 10,
          type: "absolute",
        };
      });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockImplementation(async () => {
        return [];
      });

    await expect(() =>
      ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
    ).rejects.toMatchObject({
      message: `Order's total price is lesser than code's minimun order price`,
      name: "ForbiddenError",
    });
  });

  it("should return status 403 if code is not eligible for current order", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return { id: 1, confirmed: false, created_at: "10/10/2023", user_id: 1 };
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockImplementation(async () => {
        return [
          {
            order_id: 1,
            product_category_id: 2,
            product_id: 1,
            product_name: "arroz",
            product_price: 10,
            quantity: 1,
          },
        ];
      });

    jest
      .mocked(discountCodeRepo.getDiscountCodeByCode)
      .mockImplementation(async () => {
        return {
          id: 1,
          code: "TOENTENDENDONADA",
          expiration_date: "10/10/2023",
          minimum_order_value: null,
          value: 10,
          type: "absolute",
        };
      });

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockImplementation(async () => {
        return [{ id: 1, name: "doces" }];
      });

    await expect(() =>
      ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
    ).rejects.toMatchObject({
      message: `Order does not include any of code's valid categories`,
      name: "ForbiddenError",
    });
  });

  it("should return status 403 if code was already used", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return { id: 1, confirmed: false, created_at: "10/10/2023", user_id: 1 };
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockImplementation(async () => {
        return [
          {
            order_id: 1,
            product_category_id: 2,
            product_id: 1,
            product_name: "arroz",
            product_price: 10,
            quantity: 1,
          },
        ];
      });

    jest
      .mocked(discountCodeRepo.getDiscountCodeByCode)
      .mockImplementation(async () => {
        return {
          id: 1,
          code: "TOENTENDENDONADA",
          expiration_date: "10/10/2023",
          minimum_order_value: null,
          value: 10,
          type: "absolute",
        };
      });

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockImplementation(async () => {
        return [];
      });

    jest
      .mocked(orderDiscountsRepo.getOrderDiscountCodesByOrderId)
      .mockImplementation(async () => {
        return [
          {
            id: 1,
            code: "TOENTENDENDONADA",
            expiration_date: "10/10/2023",
            minimum_order_value: null,
            value: 10,
            type: "absolute",
          },
        ];
      });

    await expect(() =>
      ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
    ).rejects.toMatchObject({
      message: `Code ${code} was already used`,
      name: "ForbiddenError",
    });
  });

  it("should apply the discount if a valid code is used", async () => {
    const user_id = 1;
    const order_id = 100;
    const code = "TOENTENDENDONADA";

    jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
      return { id: 1, confirmed: false, created_at: "10/10/2023", user_id: 1 };
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockImplementation(async () => {
        return [
          {
            order_id: 1,
            product_category_id: 2,
            product_id: 1,
            product_name: "arroz",
            product_price: 10,
            quantity: 1,
          },
        ];
      });

    jest
      .mocked(discountCodeRepo.getDiscountCodeByCode)
      .mockImplementation(async () => {
        return {
          id: 1,
          code: "TOENTENDENDONADA",
          expiration_date: "10/10/2023",
          minimum_order_value: null,
          value: 10,
          type: "absolute",
        };
      });

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockImplementation(async () => {
        return [];
      });

    jest
      .mocked(orderDiscountsRepo.getOrderDiscountCodesByOrderId)
      .mockImplementation(async () => {
        return [];
      });

	await ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)

    expect(jest.mocked(orderDiscountsRepo.addDiscountCodeToOrder)).toBeCalledTimes(1)
  });
});
