import db from '../config/db.config.js';
import { SAVE_AUDIT_DETAILS, GET_MAX_END_ID } from '../constant/constants.js'; // Adjust the relative file path accordingly

class AuditDAO {

    async saveAuditDetails(data) {
        // this.logger.info('AuditDAOImpl::: START');
        const { runID, startID, endID, accountingDate, reportDate, type, fileName, location, isSftp } = data;
        const [result] = db.execute(SAVE_AUDIT_DETAILS, [
            runID,
            startID,
            endID,
            accountingDate,
            reportDate,
            type,
            fileName,
            location,
            isSftp,
        ]);
    
        // Log the results from saving audit details
        console.log(result);
      }
}

export default AuditDAO;