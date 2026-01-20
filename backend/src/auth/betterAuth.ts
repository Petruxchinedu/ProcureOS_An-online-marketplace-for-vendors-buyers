import { betterAuth } from "better-auth";
import bcrypt from "bcryptjs";
import { UserModel } from "../modules/users/user.model.js";

export const auth = betterAuth({
  providers: {
    credentials: {
      authorize: async (credentials: any) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await UserModel.findOne({ email })
          .select("+passwordHash")
          .lean();

        if (!user) throw new Error("Invalid credentials");

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) throw new Error("Invalid credentials");

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
    async session({ token, user }: { token: any; user: any }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.organizationId = user.organizationId;
      }
      return token;
    },
  },
} as any);
