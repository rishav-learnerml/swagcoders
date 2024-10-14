"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    emailId: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    age: zod_1.default.number().int().min(0),
    gender: zod_1.default.enum(["male", "female", "other"]),
});
