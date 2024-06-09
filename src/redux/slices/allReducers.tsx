import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { programsReducer } from './programs';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';
import { workshopReducer } from './workshop';
import { articleReducer } from './article';
import { scoringReducer } from './scoring';
import { questionReducer } from './Question';
import { RoadmapReducer } from './Roadmap';
import { AnswerReducer } from './Answer';
import { WebsiteReducer } from './Website';

const allReducers = {
  website: WebsiteReducer,
  account: accountReducer,
  currentState: currentStateReducer,
  Roadmap: RoadmapReducer,
  whiteboard: whiteboardReducer,
  redirect: redirectReducer,
  programs: programsReducer,
  workshop: workshopReducer,
  article: articleReducer,
  Intl: translatorReducer,
  scoring: scoringReducer,
  question: questionReducer,
  answer: AnswerReducer,
};

export default allReducers;
