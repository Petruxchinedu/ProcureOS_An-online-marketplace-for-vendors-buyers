"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatus = exports.getRFQDetails = exports.getRevenueAnalytics = exports.getAllOrganizations = exports.getAllOrders = exports.getAllRFQs = exports.getAllUsers = exports.getDashboardStats = void 0;
const user_model_js_1 = require("../users/user.model.js");
const organization_model_js_1 = require("../organizations/organization.model.js");
const rfq_model_js_1 = __importDefault(require("../rfq/rfq.model.js"));
const order_model_js_1 = require("../orders/order.model.js");
const product_model_js_1 = __importDefault(require("../products/product.model.js"));
/**
 * 📊 DASHBOARD OVERVIEW
 */
const getDashboardStats = async (req, res) => {
    try {
        console.log("📊 Admin fetching dashboard stats...");
        // Parallel queries for performance
        const [totalUsers, totalVendors, totalBuyers, totalRFQs, pendingRFQs, acceptedRFQs, totalOrders, totalProducts, recentActivity] = await Promise.all([
            user_model_js_1.UserModel.countDocuments(),
            user_model_js_1.UserModel.countDocuments({ role: "VENDOR" }),
            user_model_js_1.UserModel.countDocuments({ role: "BUYER" }),
            rfq_model_js_1.default.countDocuments(),
            rfq_model_js_1.default.countDocuments({ status: "PENDING" }),
            rfq_model_js_1.default.countDocuments({ status: "ACCEPTED" }),
            order_model_js_1.OrderModel.countDocuments(),
            product_model_js_1.default.countDocuments(),
            // Recent activity (last 10 RFQs)
            rfq_model_js_1.default.find()
                .sort({ createdAt: -1 })
                .limit(10)
                .populate("productId", "name")
                .populate("buyerId", "email")
                .populate("vendorId", "email")
                .lean()
        ]);
        // Calculate total transaction value
        const orders = await order_model_js_1.OrderModel.find().select("totalAmount").lean();
        const totalTransactionValue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        // Calculate platform revenue (2% of transactions)
        const platformRevenue = totalTransactionValue * 0.02;
        // Get RFQ status breakdown
        const rfqsByStatus = await rfq_model_js_1.default.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        // Monthly transaction trend (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const monthlyTrend = await rfq_model_js_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);
        const stats = {
            overview: {
                totalUsers,
                totalVendors,
                totalBuyers,
                totalRFQs,
                pendingRFQs,
                acceptedRFQs,
                totalOrders,
                totalProducts,
                totalTransactionValue,
                platformRevenue
            },
            rfqsByStatus: rfqsByStatus.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
            monthlyTrend,
            recentActivity
        };
        console.log("✅ Dashboard stats generated");
        return res.status(200).json(stats);
    }
    catch (error) {
        console.error("❌ getDashboardStats Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getDashboardStats = getDashboardStats;
/**
 * 👥 GET ALL USERS WITH FILTERS
 */
const getAllUsers = async (req, res) => {
    try {
        const { role, search, page = 1, limit = 20 } = req.query;
        const query = {};
        if (role && role !== "ALL") {
            query.role = role;
        }
        if (search) {
            query.email = { $regex: search, $options: "i" };
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [users, total] = await Promise.all([
            user_model_js_1.UserModel.find(query)
                .populate("organizationId", "name type")
                .select("-passwordHash")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            user_model_js_1.UserModel.countDocuments(query)
        ]);
        return res.status(200).json({
            users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error("❌ getAllUsers Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getAllUsers = getAllUsers;
/**
 * 📋 GET ALL RFQs WITH FILTERS
 */
const getAllRFQs = async (req, res) => {
    try {
        const { status, search, page = 1, limit = 20 } = req.query;
        const query = {};
        if (status && status !== "ALL") {
            query.status = status;
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [rfqs, total] = await Promise.all([
            rfq_model_js_1.default.find(query)
                .populate("productId", "name category pricePerUnit")
                .populate("buyerId", "email")
                .populate("vendorId", "email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            rfq_model_js_1.default.countDocuments(query)
        ]);
        return res.status(200).json({
            rfqs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error("❌ getAllRFQs Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getAllRFQs = getAllRFQs;
/**
 * 📦 GET ALL ORDERS WITH FILTERS
 */
const getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = {};
        if (status && status !== "ALL") {
            query.status = status;
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [orders, total] = await Promise.all([
            order_model_js_1.OrderModel.find(query)
                .populate("productId", "name")
                .populate("buyerId", "email")
                .populate("vendorId", "email")
                .populate("rfqId")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            order_model_js_1.OrderModel.countDocuments(query)
        ]);
        return res.status(200).json({
            orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error("❌ getAllOrders Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getAllOrders = getAllOrders;
/**
 * 🏢 GET ALL ORGANIZATIONS
 */
const getAllOrganizations = async (req, res) => {
    try {
        const { type, page = 1, limit = 20 } = req.query;
        const query = {};
        if (type && type !== "ALL") {
            query.type = type;
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [organizations, total] = await Promise.all([
            organization_model_js_1.OrganizationModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            organization_model_js_1.OrganizationModel.countDocuments(query)
        ]);
        // Get user count for each org
        const orgsWithUserCount = await Promise.all(organizations.map(async (org) => {
            const userCount = await user_model_js_1.UserModel.countDocuments({ organizationId: org._id });
            return { ...org, userCount };
        }));
        return res.status(200).json({
            organizations: orgsWithUserCount,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    }
    catch (error) {
        console.error("❌ getAllOrganizations Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getAllOrganizations = getAllOrganizations;
/**
 * 📈 GET REVENUE ANALYTICS
 */
const getRevenueAnalytics = async (req, res) => {
    try {
        // Total transaction volume
        const orders = await order_model_js_1.OrderModel.find().select("totalAmount createdAt").lean();
        const totalVolume = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const platformRevenue = totalVolume * 0.02; // 2% fee
        // Monthly breakdown
        const monthlyRevenue = await order_model_js_1.OrderModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    volume: { $sum: "$totalAmount" },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    volume: 1,
                    revenue: { $multiply: ["$volume", 0.02] },
                    orderCount: 1
                }
            }
        ]);
        // Top vendors by revenue
        const topVendors = await order_model_js_1.OrderModel.aggregate([
            {
                $group: {
                    _id: "$vendorId",
                    totalRevenue: { $sum: "$totalAmount" },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $sort: { totalRevenue: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "vendor"
                }
            },
            {
                $unwind: "$vendor"
            },
            {
                $project: {
                    vendorEmail: "$vendor.email",
                    totalRevenue: 1,
                    orderCount: 1,
                    platformRevenue: { $multiply: ["$totalRevenue", 0.02] }
                }
            }
        ]);
        return res.status(200).json({
            summary: {
                totalVolume,
                platformRevenue,
                totalOrders: orders.length,
                averageOrderValue: orders.length > 0 ? totalVolume / orders.length : 0
            },
            monthlyRevenue,
            topVendors
        });
    }
    catch (error) {
        console.error("❌ getRevenueAnalytics Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getRevenueAnalytics = getRevenueAnalytics;
/**
 * 🔍 GET SINGLE RFQ DETAILS
 */
const getRFQDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const rfq = await rfq_model_js_1.default.findById(id)
            .populate("productId")
            .populate("buyerId")
            .populate("vendorId")
            .lean();
        if (!rfq) {
            return res.status(404).json({ message: "RFQ not found" });
        }
        // Get related order if exists
        const order = await order_model_js_1.OrderModel.findOne({ rfqId: rfq._id })
            .populate("escrowId")
            .lean();
        return res.status(200).json({
            rfq,
            order
        });
    }
    catch (error) {
        console.error("❌ getRFQDetails Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.getRFQDetails = getRFQDetails;
/**
 * 🔧 UPDATE USER STATUS (SUSPEND/ACTIVATE)
 */
const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isActive } = req.body;
        const user = await user_model_js_1.UserModel.findByIdAndUpdate(userId, { isActive }, { new: true }).select("-passwordHash");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(`✅ User ${userId} status updated: isActive=${isActive}`);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("❌ updateUserStatus Error:", error);
        return res.status(500).json({ message: error.message });
    }
};
exports.updateUserStatus = updateUserStatus;
