"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModel = void 0;
const mongoose_1 = require("mongoose");
const organization_types_js_1 = require("./organization.types.js");
const organizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: Object.values(organization_types_js_1.OrganizationType),
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(organization_types_js_1.OrganizationStatus),
        default: organization_types_js_1.OrganizationStatus.PENDING,
    },
    members: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
/* Indexes */
organizationSchema.index({ name: 1, type: 1 });
exports.OrganizationModel = (0, mongoose_1.model)("Organization", organizationSchema);
