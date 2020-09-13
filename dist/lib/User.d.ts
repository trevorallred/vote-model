export declare type User = {
    id: string;
    displayName?: string;
    registrationDate?: number;
    lastLogin?: number;
};
export declare type Profile = {
    id: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    firstInviteDate?: number;
    registrationDate?: number;
    lastLogin?: number;
    email: string;
    phone: string;
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
