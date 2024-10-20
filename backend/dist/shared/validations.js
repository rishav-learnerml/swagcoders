"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionRequestSchema = exports.userLoginSchema = exports.userUpdateSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// Full user schema
exports.userSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(4),
    lastName: zod_1.default.string().optional(),
    emailId: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    age: zod_1.default.number().int().min(18).optional(),
    gender: zod_1.default.enum(["male", "female", "other"]).optional(),
    photoUrl: zod_1.default.string().url().optional(),
    skills: zod_1.default.array(zod_1.default.string()).optional(),
    about: zod_1.default.string().min(6).optional(),
});
// Schema for updating the user
exports.userUpdateSchema = zod_1.default
    .object({
    firstName: zod_1.default.string().min(4).optional(), // Optional for updates
    lastName: zod_1.default.string().optional(),
    password: zod_1.default.string().min(6).optional(), // Optional for updates
    photoUrl: zod_1.default.string().optional(),
    about: zod_1.default.string().min(6).optional(),
    gender: zod_1.default.enum(["male", "female", "others"]).optional(),
    age: zod_1.default.number().min(18).optional(),
    skills: zod_1.default
        .array(zod_1.default.string())
        .max(6)
        .describe("At max 6 skills allowed!")
        .optional(),
})
    .strict(); // Ensures only defined fields can be updated
exports.userLoginSchema = zod_1.default.object({
    emailId: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.connectionRequestSchema = zod_1.default.object({
    fromUser: zod_1.default.string().optional(),
    toUser: zod_1.default.string().optional(),
    status: zod_1.default.enum(["ignored", "interested"]),
});
