"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_js_1 = require("../auth/auth.middleware.js");
const user_types_js_1 = require("../modules/users/user.types.js");
const router = (0, express_1.Router)();
router.get("/vendor-only", 
// Cast these to RequestHandler to satisfy Express's internal type check
auth_middleware_js_1.authenticate, (0, auth_middleware_js_1.authorize)(user_types_js_1.UserRole.VENDOR), (_req, res) => {
    res.json({ message: "Vendor access granted" });
});
exports.default = router;
