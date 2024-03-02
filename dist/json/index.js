"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setData = exports.readData = exports.FILENAME = void 0;
const promises_1 = require("fs/promises");
exports.FILENAME = 'src/json/data.json';
async function readData() {
    try {
        return JSON.parse(await (0, promises_1.readFile)(exports.FILENAME, { encoding: 'utf-8' }));
    }
    catch (e) {
        console.log(e);
        return [];
    }
}
exports.readData = readData;
async function setData(data) {
    return (0, promises_1.writeFile)(exports.FILENAME, JSON.stringify(data));
}
exports.setData = setData;
