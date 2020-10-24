import { UserID } from "./User";
export declare const QUESTION_API = "question";
export declare type QuestionID = string;
export declare type AnswerID = string;
export declare type Question = {
    id: QuestionID;
    long: string;
    short?: string;
    answers: Answer[];
    tags?: TagStub[];
    dependsOnQuestionID?: QuestionID;
    validAnswers?: AnswerID[];
    expirationDate?: number;
    resources?: Resource[];
};
export interface Answer {
    id: AnswerID;
    long: string;
    short?: string;
    party?: string;
    candidateUrl?: string;
    resources?: Resource[];
}
export interface Resource {
    type: ResourceType;
    value: string;
}
export declare type ResourceType = "phone" | "email" | "website" | "Facebook" | "Twitter" | "YouTube";
export declare enum ExtraAnswers {
    OTHER = "other",
    UNSURE = "unsure",
    SKIP = "skip"
}
export interface RelatedAnswersStatsResponse {
    answers: Record<AnswerID, RelatedAnswerStats[]>;
}
export interface RelatedAnswerStats {
    questionID: QuestionID;
    answerID: AnswerID;
    label: string;
    percent: number;
}
export interface QuestionQuery {
    showNew: boolean;
    showAnswered: boolean;
    showSkipped: boolean;
    tag: TagStub;
    electionID?: number;
    limit?: number;
    offset?: number;
}
export interface QuestionAPI {
    getQuestions(): Promise<Question[]>;
    queryQuestions(query: QuestionQuery): Promise<QuestionWithVote[]>;
    getQuestion(id: QuestionID): Promise<Question>;
    getVoteStats(id: QuestionID): Promise<VoteStats>;
    getQuestionWithVote(id: QuestionID): Promise<QuestionWithVote>;
    updateQuestion(question: Question): Promise<Question>;
    insertQuestion(question: Question): Promise<Question>;
    deleteQuestion(questionID: QuestionID): Promise<boolean>;
    getQuestionRelatedAnswers(questionID: QuestionID): Promise<RelatedAnswersStatsResponse>;
}
export declare type TagStub = string;
export interface Tag {
    stub: TagStub;
    title: string;
    description: string;
}
export interface TagStats {
    stub: TagStub;
    totalQuestions: number;
    totalVotes: number;
    unansweredQuestions: number;
}
export declare type Vote = {
    questionID: QuestionID;
    userID: UserID;
    answerID: AnswerID;
    otherAnswer?: string;
    visible: boolean;
    confidence: number;
};
export declare type VoteStats = {
    votes: number;
    answers: Record<AnswerID, AnswerStats>;
};
export declare type AnswerStats = {
    votes: number;
    percent: number;
    comments: number;
    followingVotes: number;
};
export declare type QuestionWithVote = {
    question: Question;
    voteStats?: VoteStats;
    vote?: Vote;
};
export interface VoteAPI {
    getVote(questionID: QuestionID, userID: UserID): Promise<Vote>;
    postVote(vote: Vote): Promise<QuestionWithVote>;
    deleteVote(vote: Vote): Promise<boolean>;
}
export interface Comment {
    questionID: QuestionID;
    userID: UserID;
    comment: string;
}
export interface CommentRating {
    questionUserID: string;
    readerID: UserID;
    helpful: boolean;
}
export interface CommentAPI {
    postComment(comment: Comment): Promise<boolean>;
    deleteComment(comment: Comment): Promise<boolean>;
    postCommentRating(comment: CommentRating): Promise<boolean>;
    deleteCommentRating(comment: CommentRating): Promise<boolean>;
}
export interface Report {
    id: string;
    reporterID: UserID;
    reason: string;
    comment: string;
    type: "Question" | "Answer" | "UserID" | "Comment";
    questionID?: QuestionID;
    answerID?: AnswerID;
    userID?: UserID;
}
export interface ReportAPI {
    postReport(report: Report): Promise<boolean>;
    deleteReport(report: Report): Promise<boolean>;
}
