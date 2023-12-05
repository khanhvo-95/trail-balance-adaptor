import AuditDAO from '../db/audit_dao.js';
import TBAuditInfo from "../model/trail_balance_audit_info.model.js";

class TBAdaptorProcessor {
    constructor() {}

    async process(message) {
        const auditDAO = new AuditDAO();
        const auditInfo = new TBAuditInfo(
            1, // runID - set it to null/false to auto-increment (if your table is configured that way)
            1,
            1,
            new Date(), // accountingDate
            new Date(), // reportDate
            'type_value',
            'fileName_value',
            'location_value',
            true // isSftp
        );
      
        await auditDAO.saveAuditDetails(auditInfo)
        return [new Map([["test", null]])];
    }
}

export default TBAdaptorProcessor;