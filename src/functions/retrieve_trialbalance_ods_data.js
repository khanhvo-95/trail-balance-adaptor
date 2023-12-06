import { app } from "@azure/functions";
import TrialBalanceDAO from "../db/trial_balance_dao.js";

app.http("retrieve_trialbalance_ods_data", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "trialbalance",
  handler: async (request, context) => {
    context.log(
      `Http function processed request for url "${
        request.url
      }" and "${request.query.get("startId")}"`
    );
    const trialBalanceDao = new TrialBalanceDAO();
    const responseData = await trialBalanceDao.getTrialBalanceDetails(
      request.query.get("startId")
    );
    if (!responseData.length) {
      return {
        status: 404,
        body: "No data found for the given startId",
      };
    }
    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseData),
    };
  },
});


