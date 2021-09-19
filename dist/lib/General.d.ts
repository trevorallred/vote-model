import { User } from "./User";
export interface AuditDates {
    createDate?: number;
    updateDate?: number;
}
export interface AuditColumns extends AuditDates {
    createByUser?: User;
    updateByUser?: User;
}
