import { Order, OrderStore } from "../order";
import { ProductStore } from "../product";
import { UserStore } from "../user";

const store = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
describe("Order Model", () => {
  let userAddedOrdedId: number;
  let productInOrderId: number;
  beforeAll(async () => {
    const user = await userStore.create({
      firstName: "userFor",
      lastName: "creating order",
      password: "test",
    });
    userAddedOrdedId = user.id as number;
    const product = await productStore.create({
      name: "Dummy product",
      price: 22,
    });
    productInOrderId = product.id as number;
    await store.create({
      product_id: product.id as number,
      quantity: 10,
      user_id: user.id as number,
      status: "active",
    });
  });
  it("Shoud have index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Shoud have create method", () => {
    expect(store.create).toBeDefined();
  });

  it("index method return list of orders", async () => {
    const result = await store.index(userAddedOrdedId);

    expect(result.length).toBeGreaterThan(0);
  });

  it("create method should add a order", async () => {
    const result = await store.create({
      product_id: productInOrderId,
      quantity: 10,
      user_id: userAddedOrdedId,
      status: "active",
    });

    expect(result.status).toEqual("active");
    expect(result.product_id).toEqual(productInOrderId);
    expect(result.quantity).toEqual(10);
  });
});
