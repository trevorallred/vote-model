export declare type UserID = string;
export interface User {
    id: UserID;
    displayName?: string;
    registrationDate?: number;
    lastLogin?: number;
}
export interface Profile extends User {
    firstName?: string;
    lastName?: string;
    firstInviteDate?: number;
    email: string;
    phone: string;
}
