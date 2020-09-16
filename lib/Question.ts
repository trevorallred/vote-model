export const QUESTION_API = "question";

export type CommentID = string;

////////////////////////////////////////////////////////////////////////
//           QUESTION and ANSWER
////////////////////////////////////////////////////////////////////////

export type QuestionID = string;
export type AnswerID = string;

export type QuestionFilter = {
  showNew: boolean,
  showAnswered: boolean, // Includes "Other"
  showSkipped: boolean,
  tag: TagStub
}

export type Question = {
    id: QuestionID,
    long: string,
    short?: string,
    tags?: TagStub[],
    dependsOnQuestionID?: QuestionID,
    answers: Answer[],
    validAnswers?: AnswerID[],
}

export interface Answer {
    id: AnswerID,
    long: string,
    short?: string,
}

export enum ExtraAnswers {
    OTHER = "other",
    UNSURE = "unsure",
    SKIP = "skip",
}

export type AnswerStats = {
    votes: number,
    percent: number
}

export type RelatedAnswersStatsResponse = {
  answers: Record<string, RelatedAnswerStats[]>,
}

export type RelatedAnswerStats = {
  questionID: QuestionID,
  answerID: AnswerID,
  label: string,
  percent: number,
}


////////////////////////////////////////////////////////////////////////
//           TAG
////////////////////////////////////////////////////////////////////////

export type TagStub = string;

export interface Tag {
  stub: TagStub
  title: string
  description: string
}

export interface TagStats {
  stub: TagStub
  totalQuestions: number
  totalVotes: number
  unansweredQuestions: number
}

////////////////////////////////////////////////////////////////////////
//           C
////////////////////////////////////////////////////////////////////////

export type Vote = {
    questionID: string,
    answerID: string,
    userID?: string
}

export type VoteStats = {
    votes: number,
    answers: Record<string, AnswerStats>
}

export type QuestionWithVote = {
    question: Question,
    voteStats?: VoteStats,
    vote?: Vote,
}

////////////////////////////////////////////////////////////////////////
//           COMMENT
////////////////////////////////////////////////////////////////////////

export interface Comment {
    id: CommentID,
    questionID: QuestionID,
    answerID?: AnswerID,
    comment: string,
    helpfulCount: number,
}
