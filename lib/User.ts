export type UserID = string;
export type UserHandle = string;

export interface User extends UserTiny {
  /**
   * @deprecated this has highly confidential data. I don't want this leaking out publicly.
   */
  id: UserID;
  /**
   * @deprecated use firstName and lastName
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
  id: UserID;
  firstInviteDate?: number;
  email?: string;
  emailConfirmed?: boolean;
  phone?: string;
  phoneConfirmed?: boolean;
  address?: string;
  pushToken?: string;
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
