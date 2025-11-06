"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
// Run every 14 minutes
dotenv_1.default.config();
const BACKEND_URL = process.env.BACKEND_URL;
node_cron_1.default.schedule("*/14 * * * *", async () => {
    console.log(" Cron job running every 14 minutes...");
    try {
        const res = await axios_1.default.get(`${BACKEND_URL}/api/tasks`);
        console.log("✅ Cron response:", res.data);
    }
    catch (error) {
        console.error("❌ Cron error:", error.message);
    }
});
//# sourceMappingURL=cronjob.js.map