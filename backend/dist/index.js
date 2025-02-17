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
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        // Still have to do input validation
        try {
            yield prisma.user.create({
                data: {
                    username: username,
                    password: password
                }
            });
        }
        catch (e) {
            res.status(404).send({
                msg: e
            });
        }
        res.status(200).send({
            msg: "You've been signed up!"
        });
    });
});
app.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const user = yield prisma.user.findUnique({
            where: {
                username,
                password
            }
        });
        if (user !== null) {
            const token = jsonwebtoken_1.default.sign({
                userId: user.id.toString
            }, process.env.JWT_SECRET);
            res.json({
                token: token
            });
        }
        else {
            res.json({
                msg: "Invalid credentials"
            });
        }
    });
});
app.post("/updateInfo", function (req, res) {
});
app.listen(3000);
