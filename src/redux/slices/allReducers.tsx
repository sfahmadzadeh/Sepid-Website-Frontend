import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { programsReducer } from './programs';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { whiteboardReducer } from './whiteboard';
import { workshopReducer } from './workshop';
import { articleReducer } from './article';
import { paperReducer } from './Paper';
import { scoringReducer } from './scoring';
import { questionReducer } from './Question';
import { RoadmapReducer } from './Roadmap';
import { AnswerReducer } from './Answer';

const allReducers = {
  paper: paperReducer,
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
