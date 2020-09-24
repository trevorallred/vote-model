import { UserID } from "./User";

export const QUESTION_API = "question";

export type CommentID = string;

////////////////////////////////////////////////////////////////////////
//           QUESTION and ANSWER
////////////////////////////////////////////////////////////////////////

export type QuestionID = string;
export type AnswerID = string;

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

export interface RelatedAnswersStatsResponse {
  answers: Record<AnswerID, RelatedAnswerStats[]>,
}

export interface RelatedAnswerStats {
  questionID: QuestionID,
  answerID: AnswerID,
  label: string,
  percent: number,
}

export interface QuestionQuery {
  showNew: boolean,
  showAnswered: boolean, // Includes "Other"
  showSkipped: boolean,
  tag: TagStub,
  electionID?: number,
  limit?: number,
  offset?: number,
}

export interface QuestionAPI {
  getQuestions(mode: string): Promise<QuestionWithVote[]>
  queryQuestions(query: QuestionQuery): Promise<QuestionWithVote[]>
  getQuestion(id: QuestionID): Promise<QuestionWithVote>
  updateQuestion(question: Question): Promise<Question>
  insertQuestion(question: Question): Promise<Question>
  deleteQuestion(questionID: QuestionID): Promise<boolean>
  getQuestionRelatedAnswers(questionID: QuestionID): Promise<RelatedAnswersStatsResponse>
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
//           VOTE
////////////////////////////////////////////////////////////////////////

export type Vote = {
  questionID: QuestionID,
  answerID: AnswerID,
  userID?: UserID,
  otherAnswer?: string
}

export type VoteStats = {
  votes: number,
  answers: Record<AnswerID, AnswerStats>
}

export type AnswerStats = {
  votes: number,
  percent: number
}

export type QuestionWithVote = {
  question: Question,
  voteStats?: VoteStats,
  vote?: Vote,
}

export interface VoteAPI {
  getVote(questionID: QuestionID, userID: UserID): Promise<Vote>
  postVote(vote: Vote): Promise<QuestionWithVote>
  deleteVote(vote: Vote): Promise<boolean>
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

interface CommentAPI {
}
