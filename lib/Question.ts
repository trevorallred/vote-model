import { UserID } from "./User";

export const QUESTION_API = "question";

////////////////////////////////////////////////////////////////////////
//           QUESTION and ANSWER
////////////////////////////////////////////////////////////////////////

export type QuestionID = string;
export type AnswerID = string;

export type Question = {
  id: QuestionID, // Hashkey | uuid
  long: string,
  short?: string,
  answers: Answer[],
  tags?: TagStub[],
  type?: QuestionType;
  dependsOnQuestionID?: QuestionID,
  validAnswers?: AnswerID[],
  expirationDate?: number,
  resources?: Resource[],
}

export interface Answer {
  id: AnswerID,
  long: string,
  short?: string,
  party?: string,
  resources?: Resource[],
}

export type QuestionType = "Election" | "Opinion" | "Proposition" | "Yes/No"

export interface Resource {
  type: ResourceType,
  value: string,
}

export type ResourceType = "phone" | "email" | "website" | "Facebook" | "Twitter" | "YouTube";

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
  getQuestions(): Promise<Question[]>
  queryQuestions(query: QuestionQuery): Promise<QuestionWithVote[]>
  getQuestion(id: QuestionID): Promise<QuestionWithStats>
  getVoteStats(id: QuestionID): Promise<VoteStats>
  getQuestionWithVote(id: QuestionID): Promise<QuestionWithVote>
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
  questionID: QuestionID, // Hashkey
  userID: UserID,         // Rangekey
  answerID: AnswerID,
  otherAnswer?: string,
  visible: boolean,
  confidence: number,
}

export type VoteStats = {
  votes: number,
  answers: Record<AnswerID, AnswerStats>
}

export type AnswerStats = {
  votes: number,
  percent: number,
  comments: number,
  followingVotes: number,
}

export type QuestionWithVote = {
  question: Question,
  voteStats?: VoteStats,
  vote?: Vote,
}

export type QuestionWithStats = {
  question: Question,
  voteStats?: VoteStats,
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
  questionID: QuestionID, // Hashkey
  userID: UserID,         // Rangekey
  comment: string,
}

export interface CommentRating {
  questionUserID: string, // Hashkey question|user
  readerID: UserID,       // Rangekey
  helpful: boolean,
}

export interface CommentAPI {
  // POST:/comment
  postComment(comment: Comment): Promise<boolean>
  // DELETE:/comment
  deleteComment(comment: Comment): Promise<boolean>
  // POST:/comment/rating
  postCommentRating(comment: CommentRating): Promise<boolean>
  // DELETE:/comment/rating
  deleteCommentRating(comment: CommentRating): Promise<boolean>
}

////////////////////////////////////////////////////////////////////////
//           REPORT
////////////////////////////////////////////////////////////////////////

export interface Report {
  id: string,          // Hashkey | uuid
  reporterID: UserID,
  reason: string,
  comment: string,
  type: "Question" | "Answer" | "UserID" | "Comment",
  questionID?: QuestionID,
  answerID?: AnswerID,
  userID?: UserID,
}

export interface ReportAPI {
  // POST:/report
  postReport(report: Report): Promise<boolean>
  // DELETE:/report/{id}
  deleteReport(report: Report): Promise<boolean>
}
