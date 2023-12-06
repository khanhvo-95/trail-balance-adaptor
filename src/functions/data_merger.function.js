import { app } from '@azure/functions';
import { format, toDate, isValid } from "date-fns";
import TrialBalanceDAO from "../db/trial_balance_dao.js";

function generateAdaptorSpecificProperties(tbData) {
  tbData.JournalEntryCreationDate = format(new Date(), 'yyyy/MM/dd');
  tbData.InterfaceGroupIdentifier = format(new Date(), 'ddMMyyyyHHmm');
  let channelCode = "CHANNEL_CODE_FOR_MFI";
  const attribute1 =
    tbData.segment4 +
    channelCode +
    tbData.segment4 +
    tbData.segment3 +
    tbData.segment2;
  tbData.Attribute1 = attribute1;
  tbData.ReconciliationReference = attribute1;
}

function populateAccountingDate(tbData) {
  const date = toDate(tbData.EffectiveDateOfTransaction);
  if (isValid(date)) {
    tbData.AccountingDate = format(date, 'yyyy/MM/dd');
  } else {
    // Handle the invalid date case, e.g., set a default value or throw an error
    tbData.AccountingDate = null;
  }
}

async function retrieveTrialBalanceData(startId) {
  const trialBalanceDao = new TrialBalanceDAO();
  const responseData = await trialBalanceDao.getTrialBalanceDetails(startId);
  if (!responseData.length) {
    return [];
  }
  return responseData;
}

function mergeData(tbDataFromODS, staticData) {
  const staticDataObj = Object.fromEntries(staticData);

  const tbDataList = tbDataFromODS.map((dataFromDB) => {
    const tbData = { ...dataFromDB, ...staticDataObj };

    populateAccountingDate(tbData);
    generateAdaptorSpecificProperties(tbData);

    return tbData;
  });

  return tbDataList;
}

app.http('data_merger', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'data-processors',
    handler: async (request, context) => { 
      context.log(`Http function processed request for url "${request.url}"`);

      const tbDataFromODS = await retrieveTrialBalanceData(1);
      const staticData = new Map([
        ["key1", "value1"],
        ["key2", "value2"],
        ["key3", "value3"],
      ]);
    
      const tbDataList = mergeData(tbDataFromODS, staticData);
      context.res = {  
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(tbDataList) };
      return {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body:  JSON.stringify(tbDataList)
      }
    }
});
