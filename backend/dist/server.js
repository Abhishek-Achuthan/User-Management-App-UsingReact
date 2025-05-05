"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/auth", authRoute_1.default);
app.get("/", (req, res) => {
    res.send("API is running...");
});
