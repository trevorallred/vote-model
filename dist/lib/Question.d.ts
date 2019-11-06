export declare type Question = {
    id: string;
    long: string;
    short?: string;
    dependsOnQuestionID?: string;
    answers: Answer[];
    validAnswers?: string[];
    invalidAnswers?: string[];
};
export interface Answer {
    id: string;
    long: string;
    short?: string;
}
