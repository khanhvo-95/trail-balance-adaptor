
class TrialBalanceDAO {      
    async getTrialBalanceDetails(startID) {
        console.log("Hitting InsureMO ODS Database to pull Trail Balance Data");
        try {
            const result = [
                {
                  "listID": 1,
                  "effectiveDateOfTransaction": "2023-01-15",
                  "segment2": "S2A",
                  "segment3": "S3A",
                  "segment4": "S4A",
                  "segment7": "S7A",
                  "enteredDebitAmount": 150.0,
                  "enteredCreditAmount": 100.0
                },
                {
                  "listID": 2,
                  "effectiveDateOfTransaction": "2023-01-16",
                  "segment2": "S2B",
                  "segment3": "S3B",
                  "segment4": "S4B",
                  "segment7": "S7B",
                  "enteredDebitAmount": 200.0,
                  "enteredCreditAmount": 120.0
                },
                {
                  "listID": 3,
                  "effectiveDateOfTransaction": "2023-01-17",
                  "segment2": "S2C",
                  "segment3": "S3C",
                  "segment4": "S4C",
                  "segment7": "S7C",
                  "enteredDebitAmount": 250.0,
                  "enteredCreditAmount": 150.0
                }
              ]
            return result;
        } catch (error) {
            console.error("Error querying Trial Balance Data:", error);
        }
    }
}
export default TrialBalanceDAO;