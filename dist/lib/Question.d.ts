export declare const QUESTION_API = "question";
export declare type CommentID = string;
export declare type QuestionID = string;
export declare type AnswerID = string;
export declare type QuestionFilter = {
    showNew: boolean;
    showAnswered: boolean;
    showSkipped: boolean;
    tag: TagStub;
};
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
export declare type AnswerStats = {
    votes: number;
    percent: number;
};
export declare type RelatedAnswersStatsResponse = {
    answers: Record<string, RelatedAnswerStats[]>;
};
export declare type RelatedAnswerStats = {
    questionID: QuestionID;
    answerID: AnswerID;
    label: string;
    percent: number;
};
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
    questionID: string;
    answerID: string;
    userID?: string;
};
export declare type VoteStats = {
    votes: number;
    answers: Record<string, AnswerStats>;
};
export declare type QuestionWithVote = {
    question: Question;
    voteStats?: VoteStats;
    vote?: Vote;
};
export interface Comment {
    id: CommentID;
    questionID: QuestionID;
    answerID?: AnswerID;
    comment: string;
    helpfulCount: number;
}
