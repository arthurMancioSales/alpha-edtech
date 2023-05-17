const { createError } = require("../errors");
const orderItemsRepo = require("../repositories/orderItems");
const ordersRepo = require("../repositories/orders");
const productsRepo = require("../repositories/products");
const discountCodeRepo = require("../repositories/discountCodes");
const applicableCategoriesRepo = require("../repositories/applicableCategories");
const orderDiscountsRepo = require("../repositories/orderDiscounts");

/**
 * @param {number} order_id - id of the order
 * @param {number} user_id - id of the user who is requesting the order items
 */
async function getOrderItemsByOrderId(order_id, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  return orderItemsRepo.getOrderItemsByOrderId(order_id);
}

/**
 * @param {number} order_id - id of the order
 * @param {number} product_id - id of the product to be updated inside the order
 * @param {number} quantity - the new quantity of the product inside the order
 * @param {number} user_id - id of the user who is requesting the update
 */
async function updateOrderItem(order_id, product_id, quantity, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  const product = await productsRepo.getProductById(product_id);

  if (product === null) {
    throw createError("NotFoundError", `Product ${product_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  const orderItems = await orderItemsRepo.getOrderItemsByOrderId(order_id);

  const productInOrder = orderItems.find(
    (orderItem) => orderItem.product_id === product_id
  );

  if (productInOrder === undefined) {
    throw createError(
      "NotFoundError",
      `Product ${product_id} was not found in order ${order_id}`
    );
  }

  await orderItemsRepo.updateOrderItem(order_id, product_id, quantity);
}

/**
 * @param {number} order_id - id of the order
 * @param {number} user_id - id of the user who is requesting to add the discount code
 * @returns {Promise<DiscountCode[]>}
 */
async function getOrderDiscountCodesByOrderId(order_id, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  const discountCodes = await orderDiscountsRepo.getOrderDiscountCodesByOrderId(
    order_id
  );

  return discountCodes;
}

/**
 * @param {number} order_id - id of the order
 * @param {string} code - the code of the discount code
 * @param {number} user_id - id of the user who is requesting to add the discount code
 * @returns {Promise<void>}
 */
async function addOrderDiscountCodeToOrderByCode(order_id, code, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  if (order.confirmed) {
    throw createError("ForbiddenError", `Order ${order_id} is closed`);
  }

  const existingCode = await discountCodeRepo.getDiscountCodeByCode(code);

  if (!existingCode) {
    throw createError("NotFoundError", `Code "${code}" does not exists`);
  }

  if (new Date(existingCode.expiration_date) <= new Date()) {
    throw createError(
      "ForbiddenError",
      `Code "${existingCode.code}" is expired`
    );
  }

  const orderItems =
    await orderItemsRepo.getOrderItemsWithProductInformationByOrderId(order_id);

  let orderTotalPrice = 0;

  orderItems.forEach((item) => {
    orderTotalPrice += item.product_price;
  });

  if (
    existingCode.minimum_order_value &&
    orderTotalPrice < existingCode.minimum_order_value
  ) {
    throw createError(
      "ForbiddenError",
      `Order's total price is lesser than code's minimun order price`
    );
  }

  const validCategories =
    await applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId(
      existingCode.id
    );
  const validCategoriesId = validCategories.map((category) => category.id);

  const orderItemsCategories = orderItems.map(
    (items) => items.product_category_id
  );

  const orderHasValidCategory = validCategoriesId.some((item) =>
    orderItemsCategories.includes(item)
  );

  if (!orderHasValidCategory && validCategoriesId.length > 0) {
    throw createError(
      "ForbiddenError",
      `Order does not include any of code's valid categories`
    );
  }

  const usedCodes = await orderDiscountsRepo.getOrderDiscountCodesByOrderId(
    order.id
  );

  if (usedCodes.length > 0) {
    throw createError("ForbiddenError", `Code ${code} was already used`);
  }

  await orderDiscountsRepo.addDiscountCodeToOrder(order_id, existingCode.id);
}

module.exports = {
  getOrderItemsByOrderId,
  getOrderDiscountCodesByOrderId,
  updateOrderItem,
  addOrderDiscountCodeToOrderByCode,
};
