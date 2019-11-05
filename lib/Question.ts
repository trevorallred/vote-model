export type Question = {
    id: string,
    long: string,
    short?: string,
    dependsOnQuestionID?: string,
    answers: Answer[],
    validAnswers?: string[]
}

export interface Answer {
    id: string,
    long: string,
}
