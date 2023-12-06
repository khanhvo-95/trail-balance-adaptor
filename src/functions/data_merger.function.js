import { app } from '@azure/functions';
import { format, toDate, isValid } from "date-fns";

function generateAdaptorSpecificProperties(tbData) {
  tbData.JournalEntryCreationDate = format(new Date(), DATE_FORMAT);
  tbData.InterfaceGroupIdentifier = format(new Date(), DATE_FORMAT_WITH_HOUR);
  let channelCode = "CHANNEL_CODE_FOR_MFI";
  const attribute1 =
    tbData.Segment5 +
    channelCode +
    tbData.Segment4 +
    tbData.Segment3 +
    tbData.Segment2;
  tbData.Attribute1 = attribute1;
  tbData.ReconciliationReference = attribute1;
}

function populateAccountingDate(tbData) {
  const date = toDate(tbData.EffectiveDateOfTransaction);
  if (isValid(date)) {
    tbData.AccountingDate = format(date, DATE_FORMAT);
  } else {
    // Handle the invalid date case, e.g., set a default value or throw an error
    tbData.AccountingDate = null;
  }
}

export async function mergeData(request, context) {
    context.log(`Http function processed request for url "${request.url}"`);

    const tbDataList = tbDataFromODS.map((dataFromDB) => {
        const tbData = { ...dataFromDB, ...staticData };
    
        populateAccountingDate(tbData);
        generateAdaptorSpecificProperties(tbData);
    
        return tbData;
      });
    
      return tbDataList;
}

app.http('data_merger', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'data-processors',
    handler: async (request, context) => mergeData(request, context)
});
