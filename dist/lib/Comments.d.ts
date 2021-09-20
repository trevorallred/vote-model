import { AuditDates } from "./General";
import { AnswerID, QuestionID } from "./Question";
import { User } from "./User";
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
export declare type CommentVisibility = GLOBAL | FOLLOWERS;
export declare type GLOBAL = "GLOBAL";
export declare type FOLLOWERS = "FOLLOWERS";
export declare type GetCommentsResponse = {
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
