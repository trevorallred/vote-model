export declare type UserID = string;
export interface User {
    id: UserID;
    name?: string;
    displayName?: string;
    registrationDate?: number;
    lastLogin?: number;
    about?: string;
    followers?: number;
    following?: number;
    score?: number;
}
export interface Profile extends User {
    firstName?: string;
    lastName?: string;
    firstInviteDate?: number;
    email: string;
    phone: string;
}
export interface UserAPI {
    getUser(userID: UserID): Promise<User>;
    getProfile(): Promise<Profile>;
    updateProfile(profile: Profile): Promise<Profile>;
}
export interface UserQuery {
}
export interface FollowAPI {
    queryUsers(query: UserQuery): Promise<User[]>;
    getUsersFollowedByMe(): Promise<User[]>;
    getUsersFollowingMe(): Promise<User[]>;
    followUserID(userID: UserID): Promise<User>;
    unfollowUserID(userID: UserID): Promise<boolean>;
    checkPhoneEmail(phoneEmail: string): Promise<User | null>;
    invitePhoneEmail(phoneEmail: string): Promise<boolean>;
}
