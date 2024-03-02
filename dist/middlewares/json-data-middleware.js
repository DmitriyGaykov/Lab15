"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonDataMiddleware = void 0;
const json_1 = require("../json");
async function jsonDataMiddleware(req, res, next) {
    req.contacts = await (0, json_1.readData)();
    next();
}
exports.jsonDataMiddleware = jsonDataMiddleware;
