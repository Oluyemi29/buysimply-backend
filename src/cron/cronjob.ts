
import  axios from "axios";
import dotenv from "dotenv";
import cron from "node-cron"

// Run every 14 minutes
dotenv.config();
const BACKEND_URL = process.env.BACKEND_URL as string;
cron.schedule("*/14 * * * *", async () => {
  console.log(" Cron job running every 14 minutes...");

  try {
    const res = await axios.get(`${BACKEND_URL}/api/tasks`);
    console.log("✅ Cron response:", res.data);
  } catch (error: any) {
    console.error("❌ Cron error:", error.message);
  }
});