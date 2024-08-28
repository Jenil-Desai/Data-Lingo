import cron from "node-cron";

import { dailyQueryLimit } from "./dailyQueryLimit";
import { plansLimit } from "./plansLimit";

cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled job: Reset Daily User Query Limit");
  dailyQueryLimit();
  console.log("Running scheduled job: Reset User Expired Plans Resources");
  plansLimit();
});
