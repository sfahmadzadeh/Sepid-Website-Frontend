import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { programsReducer } from './programs';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';
import { workshopReducer } from './workshop';
import { articleReducer } from './article';
import { assessmentReducer } from './assessment';
import { AnswerReducer } from './Answer';
import { WebsiteReducer } from './Website';
import { GlobalReducer } from './Global';
import { websocketReducer } from './websocket';

const allReducers = {
  websocket: websocketReducer,
  global: GlobalReducer,
  website: WebsiteReducer,
  account: accountReducer,
  currentState: currentStateReducer,
  whiteboard: whiteboardReducer,
  redirect: redirectReducer,
  programs: programsReducer,
  workshop: workshopReducer,
  article: articleReducer,
  Intl: translatorReducer,
  scoring: assessmentReducer,
  answer: AnswerReducer,
};

export default allReducers;
