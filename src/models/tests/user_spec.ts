import { User, UserStore } from "../user";

const store = new UserStore();

describe("User Model", () => {
  let userToBeDeletedId: number | undefined;
  let userToBeShown: number | undefined;

  beforeAll(async () => {
    const resultForDelete = await store.create({
      firstName: "forTestingDelete",
      lastName: "test",
      password: "test",
    });
    const resultForShow = await store.create({
      firstName: "forTestingShow",
      lastName: "test",
      password: "test",
    });
    userToBeDeletedId = resultForDelete["id"];
    userToBeShown = resultForShow["id"];
  });
  it("Shoud have index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Shoud have create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await store.create({
      firstName: "forTesting",
      lastName: "test",
      password: "test",
    });

    expect(result.firstName).toEqual("forTesting");
    expect(result.lastName).toEqual("test");
    expect(result.password).not.toEqual("test");
  });

  it("show method should show user with specific id", async () => {
    const result = await store.show(userToBeShown as unknown as string);

    expect(result.firstName).toEqual("forTestingShow");
    expect(result.lastName).toEqual("test");
    expect(result.password).not.toEqual("test");
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();

    expect(result.length).toBeGreaterThan(0);
  });

  it("delete method should delete user", async () => {
    const result = await store.delete(userToBeDeletedId as number);

    expect(result).toBeUndefined();
  });
});
