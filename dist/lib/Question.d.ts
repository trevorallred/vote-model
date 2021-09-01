import { NewsID } from "./News";
import { UserID, UserTiny } from "./User";
export declare const QUESTION_API = "question";
export declare type QuestionID = string;
export declare type AnswerID = string;
export declare type Question = {
    id: QuestionID;
    long: string;
    short?: string;
    answers: Answer[];
    type?: QuestionType;
    expirationDate?: number;
    resources?: Resource[];
    firstAsked?: number;
    askedBy?: UserTiny;
    dependsOnQuestionID?: QuestionID;
    validAnswers?: AnswerID[];
    prerequisites?: QuestionPrerequisiteGroup;
};
export interface Answer {
    id: AnswerID;
    long: string;
    short?: string;
    party?: string;
    resources?: Resource[];
}
export declare type QuestionPrerequisiteGroup = {
    /**
     * MAX works similar to an OR clause
     * MIN works similar to an AND clause
     */
    operator?: "MAX" | "MIN";
    statements: (QuestionPrerequisiteProbability | QuestionPrerequisiteGroup)[];
};
export declare type QuestionPrerequisiteProbability = {
    questionID: QuestionID;
    answerID: AnswerID;
    /**
     * 0 to 1 percent of how likely
     */
    probability: number;
};
export declare type QuestionType = "Election" | "Opinion" | "Proposition" | "Yes/No" | "Rather";
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
export interface QuestionQuery {
    showNew: boolean;
    showAnswered: boolean;
    showSkipped: boolean;
    tag?: TagStub;
    electionID?: number;
    newsID?: NewsID;
    limit?: number;
    offset?: number;
}
export interface QuestionSearchRequest {
    query: string;
    limit?: number;
    offset?: number;
}
export interface QuestionSearchResponse {
    results: Question[];
    limit?: number;
    offset?: number;
}
export interface QuestionAPI {
    getQuestions(): Promise<Question[]>;
    queryQuestions(query: QuestionQuery): Promise<QuestionWithVote[]>;
    searchQuestions(search: QuestionSearchRequest): Promise<QuestionSearchResponse[]>;
    getQuestion(id: QuestionID): Promise<QuestionWithStats>;
    getVoteStats(id: QuestionID): Promise<VoteStats>;
    getQuestionWithVote(id: QuestionID): Promise<QuestionWithVote>;
    updateQuestion(question: Question): Promise<Question>;
    insertQuestion(question: Question): Promise<Question>;
    deleteQuestion(questionID: QuestionID): Promise<boolean>;
    getQuestionAnalysis(id: QuestionID): Promise<QuestionAnalysis>;
}
export interface QuestionAnalysis {
    questionID: QuestionID;
    /**
     * A list of questions this user should also consider answering.
     */
    followups: FollowupQuestion[];
    /**
     * users who answered this, also answered these questions
     */
    answers: Record<AnswerID, AnswerAnalysis>;
    /**
     * a list of users who selected these answers (excludes SKIP)
     */
    users: Record<AnswerID, UserTiny[]>;
}
export interface FollowupQuestion {
    id: QuestionID;
    long: string;
    short?: string;
    probability: number;
    /**
     * included if the user already voted
     */
    vote?: Vote;
}
export interface AnswerAnalysis {
    question: {
        id: QuestionID;
        label: string;
    };
    answer: {
        label: string;
    };
    probability: number;
}
/**
 * @deprecated
 */
export declare type TagStub = string;
/**
 * @deprecated
 */
export interface Tag {
    stub: TagStub;
    title: string;
    description: string;
}
/**
 * @deprecated
 */
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
    confidence?: number;
    lastAnsweredDate?: number;
};
export declare type VoteStats = {
    votes: number;
    answers: Record<AnswerID, AnswerStats>;
    followingVotes?: number;
};
export declare type AnswerStats = {
    votes: number;
    percent: number;
    comments?: number;
    /**
     * @deprecated
     */
    followingVotes?: number;
};
export declare type QuestionWithStats = {
    question: Question;
    voteStats?: VoteStats;
};
export interface QuestionWithVote extends QuestionWithStats {
    vote?: Vote;
}
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
