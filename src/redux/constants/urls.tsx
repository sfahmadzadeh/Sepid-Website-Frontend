// account
export const logoutUrl = 'auth/accounts/logout/';
export const refreshTokenUrl = 'auth/accounts/refresh/';
export const changePasswordUrl = 'auth/accounts/change_pass/';
export const verificationCodeUrl = 'auth/accounts/verification_code/';
export const accountCRUDUrl = ({ id }) => id ? `auth/accounts/${id}/` : 'auth/accounts/';

export const institutesUrl = ({ cityTitle }) => cityTitle ? `auth/institutes?city=${cityTitle}` : 'auth/institutes/';

// workshop
export const getOneWorkshopUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/`;
export const getWorkshopsUrl = ({ programId, pageNumber }) => {
  let url = 'fsm/fsm/';
  if (programId) {
    url += `?program=${programId}`;
  }
  if (pageNumber) {
    url += `&page=${pageNumber}`;
  }
  return url;
}
export const getRegistrableWorkshopsUrl = 'fsm/fsm/?registrable=true';
export const reviewAnswersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/review/`;

export const getProgramsUrl = 'fsm/program/';
export const getTeamUrl = ({ teamId }) => `fsm/team/${teamId}/`;
export const getTeamInvitationsUrl = ({ teamId }) =>
  `/fsm/team/${teamId}/get_team_invitations/`;

export const getMyInvitationsUrl = ({ registrationFormId }) =>
  `fsm/form/${registrationFormId}/my_invitations/`;

export const inviteSomeoneUrl = ({ teamId }) =>
  `fsm/team/${teamId}/invite_member/`;
export const deleteInvitationUrl = ({ invitationId }) =>
  `fsm/invitations/${invitationId}/`;
export const respondInvitationUrl = ({ invitationId }) =>
  `fsm/invitations/${invitationId}/respond/`;

export const TeamCRUDUrl = ({ teamId }) =>
  teamId ? `fsm/team/${teamId}/` : 'fsm/team/';

export const createTeamAndJoinActionUrl = 'fsm/team/create_team_and_join/';


export const articlesUrl = ({ pageNumber, articleId }) => articleId ? `fsm/article/${articleId}` : `fsm/article/?page=${pageNumber}`;

export const statesUrl = 'fsm/state/';

//////////// RECEIPT /////////////
export const getCertificateUrl = ({ receiptId }) => `/fsm/receipts/${receiptId}/get_certificate/`;
export const allRegistrationReceiptsUrl = ({ registrationFormId, pageNumber }) => `fsm/form/${registrationFormId}/receipts/?page=${pageNumber}`;
export const validateRegistrationReceiptUrl = ({ receiptId }) => `/fsm/receipts/${receiptId}/validate/`;

/////////// HINT ///////////
// TOFF
export const hintUrl = ({ hintId }) => hintId ? `fsm/hint/${hintId}/` : 'fsm/hint/';
export const widgetHintUrl = ({ hintId }) => hintId ? `fsm/widget-hint/${hintId}/` : 'fsm/widget-hint/';

export const requestMentorUrl = 'fsm/requestmentor/';

export const paymentRequestUrl = 'auth/pay/';


// landing
export const getLandingDataUrl = '?';

//program
export const applyDiscountUrl = 'auth/verify-discount/';

export const getScoresUrl = 'fsm/getscores/';

// team:
export const getTeamsUrl = ({ registrationFormId }) => registrationFormId ? `/fsm/team/?registration_form=${registrationFormId}` : '/fsm/team/';
export const makeTeamHeadUrl = ({ teamId }) => `/fsm/team/${teamId}/make_team_head/`;
export const removeFromTeamUrl = '/fsm/team/remove_from_team/';
export const addUserToTeamUrl = ({ teamId }) => `fsm/team/${teamId}/register_and_join/`
export const createTeamUrl = 'fsm/team/';
export const registerUsersViaCSVUrl = ({ registrationFormId }) => `fsm/registration_form_admin/${registrationFormId}/register_participants_via_list/`;
export const registerOneUserUrl = ({ registrationFormId }) => `fsm/registration_form_admin/${registrationFormId}/register_individual_participant/`;

