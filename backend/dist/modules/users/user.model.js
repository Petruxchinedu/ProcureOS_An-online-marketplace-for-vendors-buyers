"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user_types_js_1 = require("./user.types.js");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: Object.values(user_types_js_1.UserRole),
        required: true,
    },
    organizationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    // ✅ EMAIL VERIFICATION
    emailVerificationToken: {
        type: String,
        select: false,
    },
    emailVerificationExpires: {
        type: Date,
    },
    // ✅ PASSWORD RESET
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
    },
}, {
    timestamps: true,
});
/* Indexes */
userSchema.index({ organizationId: 1 });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
