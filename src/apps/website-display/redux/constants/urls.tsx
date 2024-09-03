// account
export const logoutUrl = 'auth/accounts/logout/';
export const refreshTokenUrl = 'auth/accounts/refresh/';
export const changePasswordUrl = 'auth/accounts/change_pass/';
export const verificationCodeUrl = 'auth/accounts/verification_code/';
export const accountCRUDUrl = ({ id }) => id ? `auth/accounts/${id}/` : 'auth/accounts/';

// Article
export const articlesUrl = ({ pageNumber, articleId }) => articleId ? `fsm/article/${articleId}` : `fsm/article/?page=${pageNumber}`;

//////////// RECEIPT /////////////
export const getCertificateUrl = ({ receiptId }) => `/fsm/receipts/${receiptId}/get_certificate/`;
export const allRegistrationReceiptsUrl = ({ registrationFormId, pageNumber }) => `fsm/form/${registrationFormId}/receipts/?page=${pageNumber}`;
export const validateRegistrationReceiptUrl = ({ receiptId }) => `/fsm/receipts/${receiptId}/validate/`;

// Team:
export const registerUsersViaCSVUrl = ({ registrationFormId }) => `fsm/registration_form_admin/${registrationFormId}/register_participants_via_list/`;

// Program:
export const addMentorToWorkshopUrl = ({ fsmId }) => `/fsm/fsm/${fsmId}/add_mentor/`;


// workshop:
export const reviewAnswersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/review/`;
export const getFSMPlayersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/players/`;
export const getAllWorkshopMentors = ({ fsmId }) => `/fsm/fsm/${fsmId}/get_mentors/`;
export const removeMentorURL = ({ fsmId }) => `/fsm/fsm/${fsmId}/remove_mentor/`;

// fsm:
export const getPlayerFromTeamUrl = ({ id }) => `/fsm/fsm/${id}/get_player_from_team/`;

// response
// answer
export const clearQuestionAnswerUrl = `/response/answers/clear_question_answer/`;
export const answerCRUDUrl = ({ answerId }) => answerId ? `response/answers/${answerId}/` : 'response/answers/';
export const sendWidgetAnswerUrl = `/response/answers/submit_answer/`;


// assessment:
export const getAnswerScoresAndCommentsUrl = 'scoring/get_answer_scores_and_comments/';
export const setAnswerScoreUrl = 'scoring/set_answer_score/';
export const createCommentUrl = 'scoring/create_comment/';
