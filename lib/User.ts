export type UserID = string;
export type UserHandle = string;

export interface User extends UserTiny {
  /**
   * @deprecated this has highly confidential data. I don't want this leaking out publicly.
   */
  id: UserID;
  /**
   * @deprecated use first and last names
   */
  name?: string;
  /**
   * Member since
   */
  registrationDate?: number;
  /**
   * Last seen
   */
  lastLogin?: number;
  about?: string;
  followers?: number;
  following?: number;
  score?: number;
}

export interface UserTiny {
  handle: UserHandle;
  first?: string;
  last?: string;
}

export interface Profile extends User {
  firstInviteDate?: number;
  email: string;
  phone?: string;
  address?: string;
}

export interface UserAPI {
  getUser(userID: UserID): Promise<User>;
  getUserByHandle(handle: UserHandle): Promise<User>;
  /**
   * Get the current users's profile
   */
  getProfile(): Promise<Profile>;
  updateProfile(profile: Profile): Promise<Profile>;
}

export interface UserQuery {}

export interface FollowAPI {
  // GET:/users?
  queryUsers(query: UserQuery): Promise<User[]>;
  // GET:/user/invite
  queryByEmailOrPhone(email?: string, phone?: string): Promise<User[]>;
  // GET:/user/following
  getUsersFollowedByMe(): Promise<UserTiny[]>;
  // GET:/user/followers
  getUsersFollowingMe(): Promise<UserTiny[]>;
  // PUT:/user/follow/{userID}
  followUserID(userID: UserID): Promise<User>;
  // DEL:/user/follow/{userID}
  unfollowUserID(userID: UserID): Promise<boolean>;
  // POST:/user/invite/email
  inviteByEmail(email: string): Promise<boolean>;
  // POST:/user/invite/phone
  inviteByPhone(phone: string): Promise<boolean>;
}
