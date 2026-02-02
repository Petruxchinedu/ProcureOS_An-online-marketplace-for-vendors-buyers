import { Request, Response } from "express";
import { UserModel } from "../users/user.model.js";
import { OrganizationModel } from "../organizations/organization.model.js";
import RFQ from "../rfq/rfq.model.js";
import { OrderModel } from "../orders/order.model.js";
import Product from "../products/product.model.js";
import mongoose from "mongoose";

/**
 * 📊 DASHBOARD OVERVIEW
 */
export const getDashboardStats = async (req: any, res: Response) => {
  try {
    console.log("📊 Admin fetching dashboard stats...");

    // Parallel queries for performance
    const [
      totalUsers,
      totalVendors,
      totalBuyers,
      totalRFQs,
      pendingRFQs,
      acceptedRFQs,
      totalOrders,
      totalProducts,
      recentActivity
    ] = await Promise.all([
      UserModel.countDocuments(),
      UserModel.countDocuments({ role: "VENDOR" }),
      UserModel.countDocuments({ role: "BUYER" }),
      RFQ.countDocuments(),
      RFQ.countDocuments({ status: "PENDING" }),
      RFQ.countDocuments({ status: "ACCEPTED" }),
      OrderModel.countDocuments(),
      Product.countDocuments(),
      // Recent activity (last 10 RFQs)
      RFQ.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("productId", "name")
        .populate("buyerId", "email")
        .populate("vendorId", "email")
        .lean()
    ]);

    // Calculate total transaction value
    const orders = await OrderModel.find().select("totalAmount").lean();
    const totalTransactionValue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Calculate platform revenue (2% of transactions)
    const platformRevenue = totalTransactionValue * 0.02;

    // Get RFQ status breakdown
    const rfqsByStatus = await RFQ.aggregate([
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

    const monthlyTrend = await RFQ.aggregate([
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
      }, {} as Record<string, number>),
      monthlyTrend,
      recentActivity
    };

    console.log("✅ Dashboard stats generated");
    return res.status(200).json(stats);

  } catch (error: any) {
    console.error("❌ getDashboardStats Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 👥 GET ALL USERS WITH FILTERS
 */
export const getAllUsers = async (req: any, res: Response) => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;

    const query: any = {};
    
    if (role && role !== "ALL") {
      query.role = role;
    }

    if (search) {
      query.email = { $regex: search, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      UserModel.find(query)
        .populate("organizationId", "name type")
        .select("-passwordHash")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      UserModel.countDocuments(query)
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

  } catch (error: any) {
    console.error("❌ getAllUsers Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 📋 GET ALL RFQs WITH FILTERS
 */
export const getAllRFQs = async (req: any, res: Response) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;

    const query: any = {};
    
    if (status && status !== "ALL") {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [rfqs, total] = await Promise.all([
      RFQ.find(query)
        .populate("productId", "name category pricePerUnit")
        .populate("buyerId", "email")
        .populate("vendorId", "email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      RFQ.countDocuments(query)
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

  } catch (error: any) {
    console.error("❌ getAllRFQs Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 📦 GET ALL ORDERS WITH FILTERS
 */
export const getAllOrders = async (req: any, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query: any = {};
    
    if (status && status !== "ALL") {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      OrderModel.find(query)
        .populate("productId", "name")
        .populate("buyerId", "email")
        .populate("vendorId", "email")
        .populate("rfqId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      OrderModel.countDocuments(query)
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

  } catch (error: any) {
    console.error("❌ getAllOrders Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🏢 GET ALL ORGANIZATIONS
 */
export const getAllOrganizations = async (req: any, res: Response) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;

    const query: any = {};
    
    if (type && type !== "ALL") {
      query.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [organizations, total] = await Promise.all([
      OrganizationModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      OrganizationModel.countDocuments(query)
    ]);

    // Get user count for each org
    const orgsWithUserCount = await Promise.all(
      organizations.map(async (org) => {
        const userCount = await UserModel.countDocuments({ organizationId: org._id });
        return { ...org, userCount };
      })
    );

    return res.status(200).json({
      organizations: orgsWithUserCount,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error: any) {
    console.error("❌ getAllOrganizations Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 📈 GET REVENUE ANALYTICS
 */
export const getRevenueAnalytics = async (req: any, res: Response) => {
  try {
    // Total transaction volume
    const orders = await OrderModel.find().select("totalAmount createdAt").lean();
    
    const totalVolume = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const platformRevenue = totalVolume * 0.02; // 2% fee

    // Monthly breakdown
    const monthlyRevenue = await OrderModel.aggregate([
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
    const topVendors = await OrderModel.aggregate([
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

  } catch (error: any) {
    console.error("❌ getRevenueAnalytics Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🔍 GET SINGLE RFQ DETAILS
 */
export const getRFQDetails = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const rfq = await RFQ.findById(id)
      .populate("productId")
      .populate("buyerId")
      .populate("vendorId")
      .lean();

    if (!rfq) {
      return res.status(404).json({ message: "RFQ not found" });
    }

    // Get related order if exists
    const order = await OrderModel.findOne({ rfqId: rfq._id })
      .populate("escrowId")
      .lean();

    return res.status(200).json({
      rfq,
      order
    });

  } catch (error: any) {
    console.error("❌ getRFQDetails Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🔧 UPDATE USER STATUS (SUSPEND/ACTIVATE)
 */
export const updateUserStatus = async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    ).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`✅ User ${userId} status updated: isActive=${isActive}`);
    
    return res.status(200).json(user);

  } catch (error: any) {
    console.error("❌ updateUserStatus Error:", error);
    return res.status(500).json({ message: error.message });
  }
};