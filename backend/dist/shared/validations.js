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
    emailId: zod_1.default.string().email(), // Added validation for a valid email format
    password: zod_1.default.string().min(6), // Added minimum length for password
    age: zod_1.default.number().int().min(0), // Ensures age is a non-negative integer
    gender: zod_1.default.enum(["male", "female", "other"]), // Restricted to specific values
});
