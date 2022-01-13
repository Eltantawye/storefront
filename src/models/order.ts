import client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(userId: number): Promise<Order[]> {
    try {
      const conn = await client.connect();

      const sql =
        "SELECT * FROM orders INNER JOIN orders_products ON orders.id = orders_products.order_id WHERE user_id=($1)";
      const result = await conn.query(sql, [userId]);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("Could not return orders" + error);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id,status) VALUES($1, $2) RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [order.user_id, order.status]);

      const getOrder = result.rows[0];

      conn.release();

      return getOrder;
    } catch (err) {
      throw new Error(`Could not add order $. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";

      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
