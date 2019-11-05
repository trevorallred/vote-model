export type VoteStats = {
    votes: number,
    answers: Record<string, AnswerStats>
}

export type AnswerStats = {
    votes: number,
    percent: number
}

export type Vote = {
    userID: string,
    questionID: string,
    answerID: string,
}
