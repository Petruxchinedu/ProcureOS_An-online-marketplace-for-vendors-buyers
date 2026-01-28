import mongoose from "mongoose";
import RFQ from "../modules/rfq/rfq.model.js";
import Product from "../modules/products/product.model.js";
import { UserModel } from "../modules/users/user.model.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix dotenv path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const seedTestData = async () => {
  try {
    // Check if MONGO_URI exists
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI not found in environment variables!");
      console.log("Available env vars:", Object.keys(process.env).filter(k => k.includes('MONGO')));
      process.exit(1);
    }

    // Connect to MongoDB
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // ... rest of the script stays the same

    // 1. Find a vendor user
    const vendor = await UserModel.findOne({ role: "VENDOR" });
    if (!vendor) {
      console.error("❌ No vendor found! Create a vendor user first.");
      process.exit(1);
    }
    console.log("✅ Found Vendor:", vendor._id, "-", vendor.email);

    // 2. Find or create a product for this vendor
    let product = await Product.findOne({ vendorId: vendor._id });
    
    if (!product) {
      console.log("📦 Creating test product...");
      product = await Product.create({
        name: "Industrial Steel Beams",
        description: "High-grade structural steel for construction",
        pricePerUnit: 150,
        minimumOrderQuantity: 50,
        category: "Construction Materials",
        images: ["https://via.placeholder.com/400"],
        vendorId: vendor._id,
        vendorOrganizationId: vendor.organizationId
      });
      console.log("✅ Created Product:", product._id, "-", product.name);
    } else {
      console.log("✅ Found Product:", product._id, "-", product.name);
    }

    // 3. Find or create a buyer user
    let buyer = await UserModel.findOne({ role: "BUYER" });
    
    if (!buyer) {
      console.log("🛒 Creating test buyer...");
      const bcrypt = await import("bcrypt");
      const hashedPassword = await bcrypt.hash("testpassword123", 10);
      
      // First create an organization for the buyer
      const { OrganizationModel } = await import("../modules/organizations/organization.model.js");
      const buyerOrg = await OrganizationModel.create({
        name: "Test Buyer Corporation",
        type: "BUYER"
      });

      buyer = await UserModel.create({
        email: "testbuyer@example.com",
        passwordHash: hashedPassword,
        role: "BUYER",
        organizationId: buyerOrg._id,
        isEmailVerified: true
      });
      console.log("✅ Created Buyer:", buyer._id, "-", buyer.email);
    } else {
      console.log("✅ Found Buyer:", buyer._id, "-", buyer.email);
    }

    // 4. Check if test RFQ already exists
    const existingRFQ = await RFQ.findOne({
      productId: product._id,
      buyerId: buyer._id,
      vendorId: vendor._id
    });

    if (existingRFQ) {
      console.log("⚠️  Test RFQ already exists:", existingRFQ._id);
      console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📋 EXISTING TEST DATA:");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("RFQ ID:", existingRFQ._id);
      console.log("Vendor ID:", vendor._id);
      console.log("Buyer ID:", buyer._id);
      console.log("Product ID:", product._id);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    } else {
      // 5. Create test RFQ
      const testRFQ = await RFQ.create({
        productId: product._id,
        buyerId: buyer._id,
        vendorId: vendor._id,
        quantity: 100,
        targetUnitPrice: 150,
        message: "🧪 Test RFQ - Need 100 units for construction project. Urgent delivery required.",
        status: "PENDING"
      });

      console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🎉 TEST RFQ CREATED SUCCESSFULLY!");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("RFQ ID:", testRFQ._id);
      console.log("Vendor ID:", vendor._id);
      console.log("Buyer ID:", buyer._id);
      console.log("Product:", product.name);
      console.log("Quantity:", testRFQ.quantity);
      console.log("Unit Price:", testRFQ.targetUnitPrice);
      console.log("Total Value: $" + (testRFQ.quantity * testRFQ.targetUnitPrice));
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    }

    // 6. Verify the RFQ can be queried
    console.log("🔍 Verifying RFQ query...");
    const foundRFQs = await RFQ.find({ vendorId: vendor._id })
      .populate("productId")
      .populate("buyerId");
    
    console.log(`✅ Query successful! Found ${foundRFQs.length} RFQ(s) for this vendor`);
    
    if (foundRFQs.length > 0) {
      console.log("\n📦 Sample RFQ:");
      console.log(JSON.stringify(foundRFQs[0], null, 2));
    }

    console.log("\n✅ Seed complete! You can now test the vendor inbox.");
    console.log("\n🔐 LOGIN CREDENTIALS:");
    console.log("Vendor Email:", vendor.email);
    console.log("Buyer Email:", buyer.email);
    console.log("Password: (use your actual password or 'testpassword123' if created by script)");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  }
};

seedTestData();