"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testRouter = express_1.default.Router();
testRouter.post("/data", (req, res) => {
    const { data } = req.body;
    if (!data) {
        res.json("NO DATA OBJECT PRESENT");
    }
    res.json(data);
});
exports.default = testRouter;
