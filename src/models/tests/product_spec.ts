import { ProductStore } from "../product";

const store = new ProductStore();
describe("Product Model", () => {
  let productToBeShownId: number;
  beforeAll(async () => {
    const product = await store.create({
      name: "Testing Product",
      price: 10,
    });
    productToBeShownId = product.id as number;
  });
  it("Shoud have index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Shoud have show method", () => {
    expect(store.show).toBeDefined();
  });

  it("show method should show product with specific id", async () => {
    const result = await store.show(productToBeShownId as unknown as string);

    expect(result.name).toEqual("Testing Product");
    expect(result.price).toEqual(10);
  });

  it("index method return list of products", async () => {
    const result = await store.index();

    expect(result.length).toBeGreaterThan(0);
  });

  it("Shoud have create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      name: "dummy product",
      price: 50,
    });

    expect(result.name).toEqual("dummy product");
    expect(result.price).toEqual(50);
  });
});
