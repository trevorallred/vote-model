export type User = {
  id: string,
  displayName?: string,
  registrationDate?: number,
  lastLogin?: number,
}

export type Profile = {
  id: string,
  firstName?: string,
  lastName?: string
  displayName?: string,
  firstInviteDate?: number,
  registrationDate?: number,
  lastLogin?: number,
  email: string,
  phone: string
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
