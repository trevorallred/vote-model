export type Question = {
    id: string,
    long: string,
    short?: string,
    tag?: string,
    dependsOnQuestionID?: string,
    answers: Answer[],
    validAnswers?: string[],
}

export interface Answer {
    id: string,
    long: string,
    short?: string,
}
