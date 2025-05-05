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
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, phone, password } = req.body;
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({
            username,
            email,
            phone,
            password: hashedPassword
        });
        yield user.save();
        res.status(201).json({
            message: 'User registered successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal server error", err: err.message
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Invalid credentials",
            });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: "invalid credentials"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });
        res.status(200).json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.loginUser = loginUser;
