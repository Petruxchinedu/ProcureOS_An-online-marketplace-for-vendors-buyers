"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// 1. Added .js extensions to all local file imports
const notFound_middleware_js_1 = require("./middlewares/notFound.middleware.js");
const error_middleware_js_1 = require("./middlewares/error.middleware.js");
const health_routes_js_1 = __importDefault(require("./routes/health.routes.js"));
const auth_routes_js_1 = __importDefault(require("./auth/auth.routes.js"));
const protected_routes_js_1 = __importDefault(require("./routes/protected.routes.js"));
const product_routes_js_1 = __importDefault(require("./modules/products/product.routes.js"));
const negotiation_routes_js_1 = __importDefault(require("./modules/negotiation/negotiation.routes.js"));
const order_routes_js_1 = __importDefault(require("./modules/orders/order.routes.js"));
const escrow_routes_js_1 = __importDefault(require("./modules/escrow/escrow.routes.js"));
const rfq_routes_js_1 = __importDefault(require("./modules/rfq/rfq.routes.js"));
const payment_routes_js_1 = __importDefault(require("./modules/payment/payment.routes.js"));
// Import your RFQ model for the webhook (ensure path is correct and has .js)
const rfq_model_js_1 = __importDefault(require("./modules/rfq/rfq.model.js"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
exports.app = (0, express_1.default)();
/* Global Middlewares */
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    // 2. Dynamic Origin: Allows Localhost in dev and Vercel in production
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL]
        : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// 3. Webhook Route (MUST stay above express.json)
exports.app.post("/api/payments/webhook", express_1.default.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        console.error(`❌ Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const rfqId = session.metadata?.rfqId;
        if (rfqId) {
            await rfq_model_js_1.default.findByIdAndUpdate(rfqId, { status: 'PAID' });
            console.log(`✅ RFQ ${rfqId} marked as PAID`);
        }
    }
    res.json({ received: true });
});
exports.app.use(express_1.default.json());
/* Routes */
exports.app.use("/api/health", health_routes_js_1.default);
exports.app.use("/api/auth", auth_routes_js_1.default);
exports.app.use("/api/protected", protected_routes_js_1.default);
exports.app.use("/api/products", product_routes_js_1.default);
exports.app.use("/api/negotiations", negotiation_routes_js_1.default);
exports.app.use("/api/orders", order_routes_js_1.default);
exports.app.use("/api/escrow", escrow_routes_js_1.default);
exports.app.use("/api/rfq", rfq_routes_js_1.default);
exports.app.use("/api/payments", payment_routes_js_1.default);
/* Error Handling */
exports.app.use(notFound_middleware_js_1.notFound);
exports.app.use(error_middleware_js_1.errorHandler);
