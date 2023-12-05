class TBAuditInfo {
    constructor(runID, startID, endID, accountingDate, reportDate, type, fileName, location, isSftp) {
      this.runID = runID;
      this.startID = startID;
      this.endID = endID;
      this.accountingDate = accountingDate;
      this.reportDate = reportDate;
      this.type = type;
      this.fileName = fileName;
      this.location = location;
      this.isSftp = isSftp;
    }
  }
  
export default TBAuditInfo;