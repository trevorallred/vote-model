export declare type UserID = string;
export declare type UserHandle = string;
export interface User extends UserTiny {
    /**
     * @deprecated use firstName and lastName
     * Remove once name doesn't exist in DDB anymore
     */
    name?: string;
    /**
     * Member since
     */
    registrationDate?: number;
    /**
     * Last seen
     */
    lastSeen?: number;
    about?: string;
    followers?: number;
    following?: number;
    score?: number;
}
export interface UserTiny {
    /**
     * starts with @ like @johndoe
     */
    handle: UserHandle;
    firstName?: string;
    lastName?: string;
}
export interface Profile extends User {
    readonly id: UserID;
    firstInviteDate?: number;
    email?: string;
    emailConfirmed?: boolean;
    phone?: string;
    phoneConfirmed?: boolean;
    address?: string;
    pushToken?: string;
}
export declare type ProfileEditableFields = "firstName" | "lastName" | "email" | "about" | "handle" | "address" | "pushToken" | "lastSeen";
export interface AuthToken {
    id: UserID;
    admin: boolean;
    token: string;
    expiration: number;
}
export interface UserAPI {
    getUser(userID: UserID): Promise<User>;
    getUserByHandle(handle: UserHandle): Promise<User>;
    findHandles(): Promise<UserHandle[]>;
    /**
     * Get the current users's profile
     */
    getProfile(): Promise<Profile>;
    updateProfile(profile: Partial<Pick<Profile, ProfileEditableFields>>): Promise<Profile>;
}
export interface UserQuery {
}
export interface FollowAPI {
    queryUsers(query: UserQuery): Promise<User[]>;
    queryByEmailOrPhone(email?: string, phone?: string): Promise<User[]>;
    queryByEmail(email: string): Promise<User[]>;
    queryByPhone(email?: string, phone?: string): Promise<User[]>;
    getUsersFollowedByMe(): Promise<User[]>;
    getUsersFollowingMe(): Promise<User[]>;
    followUserID(userID: UserID): Promise<User>;
    unfollowUserID(userID: UserID): Promise<boolean>;
    blockUserID(userID: UserID): Promise<boolean>;
    inviteByEmail(email: string, body: string): Promise<boolean>;
    inviteByPhone(phone: string, body: string): Promise<boolean>;
}
