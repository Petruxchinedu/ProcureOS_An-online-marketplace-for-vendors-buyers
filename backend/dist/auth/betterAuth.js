"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_js_1 = require("../modules/users/user.model.js");
exports.auth = (0, better_auth_1.betterAuth)({
    providers: {
        credentials: {
            authorize: async (credentials) => {
                const { email, password } = credentials;
                const user = await user_model_js_1.UserModel.findOne({ email })
                    .select("+passwordHash")
                    .lean();
                if (!user)
                    throw new Error("Invalid credentials");
                const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
                if (!isValid)
                    throw new Error("Invalid credentials");
                if (!user.isEmailVerified) {
                    throw new Error("Please verify your email before logging in");
                }
                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                    organizationId: user.organizationId.toString(),
                };
            },
        },
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ token, user }) {
            if (user) {
                token.userId = user.id;
                token.role = user.role;
                token.organizationId = user.organizationId;
            }
            return token;
        },
    },
});
