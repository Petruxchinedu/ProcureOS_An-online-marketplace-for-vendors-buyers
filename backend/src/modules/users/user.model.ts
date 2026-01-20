import { Schema, model, Types } from "mongoose";
import { UserRole } from "./user.types.js";

export interface UserDocument {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  role: UserRole;
  organizationId: Types.ObjectId;

  isEmailVerified: boolean;

  emailVerificationToken?: string;
  emailVerificationExpires?: Date;

  passwordResetToken?: string;
  passwordResetExpires?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
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
      enum: Object.values(UserRole),
      required: true,
    },

    organizationId: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

/* Indexes */
userSchema.index({ organizationId: 1 });

export const UserModel = model<UserDocument>("User", userSchema);
