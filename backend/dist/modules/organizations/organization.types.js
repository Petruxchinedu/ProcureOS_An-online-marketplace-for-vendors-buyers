"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationStatus = exports.OrganizationType = void 0;
var OrganizationType;
(function (OrganizationType) {
    OrganizationType["BUYER"] = "BUYER";
    OrganizationType["VENDOR"] = "VENDOR";
})(OrganizationType || (exports.OrganizationType = OrganizationType = {}));
var OrganizationStatus;
(function (OrganizationStatus) {
    OrganizationStatus["PENDING"] = "PENDING";
    OrganizationStatus["ACTIVE"] = "ACTIVE";
    OrganizationStatus["SUSPENDED"] = "SUSPENDED";
})(OrganizationStatus || (exports.OrganizationStatus = OrganizationStatus = {}));
