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
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const profile_1 = __importDefault(require("./routes/profile"));
const requests_1 = __importDefault(require("./routes/requests"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const PORT = process.env.DEV_PORT;
//routes
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/profile", profile_1.default);
app.use("/api/v1/requests", requests_1.default);
app.use("/api/v1/user", user_1.default);
//main function
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
