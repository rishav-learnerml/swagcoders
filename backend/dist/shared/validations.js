"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(4),
    lastName: zod_1.default.string().optional(),
    emailId: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    age: zod_1.default.number().int().min(18).optional(),
    gender: zod_1.default.enum(["male", "female", "other"]).optional(),
    photoUrl: zod_1.default.string(),
    skills: zod_1.default.array(zod_1.default.string()),
    about: zod_1.default.string().min(6),
});
exports.userUpdateSchema = zod_1.default
    .object({
    firstName: zod_1.default.string().min(4),
    lastName: zod_1.default.string().optional(),
    password: zod_1.default.string().min(6),
    photoUrl: zod_1.default.string(),
    about: zod_1.default.string().min(6),
    skills: zod_1.default.array(zod_1.default.string()).max(6).describe("At max 6 skills allowed!"),
})
    .partial()
    .strict({ message: "Invalid Fields!" });
