import { AuditDates } from "./General";
import { AnswerID, QuestionID } from "./Question";
import { User } from "./User";

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
  commentID: CommentID; // RangeKey
  replyTo?: CommentID;
  visiblility?: CommentVisibility;
  body: string;
}

export type CommentVisibility = GLOBAL | FOLLOWERS;

export type GLOBAL = "GLOBAL";
export type FOLLOWERS = "FOLLOWERS";

export type GetCommentsResponse = {
  comments: Comment[];
  myComment?: Comment;
};

export interface CommentAPI {
  /**
   * GET:/question/{questionID}/comments
   */
  getComments(questionID: QuestionID, replyTo?: CommentID): Promise<GetCommentsResponse>;
  /**
   * PUT: /question/{questionID}/comment
   * POST:/question/{questionID}/comment/{commentID}
   */
  postComment(comment: CommentPost): Promise<Comment>;
  /**
   * DELETE:/question/{questionID}/comment/{commentID}
   */
  deleteComment(questionID: QuestionID, commentID: CommentID): Promise<boolean>;
  /**
   * PUT:/question/{questionID}/comment/{commentID}/like
   */
  likeComment(questionID: QuestionID, commentID: CommentID): Promise<boolean>;
  /**
   * DELETE:/question/{questionID}/comment/{commentID}/like
   */
  unlikeComment(questionID: QuestionID, commentID: CommentID): Promise<boolean>;
}
