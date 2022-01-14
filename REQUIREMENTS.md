# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users
* Get all users
```http
  GET /users  [token required]
```
* Show user by id
```http
  GET /users/:id  [token required]
```
* Create user
```http
  POST /users  [token required]
```
* Authenticate user using user data
```http
  GET /auth 
```
* Seeding for creating user for testing purpose
```http
  POST /users  
```
```http
{
    firstName: "super",
    lastName: "admin",
    password: "super123",
  };
```

### Products
* Get all products 
```http
  GET /products  
```
* Get products by it
```http
  GET /products/:id 
```
* Add products
```http
  POST /products [token required]
```

### Orders
* Get all orders for the authenticated user 
```http
  GET /orders  [token required]
```
* add order
```http
  POST /orders [token required]
```
* Add products to order
```http
  POST /orders/:id/products [token required]
```
## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

| Col   | Type               |
|-------|--------------------|
| id    | SERIAL PRIMARY KEY |
| name  | VARCHAR            |
| price | FLOAT              |

```sql
TABLE products ( id SERIAL PRIMARY KEY,
name VARCHAR,
price FLOAT);
```

#### User

- id
- firstName
- lastName
- password

| Col       | Type               |
|-----------|--------------------|
| id        | SERIAL PRIMARY KEY |
| firstName | VARCHAR(50)        |
| lastName  | VARCHAR(50)        |
| password  | VARCHAR            |

```sql
TABLE users ( id SERIAL PRIMARY  KEY,
"firstName" VARCHAR(50),
"lastName" VARCHAR(50),
password VARCHAR);
```


#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

| Col     | Type                                |
|---------|-------------------------------------|
| id      | SERIAL PRIMARY KEY                  |
| status  | orders_status("active","completed") |
| user_id | bigint REFERENCES users(id)         |


```sql
TYPE orders_status AS ENUM ('active', 'complete');
TABLE orders (
    id SERIAL PRIMARY KEY,
    status orders_status,
    user_id bigint REFERENCES users(id)
);
```
* Orders_Products
```sql
TABLE orders_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```
