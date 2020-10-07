export type UserID = string;

export interface User {
  id: UserID,
  name?: string,
  displayName?: string,
  registrationDate?: number,
  lastLogin?: number,
  about?: string,
  followers?: number,
  following?: number,
  score?: number,
}

export interface Profile extends User {
  firstName?: string,
  lastName?: string,
  firstInviteDate?: number,
  email: string,
  phone: string,
}

export interface UserAPI {
  getUser(userID: UserID): Promise<User>
  getProfile(): Promise<Profile>
  updateProfile(profile: Profile): Promise<Profile>
}

export interface UserQuery {
}

export interface FollowAPI {
  // GET:/users?
  queryUsers(query: UserQuery): Promise<User[]>
  // GET:/user/following
  getUsersFollowedByMe(): Promise<User[]>
  // GET:/user/followers
  getUsersFollowingMe(): Promise<User[]>
  // PUT:/user/follow/{userID}
  followUserID(userID: UserID): Promise<User>
  // DEL:/user/follow/{userID}
  unfollowUserID(userID: UserID): Promise<boolean>
  // GET:/user
  checkPhoneEmail(phoneEmail: string): Promise<User | null>
  // POST:/user/invite/
  invitePhoneEmail(phoneEmail: string): Promise<boolean>
}
