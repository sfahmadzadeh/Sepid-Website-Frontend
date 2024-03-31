import {
  Workshop,
  Team,
  Article,
  Problem,
  Submission,
  Widget,
} from '../models'

export type InitialStateType = {
  hints: object;
  isFetching: boolean,
  workshops: Workshop[],
  articles: Article[],
  teams: Team[],
  problems: Problem[],
  submissions: Submission[],
  widgets: object,
}