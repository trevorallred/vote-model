import {Question} from "./Question";
import {Vote, VoteStats} from "./Vote";

export type QuestionWithVote = {
    question: Question,
    voteStats?: VoteStats,
    vote?: Vote,
}
