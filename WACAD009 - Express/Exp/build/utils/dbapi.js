"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
exports.post = post;
const axios_1 = __importDefault(require("axios"));
async function get(endpoint) {
    try {
        const response = await axios_1.default.get(`${process.env.DB_URL}/${endpoint}`);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
async function post(endpoint, data) {
    //ou usar um tipo associado a produto
    try {
        const response = await axios_1.default.post(`${process.env.DB_URL}/${endpoint}`, data);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
