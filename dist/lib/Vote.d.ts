export declare type VoteStats = {
    votes: number;
    answers: Record<string, AnswerStats>;
};
export declare type AnswerStats = {
    votes: number;
    percent: number;
};
export declare type Vote = {
    userID: string;
    questionID: string;
    answerID: string;
};
export declare type RelatedAnswersStatsResponse = {
    answers: Record<string, RelatedAnswerStats[]>;
};
export declare type RelatedAnswerStats = {
    percent: number;
    label: string;
    questionID: string;
    answerID: string;
};
