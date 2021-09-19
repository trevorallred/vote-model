import { AuditDates } from "./General";
import { AnswerID, QuestionID } from "./Question";
import { User, UserID } from "./User";

export type CommentID = string;

export interface Comment extends AuditDates {
  questionID: QuestionID; // Hashkey
  commentID: CommentID; // Rangekey timestamp-userID
  commenter: User;
  replyTo?: CommentID;
  visiblility?: CommentVisibility; // default FOLLOWERS
  /**
   * Comes dynamically from Vote answerID based on questionID and userID
   */
  answerID: AnswerID;
  body: string;
  rating?: number;
  replies?: Comment[];
}

export interface CommentPost {
  questionID: QuestionID; // Hashkey
  commentID: CommentID;
  replyTo?: CommentID;
  visiblility?: CommentVisibility; // default FOLLOWERS
  body: string;
}

export enum CommentVisibility {
  GLOBAL,
  FOLLOWERS,
}

export interface CommentRating {
  questionUserID: string; // Hashkey question|user
  readerID: UserID; // Rangekey
  helpful: boolean;
}

export interface CommentAPI {
  // POST:/comment
  postComment(comment: CommentPost): Promise<boolean>;
  // DELETE:/comment
  deleteComment(comment: Comment): Promise<boolean>;
  // POST:/comment/rating
  postCommentRating(comment: CommentRating): Promise<boolean>;
  // DELETE:/comment/rating
  deleteCommentRating(comment: CommentRating): Promise<boolean>;
}
