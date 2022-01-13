CREATE TYPE orders_status AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status orders_status,
    user_id bigint REFERENCES users(id)
);

