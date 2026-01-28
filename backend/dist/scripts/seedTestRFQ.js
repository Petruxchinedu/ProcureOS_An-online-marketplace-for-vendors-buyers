"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const seedTestData = async () => {
    try {
        console.log("🔍 Environment Check:");
        console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
        if (!process.env.MONGODB_URI) {
            console.error("❌ MONGODB_URI is not defined in .env file!");
            process.exit(1);
        }
        // Connect
        console.log("🔗 Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB\n");
        // Import models dynamically
        const { default: RFQ } = await Promise.resolve().then(() => __importStar(require("../modules/rfq/rfq.model.js")));
        const { default: Product } = await Promise.resolve().then(() => __importStar(require("../modules/products/product.model.js")));
        const { UserModel } = await Promise.resolve().then(() => __importStar(require("../modules/users/user.model.js")));
        // 1. Find vendor
        console.log("1️⃣ Looking for vendor user...");
        const vendor = await UserModel.findOne({ role: "VENDOR" });
        if (!vendor) {
            console.error("❌ No vendor found! Please create a vendor user first.");
            console.log("\n💡 To create a vendor, use your registration endpoint or MongoDB Compass");
            process.exit(1);
        }
        console.log("✅ Found Vendor:");
        console.log("   ID:", vendor._id.toString());
        console.log("   Email:", vendor.email);
        // 2. Find or create product
        console.log("\n2️⃣ Looking for vendor's products...");
        let product = await Product.findOne({ vendorId: vendor._id });
        if (!product) {
            console.log("📦 No products found. Creating test product...");
            product = await Product.create({
                name: "Industrial Steel Beams",
                description: "High-grade structural steel for construction projects",
                pricePerUnit: 150,
                minimumOrderQuantity: 50,
                category: "Construction Materials",
                images: ["https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400"],
                vendorId: vendor._id,
                vendorOrganizationId: vendor.organizationId,
                stock: 1000
            });
            console.log("✅ Created Product:");
            console.log("   ID:", product._id.toString());
            console.log("   Name:", product.name);
        }
        else {
            console.log("✅ Found Product:");
            console.log("   ID:", product._id.toString());
            console.log("   Name:", product.name);
        }
        // 3. Find or create buyer
        console.log("\n3️⃣ Looking for buyer user...");
        let buyer = await UserModel.findOne({ role: "BUYER" });
        if (!buyer) {
            console.log("🛒 No buyer found. Creating test buyer...");
            // Import organization model
            const { OrganizationModel } = await Promise.resolve().then(() => __importStar(require("../modules/organizations/organization.model.js")));
            // Create buyer organization
            const buyerOrg = await OrganizationModel.create({
                name: "Test Buyer Corporation",
                type: "BUYER"
            });
            // Import bcrypt
            const bcrypt = await Promise.resolve().then(() => __importStar(require("bcryptjs")));
            const hashedPassword = await bcrypt.hash("TestBuyer123!", 10);
            // Create buyer user
            buyer = await UserModel.create({
                email: "testbuyer@example.com",
                passwordHash: hashedPassword,
                role: "BUYER",
                organizationId: buyerOrg._id,
                isEmailVerified: true
            });
            console.log("✅ Created Buyer:");
            console.log("   ID:", buyer._id.toString());
            console.log("   Email:", buyer.email);
            console.log("   Password: TestBuyer123!");
        }
        else {
            console.log("✅ Found Buyer:");
            console.log("   ID:", buyer._id.toString());
            console.log("   Email:", buyer.email);
        }
        // 4. Check for existing test RFQ
        console.log("\n4️⃣ Checking for existing test RFQs...");
        const existingRFQ = await RFQ.findOne({
            productId: product._id,
            buyerId: buyer._id,
            vendorId: vendor._id
        });
        if (existingRFQ) {
            console.log("⚠️  Test RFQ already exists!");
            console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("📋 EXISTING TEST DATA");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("RFQ ID:", existingRFQ._id.toString());
            console.log("Status:", existingRFQ.status);
            console.log("Quantity:", existingRFQ.quantity);
            console.log("Unit Price: $" + existingRFQ.targetUnitPrice);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        }
        else {
            // 5. Create test RFQ
            console.log("📝 Creating test RFQ...");
            const testRFQ = await RFQ.create({
                productId: product._id,
                buyerId: buyer._id,
                vendorId: vendor._id,
                quantity: 100,
                targetUnitPrice: 150,
                message: "🧪 Test RFQ - Need 100 units for construction project. Urgent delivery required by end of month.",
                status: "PENDING"
            });
            console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("🎉 TEST RFQ CREATED!");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("RFQ ID:", testRFQ._id.toString());
            console.log("Product:", product.name);
            console.log("Quantity:", testRFQ.quantity + " units");
            console.log("Unit Price: $" + testRFQ.targetUnitPrice);
            console.log("Total Value: $" + (testRFQ.quantity * testRFQ.targetUnitPrice).toLocaleString());
            console.log("Status:", testRFQ.status);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
        }
        // 6. Verify query works
        console.log("5️⃣ Verifying vendor can query RFQs...");
        const foundRFQs = await RFQ.find({ vendorId: vendor._id })
            .populate("productId", "name")
            .populate("buyerId", "email");
        console.log(`✅ Query successful! Found ${foundRFQs.length} RFQ(s) for this vendor\n`);
        // 7. Summary
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔐 LOGIN CREDENTIALS");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("Vendor Email:", vendor.email);
        console.log("Vendor ID:", vendor._id.toString());
        console.log("");
        console.log("Buyer Email:", buyer.email);
        if (buyer.email === "testbuyer@example.com") {
            console.log("Buyer Password: TestBuyer123!");
        }
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("\n✅ Seed complete! You can now:");
        console.log("   1. Login as vendor with the credentials above");
        console.log("   2. Navigate to /vendor/rfq");
        console.log("   3. You should see 1 RFQ in the inbox\n");
        process.exit(0);
    }
    catch (error) {
        console.error("\n❌ Seed Error:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
};
seedTestData();
