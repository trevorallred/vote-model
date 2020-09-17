import { UserID } from "./User";
export declare const QUESTION_API = "question";
export declare type CommentID = string;
export declare type QuestionID = string;
export declare type AnswerID = string;
export declare type Question = {
    id: QuestionID;
    long: string;
    short?: string;
    tags?: TagStub[];
    dependsOnQuestionID?: QuestionID;
    answers: Answer[];
    validAnswers?: AnswerID[];
};
export interface Answer {
    id: AnswerID;
    long: string;
    short?: string;
}
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
    limit?: number;
    offset?: number;
}
export interface QuestionAPI {
    getQuestions(mode: string): Promise<QuestionWithVote[]>;
    queryQuestions(query: QuestionQuery): Promise<QuestionWithVote[]>;
    getQuestion(id: QuestionID): Promise<QuestionWithVote>;
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
    answerID: AnswerID;
    userID?: UserID;
    otherAnswer?: string;
};
export declare type VoteStats = {
    votes: number;
    answers: Record<AnswerID, AnswerStats>;
};
export declare type AnswerStats = {
    votes: number;
    percent: number;
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
    id: CommentID;
    questionID: QuestionID;
    answerID?: AnswerID;
    comment: string;
    helpfulCount: number;
}
