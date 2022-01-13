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
    const addOrder = await store.create({
      user_id: user.id as number,
      status: "active",
    });

    //add product to user order
    await store.addProduct(5, `${addOrder.id}`, `${product.id}`);
  });
  it("Shoud have index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Shoud have create method", () => {
    expect(store.create).toBeDefined();
  });
  it("Shoud have addProduct method", () => {
    expect(store.addProduct).toBeDefined();
  });

  it("index method return list of orders", async () => {
    const result = await store.index(userAddedOrdedId);

    expect(result.length).toBeGreaterThan(0);
  });

  it("create method should add a order", async () => {
    const result = await store.create({
      user_id: userAddedOrdedId,
      status: "active",
    });

    expect(parseInt(result.user_id as unknown as string)).toEqual(
      userAddedOrdedId
    );
    expect(result.status).toEqual("active");
  });
});
