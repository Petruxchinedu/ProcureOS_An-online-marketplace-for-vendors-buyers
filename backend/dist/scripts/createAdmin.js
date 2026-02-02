const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const createAdminUser = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI not found!");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const { UserModel } = await import("../modules/users/user.model.js");
    const { OrganizationModel } = await import("../modules/organizations/organization.model.js");
    const bcrypt = await import("bcryptjs");

    // Check if admin already exists
    const existingAdmin = await UserModel.findOne({ role: "ADMIN" });
    if (existingAdmin) {
      console.log("⚠️  Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin organization
    const adminOrg = await OrganizationModel.create({
      name: "ProcureOS Administration",
      type: "ADMIN"
    });

    // Create admin user
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    
    const admin = await UserModel.create({
      email: "admin@procureos.com",
      passwordHash: hashedPassword,
      role: "ADMIN",
      organizationId: adminOrg._id,
      isEmailVerified: true,
      isActive: true
    });

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 ADMIN USER CREATED!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Email: admin@procureos.com");
    console.log("Password: Admin@123");
    console.log("User ID:", admin._id.toString());
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    console.log("⚠️  IMPORTANT: Change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createAdminUser();