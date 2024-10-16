"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const validations_1 = require("../../shared/validations");
const user_1 = require("./models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.DEV_PORT;
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const { success, error } = validations_1.userSchema.safeParse(userData);
    if (!success) {
        res.status(403).json({ message: "Invalid Inputs!", error });
        return;
    }
    try {
        const { password } = userData;
        const hashedPassword = bcryptjs_1.default.hash(password, 10);
        userData.password = hashedPassword;
        const user = new user_1.User(userData);
        yield user.save();
        console.log("Inserted User Succesfully!", res);
        res.json({ message: "Inserted User Succesfully!" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Something went Wrong while saving user!", error });
        return;
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { error, success } = validations_1.userLoginSchema.safeParse(data);
        if (!success) {
            res.status(401).json({ message: "Invalid Inputs!", error });
            return;
        }
        //validate password
        const { emailId, password } = data;
        const user = yield user_1.User.findOne({ emailId });
        if (!user) {
            res
                .status(404)
                .json({ message: "Invalid email or user does not exists!", error });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid password!", error });
            return;
        }
        res.json({ message: "Logged in succesfully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.User.find();
    res.json({ users });
}));
app.delete("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.User.findByIdAndDelete(req.body.id);
        res.json({ message: "User deleted succesfully!" });
        console.log("User deleted succesfully!");
    }
    catch (error) {
        res.status(500).json({ message: "error deleting user!" });
        console.error("error deleting user!");
    }
}));
app.patch("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = req.params.id;
        const { success, error } = validations_1.userUpdateSchema.safeParse(data);
        if (!success) {
            res.status(500).json({ message: "error updated user!", error });
            console.error("error updated user!", error);
            return;
        }
        yield user_1.User.findByIdAndUpdate({ _id: id }, data, { runValidators: true });
        res.json({ message: "User updated succesfully!" });
        console.log("User updated succesfully!");
    }
    catch (error) {
        res.status(500).json({ message: "error updated user!", error });
        console.error("error updated user!");
    }
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectToDb)();
        app.listen(PORT, () => {
            console.log(`server listening at port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Something went wrong!", error);
    }
});
main();
