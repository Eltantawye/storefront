import client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("ERR" + error);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${id}. Error: ${err}`);
    }
  }
  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name,price) VALUES($1, $2) RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [product.name, product.price]);

      const getProduct = result.rows[0];

      conn.release();

      return getProduct;
    } catch (err) {
      throw new Error(`Could not add user $. Error: ${err}`);
    }
  }
}
