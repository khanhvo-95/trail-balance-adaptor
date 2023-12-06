export const SAVE_AUDIT_DETAILS = 'insert into afli_trail_balance_audit values(?,?,?,?,?,?,?,?,?)';
export const GET_MAX_END_ID = 'Select max(end_id) as maxEndID from afli_trail_balance_audit where is_sftp=true';
