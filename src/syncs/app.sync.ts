/**
 * Application synchronizations for LevelMap, Quiz, and ZhuyinDictionary concepts
 */

import { LevelMap, Quiz, Requesting, ZhuyinDictionary } from "@concepts";
import { actions, Sync } from "@engine";

// ============================================================================
// LevelMap Syncs
// ============================================================================

export const CreateLevelRequest: Sync = ({ request, levelName }) => ({
  when: actions([
    Requesting.request,
    { path: "/LevelMap/createLevel", levelName },
    { request },
  ]),
  then: actions([LevelMap.createLevel, { levelName }]),
});

export const CreateLevelResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/LevelMap/createLevel" }, { request }],
    [LevelMap.createLevel, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

export const AddCharacterRequest: Sync = (
  { request, levelName, character },
) => ({
  when: actions([
    Requesting.request,
    { path: "/LevelMap/addCharacter", levelName, character },
    { request },
  ]),
  then: actions([LevelMap.addCharacter, { levelName, character }]),
});

export const AddCharacterResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/LevelMap/addCharacter" }, { request }],
    [LevelMap.addCharacter, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

export const RemoveCharacterRequest: Sync = (
  { request, levelName, character },
) => ({
  when: actions([
    Requesting.request,
    { path: "/LevelMap/removeCharacter", levelName, character },
    { request },
  ]),
  then: actions([LevelMap.removeCharacter, { levelName, character }]),
});

export const RemoveCharacterResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/LevelMap/removeCharacter" }, { request }],
    [LevelMap.removeCharacter, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

export const GenerateSentencesRequest: Sync = (
  { request, levelName, topic },
) => ({
  when: actions([
    Requesting.request,
    { path: "/LevelMap/generateSentences", levelName, topic },
    { request },
  ]),
  then: actions([LevelMap.generateSentences, { levelName, topic }]),
});

export const GenerateSentencesResponse: Sync = ({ request, sentences }) => ({
  when: actions(
    [Requesting.request, { path: "/LevelMap/generateSentences" }, { request }],
    [LevelMap.generateSentences, {}, { sentences }],
  ),
  then: actions([Requesting.respond, { request, sentences }]),
});

export const LlmGenerateRequest: Sync = (
  { request, author, topic, level, llm, maxAttempts, numSentences, passRate },
) => ({
  when: actions([
    Requesting.request,
    {
      path: "/LevelMap/llmGenerate",
      author,
      topic,
      level,
      llm,
      maxAttempts,
      numSentences,
      passRate,
    },
    { request },
  ]),
  then: actions([
    LevelMap.llmGenerate,
    { topic, level, llm, maxAttempts, numSentences, passRate },
  ]),
});

export const LlmGenerateResponse: Sync = ({ request, sentences }) => ({
  when: actions(
    [Requesting.request, { path: "/LevelMap/llmGenerate" }, { request }],
    [LevelMap.llmGenerate, {}, { sentences }],
  ),
  then: actions([Requesting.respond, { request, response: sentences }]),
});

export const CreatePromptRequest: Sync = (
  { request, author, topic, level, numSentences, prevSentences },
) => ({
  when: actions([
    Requesting.request,
    {
      path: "/LevelMap/createPrompt",
      author,
      topic,
      level,
      numSentences,
      prevSentences,
    },
    { request },
  ]),
  then: actions([
    LevelMap.createPrompt,
    { topic, level, numSentences, prevSentences },
  ]),
});

export const CreatePromptResponse: Sync = ({ request, prompt }) => ({
  when: actions(
    [Requesting.request, { path: "/LevelMap/createPrompt" }, { request }],
    [LevelMap.createPrompt, {}, { prompt }],
  ),
  then: actions([Requesting.respond, { request, response: prompt }]),
});

export const ParseGeneratedSentencesRequest: Sync = (
  { request, author, responseText, level },
) => ({
  when: actions([
    Requesting.request,
    { path: "/LevelMap/parseGeneratedSentences", author, responseText, level },
    { request },
  ]),
  then: actions([
    LevelMap.parseGeneratedSentences,
    { responseText, level },
  ]),
});

export const ParseGeneratedSentencesResponse: Sync = (
  { request, sentences },
) => ({
  when: actions(
    [
      Requesting.request,
      { path: "/LevelMap/parseGeneratedSentences" },
      { request },
    ],
    [LevelMap.parseGeneratedSentences, {}, { sentences }],
  ),
  then: actions([Requesting.respond, { request, response: sentences }]),
});

export const ValidateSentencesRequest: Sync = (
  { request, author, sentences, level },
) => ({
  when: actions([
    Requesting.request,
    { path: "/LevelMap/validateSentences", author, sentences, level },
    { request },
  ]),
  then: actions([LevelMap.validateSentences, { sentences, level }]),
});

export const ValidateSentencesResponse: Sync = (
  { request, validSentences },
) => ({
  when: actions(
    [Requesting.request, { path: "/LevelMap/validateSentences" }, { request }],
    [LevelMap.validateSentences, {}, { validSentences }],
  ),
  then: actions([Requesting.respond, { request, response: validSentences }]),
});

// ============================================================================
// Quiz Syncs
// ============================================================================

export const MakeQuizRequest: Sync = ({ request, apiKey, length }) => ({
  when: actions([
    Requesting.request,
    { path: "/Quiz/makeQuiz", apiKey, length },
    { request },
  ]),
  then: actions([Quiz.makeQuiz, { apiKey, length }]),
});

export const MakeQuizResponse: Sync = ({ request, quizId }) => ({
  when: actions(
    [Requesting.request, { path: "/Quiz/makeQuiz" }, { request }],
    [Quiz.makeQuiz, {}, { quizId }],
  ),
  then: actions([Requesting.respond, { request, response: quizId }]),
});

export const EndQuizRequest: Sync = ({ request, quizId }) => ({
  when: actions([
    Requesting.request,
    { path: "/Quiz/endQuiz", quizId },
    { request },
  ]),
  where: (frames) => {
    return frames.map((frame) => {
      const quizIdValue = frame[quizId];
      // Extract the actual quiz ID if it's wrapped in a response object
      const actualQuizId = typeof quizIdValue === "object" &&
          quizIdValue !== null &&
          "response" in quizIdValue
        ? (quizIdValue as { response: string }).response
        : quizIdValue;
      return { ...frame, [quizId]: actualQuizId };
    });
  },
  then: actions([Quiz.endQuiz, { quizId }]),
});

export const EndQuizResponse: Sync = (
  { request, avgSpeed, avgAccuracy, incorrectRecords },
) => ({
  when: actions(
    [Requesting.request, { path: "/Quiz/endQuiz" }, { request }],
    [Quiz.endQuiz, {}, { avgSpeed, avgAccuracy, incorrectRecords }],
  ),
  then: actions([
    Requesting.respond,
    { request, avgSpeed, avgAccuracy, incorrectRecords },
  ]),
});

export const RegisterQuestionRequest: Sync = (
  { request, quizId, character, targetZhuyinRep },
) => ({
  when: actions([
    Requesting.request,
    {
      path: "/Quiz/registerQuestion",
      quizId,
      character,
      targetZhuyinRep,
    },
    { request },
  ]),
  where: (frames) => {
    return frames.map((frame) => {
      const quizIdValue = frame[quizId];
      // Extract the actual quiz ID if it's wrapped in a response object
      const actualQuizId = typeof quizIdValue === "object" &&
          quizIdValue !== null &&
          "response" in quizIdValue
        ? (quizIdValue as { response: string }).response
        : quizIdValue;
      return { ...frame, [quizId]: actualQuizId };
    });
  },
  then: actions([
    Quiz.registerQuestion,
    { quizId, character, targetZhuyinRep },
  ]),
});

export const RegisterQuestionResponse: Sync = ({ request, questionId }) => ({
  when: actions(
    [Requesting.request, { path: "/Quiz/registerQuestion" }, { request }],
    [Quiz.registerQuestion, {}, { questionId }],
  ),
  then: actions([Requesting.respond, { request, response: questionId }]),
});

export const StartQuestionRequest: Sync = (
  { request, quizId, questionId },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Quiz/startQuestion", quizId, questionId },
    { request },
  ]),
  where: (frames) => {
    return frames.map((frame) => {
      const quizIdValue = frame[quizId];
      const questionIdValue = frame[questionId];

      // Extract actual IDs if wrapped in response objects
      const actualQuizId = typeof quizIdValue === "object" &&
          quizIdValue !== null &&
          "response" in quizIdValue
        ? (quizIdValue as { response: string }).response
        : quizIdValue;

      const actualQuestionId = typeof questionIdValue === "object" &&
          questionIdValue !== null &&
          "response" in questionIdValue
        ? (questionIdValue as { response: string }).response
        : questionIdValue;

      return {
        ...frame,
        [quizId]: actualQuizId,
        [questionId]: actualQuestionId,
      };
    });
  },
  then: actions([Quiz.startQuestion, { quizId, questionId }]),
});

