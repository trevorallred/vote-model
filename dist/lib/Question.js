"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUESTION_API = "question";
var ExtraAnswers;
(function (ExtraAnswers) {
    ExtraAnswers["OTHER"] = "other";
    ExtraAnswers["UNSURE"] = "unsure";
    ExtraAnswers["SKIP"] = "skip";
})(ExtraAnswers = exports.ExtraAnswers || (exports.ExtraAnswers = {}));
exports.DefaultVoteStats = {
    votes: 0,
    score: 0,
    answers: {},
};
