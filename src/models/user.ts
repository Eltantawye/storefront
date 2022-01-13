import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("ERR" + error);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`);
    }
  }
  async authenticate(user: User): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE firstName=($1) AND lastName=($2)";
      // @ts-ignore
      const { BCRYPT_PASSWORD: pepper } = process.env;

      const conn = await client.connect();

      const result = await conn.query(sql, [user.firstName, user.lastName]);

      const getUser = result.rows[0];
      const crt = bcrypt.compareSync(user.password + pepper, getUser.password);

      conn.release();

      return crt ? getUser : null;
    } catch (err) {
      throw new Error(`Could not add user $. Error: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users ("firstName","lastName", password) VALUES($1, $2,$3) RETURNING *';
      // @ts-ignore
      const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash,
      ]);

      const getUser = result.rows[0];

      conn.release();

      return getUser;
    } catch (err) {
      throw new Error(`Could not add user $. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      throw new Error("err" + error);
    }
  }
}
