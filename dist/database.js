"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, HOST = _a.HOST, DB = _a.DB, DB_TEST = _a.DB_TEST, USER = _a.USER, PASSWORD = _a.PASSWORD, NODE_ENV = _a.NODE_ENV;
var client;
if (NODE_ENV === "test") {
    client = new pg_1.Pool({
        host: HOST,
        database: DB_TEST,
        user: USER,
        password: PASSWORD
    });
}
else {
    client = new pg_1.Pool({
        host: HOST,
        database: DB,
        user: USER,
        password: PASSWORD
    });
}
exports["default"] = client;
