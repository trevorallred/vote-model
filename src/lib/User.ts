export type UserID = string;
export type UserHandle = string;

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
  followingState?: FollowingState;
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

export type ProfileEditableFields =
  | "firstName"
  | "lastName"
  | "email"
  | "about"
  | "handle"
  | "address"
  | "pushToken"
  | "lastSeen";

export type FollowingState = "FOLLOW" | "NONE" | "BLOCK" | "HIDE" | "FRIEND" | "SELF";

export function isFollowing(state: FollowingState): boolean {
  if (state === "FOLLOW") return true;
  if (state === "FRIEND") return true;
  return false;
}

export function isVisible(state: FollowingState): boolean {
  if (state === "BLOCK") return false;
  if (state === "HIDE") return false;
  return true;
}

export interface AuthToken {
  id: UserID;
  admin: boolean;
  token: string;
  expiration: number;
}

// export type UserConfirmResponse = {
//   user: Profile;
//   auth: AuthToken;
// };

export interface UserAPI {
  getUser(userID: UserID): Promise<User>;
  getUserByHandle(handle: UserHandle): Promise<User>;
  findHandles(): Promise<UserHandle[]>;
  /**
   * Get the current users's profile
   */
  getProfile(): Promise<Profile>;
  updateProfile(profile: Partial<Pick<Profile, ProfileEditableFields>>): Promise<Profile>;
  // addEmail(email: string): Promise<boolean>;
  // confirmEmail(email: string, code: number): Promise<UserConfirmResponse>;
  // addPhone(phone: string): Promise<boolean>;
  // confirmPhone(phone: string, code: number): Promise<UserConfirmResponse>;
}

// export interface UserQuery {}

export interface FollowAPI {
  // GET:/users?
  // queryUsers(query: UserQuery): Promise<User[]>;
  // GET:/user/invite
  queryByEmailOrPhone(email?: string, phone?: string): Promise<User[]>;
  // GET:/user/invite/email
  queryByEmail(email: string): Promise<User[]>;
  // GET:/user/invite/phone
  queryByPhone(email?: string, phone?: string): Promise<User[]>;
  // GET:/user/following
  getUsersFollowedByMe(): Promise<User[]>;
  // GET:/user/followers
  getUsersFollowingMe(): Promise<User[]>;
  // PUT:/user/follow/{userID}
  followUserID(userID: UserID): Promise<User>;
  // DEL:/user/follow/{userID}
  unfollowUserID(userID: UserID): Promise<boolean>;
  // PUT:/user/follow/{userID}
  blockUserID(userID: UserID): Promise<boolean>;
  // POST:/user/invite/email
  inviteByEmail(email: string, body: string): Promise<boolean>;
  // POST:/user/invite/phone
  inviteByPhone(phone: string, body: string): Promise<boolean>;
}
