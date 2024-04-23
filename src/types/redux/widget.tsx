import {
  Team,
  Article,
  Problem,
  Submission,
  Widget,
  FSMType,
} from '../models'

export type InitialStateType = {
  hints: object;
  isFetching: boolean,
  workshops: FSMType[],
  articles: Article[],
  teams: Team[],
  problems: Problem[],
  submissions: Submission[],
  widgets: object,
}