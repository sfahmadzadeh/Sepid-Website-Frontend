import {
  TeamType,
  Article,
  Problem,
  Submission,
  FSMType,
} from '../models'

export type InitialStateType = {
  hints: object;
  isFetching: boolean,
  workshops: FSMType[],
  articles: Article[],
  teams: TeamType[],
  problems: Problem[],
  submissions: Submission[],
  widgets: object,
}