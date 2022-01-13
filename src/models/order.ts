import client from "../database";

export type Order = {
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(userId: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const result = await conn.query(sql, [userId]);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("ERR" + error);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (product_id,quantity,user_id,status) VALUES($1, $2, $3, $4) RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [
        order.product_id,
        order.quantity,
        order.user_id,
        order.status,
      ]);

      const getOrder = result.rows[0];

      conn.release();

      return getOrder;
    } catch (err) {
      throw new Error(`Could not add user $. Error: ${err}`);
    }
  }
}