// program:
export const teamCRUDUrl = ({ teamId }) => teamId ? `fsm/team/${teamId}/` : 'fsm/team/';
export const addMentorToWorkshopUrl = ({ fsmId }) => `/fsm/fsm/${fsmId}/add_mentor/`;
export const registrationFormCRUDUrl = ({ registrationFormId }) => registrationFormId ? `fsm/form/${registrationFormId}/` : 'fsm/form/';


// workshop:
export const getFSMPlayersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/players/`;
export const workshopCRUDUrl = ({ fsmId }) => fsmId ? `/fsm/fsm/${fsmId}/` : '/fsm/fsm/';
export const getAllWorkshopStatesInfoUrl = ({ fsmId }) => `/fsm/fsm/${fsmId}/get_states/`;
export const getAllWorkshopMentors = ({ fsmId }) => `/fsm/fsm/${fsmId}/get_mentors/`;
export const removeMentorURL = ({ fsmId }) => `/fsm/fsm/${fsmId}/remove_mentor/`;

// state:
export const stateCRUDUrl = ({ paperId }) => paperId ? `/fsm/state/${paperId}/` : '/fsm/state/';
export const edgeUrl = ({ fsmEdgeId }) => fsmEdgeId ? `/fsm/edge/${fsmEdgeId}/` : '/fsm/edge/';

// fsm:
export const programInfoUrl = ({ pageNumber, programId }) => programId ? `fsm/program/${programId}/` : `fsm/program/?page=${pageNumber}`;
export const getPlayerFromTeamUrl = ({ id }) => `/fsm/fsm/${id}/get_player_from_team/`;

// articles

export const participantGetCurrentStateUrl = 'fsm/getcurrentstate/';

export const sendAnswerUrl = 'fsm/sendanswer/';

export const startWorkshopUrl = 'fsm/startWorkshop/';

// response
// answer
export const clearQuestionAnswerUrl = `/response/answers/clear_question_answer/`;
export const answerCRUDUrl = ({ answerId }) => answerId ? `response/answers/${answerId}/` : 'response/answers/';
export const sendWidgetAnswerUrl = `/response/answers/submit_answer/`;


// scoring:
export const getAnswerScoresAndCommentsUrl = 'scoring/get_answer_scores_and_comments/';
export const setAnswerScoreUrl = 'scoring/set_answer_score/';
export const createCommentUrl = 'scoring/create_comment/';
export const transactionUrl = ({ actionUrl }) => actionUrl ? `scoring/transaction/${actionUrl}/` : 'scoring/transaction/';
export const scoreTypeUrl = ({ actionUrl }) => actionUrl ? `scoring/score_type/${actionUrl}/` : 'scoring/score_type/';

// question
export const checkUsernameUrl = 'question/check_username/';

// widget
export const getProblemsUrl = 'fsm/getproblems/';
export const getUnreadNotificationsUrl = 'notifications/api/unread_list/';
export const markSubmissionUrl = 'fsm/marksubmission/';
export const makeWidgetFileEmptyUrl = ({ widgetId }) => `fsm/widget/${widgetId}/make_widget_file_empty/`;
export const widgetCRUDUrl = ({ widgetId }) => widgetId ? `fsm/widget/${widgetId}/` : 'fsm/widget/';
export const statesCRUDUrl = ({ paperId }) => paperId ? `fsm/state/${paperId}/` : 'fsm/state/';
export const visitWorkshopPlayerUrl = 'fsm/visitteam/';
export const workshopTeamsUrl = 'fsm/workshopplayers/';

// Website Appearance

export const bannersCRUDUrl = 'websiteappearance/banner/';
