import { AuditDates } from "./General";
import { AnswerID, QuestionID } from "./Question";
import { User, UserID } from "./User";
export declare type CommentID = string;
export interface Comment extends AuditDates {
    questionID: QuestionID;
    commentID: CommentID;
    commenter: User;
    replyTo?: CommentID;
    visiblility?: CommentVisibility;
    /**
     * Comes dynamically from Vote answerID based on questionID and userID
     */
    answerID: AnswerID;
    body: string;
    rating?: number;
    replies?: Comment[];
}
export interface CommentPost {
    questionID: QuestionID;
    commentID: CommentID;
    replyTo?: CommentID;
    visiblility?: CommentVisibility;
    body: string;
}
export declare enum CommentVisibility {
    GLOBAL = 0,
    FOLLOWERS = 1
}
export interface CommentRating {
    questionUserID: string;
    readerID: UserID;
    helpful: boolean;
}
export interface CommentAPI {
    postComment(comment: CommentPost): Promise<boolean>;
    deleteComment(comment: Comment): Promise<boolean>;
    postCommentRating(comment: CommentRating): Promise<boolean>;
    deleteCommentRating(comment: CommentRating): Promise<boolean>;
}
