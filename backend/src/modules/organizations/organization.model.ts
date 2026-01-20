import { Schema, model, Types } from "mongoose";
import {
  OrganizationType,
  OrganizationStatus,
} from "./organization.types.js";

export interface OrganizationDocument {
  _id: Types.ObjectId;
  name: string;
  type: OrganizationType;
  status: OrganizationStatus;
  members: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<OrganizationDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(OrganizationType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrganizationStatus),
      default: OrganizationStatus.PENDING,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* Indexes */
organizationSchema.index({ name: 1, type: 1 });

export const OrganizationModel = model<OrganizationDocument>(
  "Organization",
  organizationSchema
);
