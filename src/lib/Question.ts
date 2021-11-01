import { UserHandle } from "..";
import { AuditColumns } from "./General";
import { NewsID } from "./News";
import { UserTiny } from "./User";

export const QUESTION_API = "question";

////////////////////////////////////////////////////////////////////////
//           QUESTION and ANSWER
////////////////////////////////////////////////////////////////////////

export type QuestionID = string;
export type AnswerID = string;

export interface Question extends AuditColumns {
  id: QuestionID; // Hashkey | uuid
  long: string;
  short?: string;
  answers: Answer[];
  type?: QuestionType;
  hideUntil?: number;
  expirationDate?: number;
  resources?: Resource[];
  firstAsked?: number;
  engagementScore?: number;
  engagementScoreOverride?: number;
  /**
   * @deprecated use engagementScoreOverride
   */
  boost?: number;
  askedBy?: UserTiny;
  dependsOnQuestionID?: QuestionID;
  validAnswers?: AnswerID[];
  prerequisites?: QuestionPrerequisiteGroup;
  preface?: string;
  addendum?: string;
  showOther?: boolean;
  showUnsure?: boolean;
  defaultVisible?: boolean;
  tags?: Tag[];

}

export interface Answer {
  id: AnswerID;
  long: string;
  short?: string;
  party?: string;
  resources?: Resource[];
}

export type QuestionPrerequisiteGroup = {
  /**
   * MAX works similar to an OR clause
   * MIN works similar to an AND clause
   */
  operator?: "MAX" | "MIN";
  statements: (QuestionPrerequisiteProbability | QuestionPrerequisiteGroup)[];
};

export type QuestionPrerequisiteProbability = {
  questionID: QuestionID;
  answerID: AnswerID;
  /**
   * 0 to 1 percent of how likely
   */
  probability: number;
};

export type QuestionType = "Election" | "Opinion" | "Proposition" | "Yes/No" | "Rather";

export interface Resource {
  type: ResourceType;
  value: string;
}

export type ResourceType = "phone" | "email" | "website" | "Facebook" | "Twitter" | "YouTube";

export enum ExtraAnswers {
  OTHER = "other",
  UNSURE = "unsure",
  SKIP = "skip",
}

export interface QuestionQuery {
  showNew: boolean;
  showAnswered: boolean; // Includes "Other"
  showSkipped: boolean; // Includes "Unsure"
  tag?: TagStub;
  electionID?: number;
  newsID?: NewsID;
  limit?: number;
  offset?: number;
}

export interface QuestionSearchRequest {
  query: string;
  limit?: number;
  offset?: number;
}

export interface QuestionSearchResponse {
  results: Question[];
  limit?: number;
  offset?: number;
}

export interface QuestionAPI {
  getQuestions(): Promise<Question[]>;
  queryQuestions(query: QuestionQuery): Promise<QuestionWithVote[]>;
  searchQuestions(search: QuestionSearchRequest): Promise<QuestionSearchResponse[]>;
  getQuestion(id: QuestionID): Promise<QuestionWithStats>;
  getVoteStats(id: QuestionID): Promise<VoteStats>;
  getQuestionWithVote(id: QuestionID): Promise<QuestionWithVote>;
  updateQuestion(question: Question): Promise<Question>;
  insertQuestion(question: Question): Promise<Question>;
  deleteQuestion(questionID: QuestionID): Promise<boolean>;
  getQuestionAnalysis(id: QuestionID): Promise<QuestionAnalysis>;
}

////////////////////////////////////////////////////////////////////////
//           QUESTION ANALYSIS
////////////////////////////////////////////////////////////////////////

export interface QuestionAnalysis {
  questionID: QuestionID;
  /**
   * A list of questions this user should also consider answering.
   */
  followups: FollowupQuestion[];
  /**
   * users who answered this, also answered these questions
   */
  answers: Record<AnswerID, AnswerAnalysis[]>;
  /**
   * a list of users who selected these answers (excludes SKIP)
   */
  users: Record<AnswerID, UserTiny[]>;
}

export interface FollowupQuestion {
  id: QuestionID;
  long: string;
  short?: string;
  probability: number;
  /**
   * included if the user already voted
   */
  vote?: Vote;
}

export interface AnswerAnalysis {
  question: {
    id: QuestionID;
    label: string;
  };
  answer?: {
    label: string;
  };
  probability: number;
}

////////////////////////////////////////////////////////////////////////
//           TAG
////////////////////////////////////////////////////////////////////////

export type TagStub = string;

export interface Tag {
  stub: TagStub;
  title: string;
  description: string;
}

export interface TagStats {
  stub: TagStub;
  totalQuestions: number;
  totalVotes: number;
  unansweredQuestions: number;
}

////////////////////////////////////////////////////////////////////////
//           VOTE
////////////////////////////////////////////////////////////////////////

export type Vote = {
  questionID: QuestionID;
  answerID: AnswerID;
  otherAnswer?: string;
  bookmark: boolean;
  visible: boolean;
  /**
   * Last time this question was answered or skipped
   */
  lastAnsweredDate?: number;
  /**
   * timestamp the user last viewed this question
   */
  lastViewedDate?: number;
  /**
   * timestamp the user last viewed this question's comments
   */
  lastViewedCommentsDate?: number;
};

export type VoteStats = {
  votes: number;
  score: number;
  answers: Record<AnswerID, AnswerStats>;
  comments?: number;
  bookmarks?: number;
};

export const DefaultVoteStats: VoteStats = {
  votes: 0,
  score: 0,
  answers: {},
};

export type AnswerStats = {
  votes: number;
  percent: number;
};

export type QuestionWithStats = {
  question: Question;
  voteStats?: VoteStats;
};

export interface QuestionWithVote extends QuestionWithStats {
  vote?: Vote;
}

export interface VoteAPI {
  postVote(vote: Vote): Promise<QuestionWithVote>;
  deleteVote(vote: Vote): Promise<boolean>;
}

////////////////////////////////////////////////////////////////////////
//           REPORT
////////////////////////////////////////////////////////////////////////

export interface Report {
  id: string; // Hashkey | uuid
  reporterID: UserHandle;
  reason: string;
  comment: string;
  type: "Question" | "Answer" | "UserHandle" | "Comment";
  questionID?: QuestionID;
  answerID?: AnswerID;
  user?: UserHandle;
}

export interface ReportAPI {
  // POST:/report
  postReport(report: Report): Promise<boolean>;
  // DELETE:/report/{id}
  deleteReport(report: Report): Promise<boolean>;
}
