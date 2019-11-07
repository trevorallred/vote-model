export type VoteStats = {
    votes: number,
    answers: Record<string, AnswerStats>
}

export type AnswerStats = {
    votes: number,
    percent: number
}

export type Vote = {
    questionID: string,
    answerID: string,
    userID?: string
}

export type RelatedAnswersStatsResponse = {
    answers: Record<string, RelatedAnswerStats[]>,
}

export type RelatedAnswerStats = {
    percent: number,
    label: string,
    questionID: string,
    answerID: string,
}