export const StartQuestionResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/Quiz/startQuestion" }, { request }],
    [Quiz.startQuestion, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

export const SubmitAnswerRequest: Sync = (
  { request, quizId, questionId, response },
) => ({
  when: actions([
    Requesting.request,
    { path: "/Quiz/submitAnswer", quizId, questionId, response },
    { request },
  ]),
  where: (frames) => {
    return frames.map((frame) => {
      const quizIdValue = frame[quizId];
      const questionIdValue = frame[questionId];

      // Extract actual IDs if wrapped in response objects
      const actualQuizId = typeof quizIdValue === "object" &&
          quizIdValue !== null &&
          "response" in quizIdValue
        ? (quizIdValue as { response: string }).response
        : quizIdValue;

      const actualQuestionId = typeof questionIdValue === "object" &&
          questionIdValue !== null &&
          "response" in questionIdValue
        ? (questionIdValue as { response: string }).response
        : questionIdValue;

      return {
        ...frame,
        [quizId]: actualQuizId,
        [questionId]: actualQuestionId,
      };
    });
  },
  then: actions([Quiz.submitAnswer, { quizId, questionId, response }]),
});

export const SubmitAnswerResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/Quiz/submitAnswer" }, { request }],
    [Quiz.submitAnswer, {}, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

// ============================================================================
// ZhuyinDictionary Syncs
// ============================================================================

export const RegisterCharacterRequest: Sync = (
  { request, author, character, zhuyinRep },
) => ({
  when: actions([
    Requesting.request,
    { path: "/ZhuyinDictionary/register", author, character, zhuyinRep },
    { request },
  ]),
  then: actions([ZhuyinDictionary.register, { character, zhuyinRep }]),
});

export const RegisterCharacterResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/ZhuyinDictionary/register" }, { request }],
    [ZhuyinDictionary.register, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

export const UnregisterCharacterRequest: Sync = (
  { request, author, character },
) => ({
  when: actions([
    Requesting.request,
    { path: "/ZhuyinDictionary/unregister", author, character },
    { request },
  ]),
  then: actions([ZhuyinDictionary.unregister, { character }]),
});

export const UnregisterCharacterResponse: Sync = ({ request }) => ({
  when: actions(
    [Requesting.request, { path: "/ZhuyinDictionary/unregister" }, { request }],
    [ZhuyinDictionary.unregister, {}],
  ),
  then: actions([Requesting.respond, { request }]),
});

export const GetAnswerRequest: Sync = ({ request, author, character }) => ({
  when: actions([
    Requesting.request,
    { path: "/ZhuyinDictionary/getAnswer", author, character },
    { request },
  ]),
  then: actions([ZhuyinDictionary.getAnswer, { character }]),
});

export const GetAnswerResponse: Sync = ({ request, result }) => ({
  when: actions(
    [Requesting.request, { path: "/ZhuyinDictionary/getAnswer" }, { request }],
    [ZhuyinDictionary.getAnswer, {}, { result }],
  ),
  then: actions([Requesting.respond, { request, response: result }]),
});

export const LookupZhuyinRequest: Sync = (
  { request, author, zhuyinRep },
) => ({
  when: actions([
    Requesting.request,
    { path: "/ZhuyinDictionary/lookupZhuyin", author, zhuyinRep },
    { request },
  ]),
  then: actions([ZhuyinDictionary.lookupZhuyin, { zhuyinRep }]),
});

export const LookupZhuyinResponse: Sync = ({ request, result }) => ({
  when: actions(
    [
      Requesting.request,
      { path: "/ZhuyinDictionary/lookupZhuyin" },
      { request },
    ],
    [ZhuyinDictionary.lookupZhuyin, {}, { result }],
  ),
  then: actions([Requesting.respond, { request, response: result }]),
});
