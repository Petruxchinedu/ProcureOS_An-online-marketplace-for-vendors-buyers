"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load env vars specifically for this module
dotenv_1.default.config();
const sendEmail = async ({ to, subject, html, }) => {
    // We create the transporter INSIDE the function to ensure 
    // env variables are fully loaded when called.
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    console.log("Attempting email to:", to);
    console.log("Using User:", process.env.SMTP_USER ? "DEFINED" : "UNDEFINED");
    await transporter.sendMail({
        from: `"BulkBuy" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });
};
exports.sendEmail = sendEmail;
