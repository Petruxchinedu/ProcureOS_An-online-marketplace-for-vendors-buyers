import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

if (!env.MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined");
}

if (!env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined");
}
