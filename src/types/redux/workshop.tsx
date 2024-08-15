import { WidgetType } from 'types/widgets/widget';
import {
    FSMStateType,
    WorkshopEdge,
    TeamType,
    Answer,
    PlayerType,
    UserPublicInfoType,
    FSMType
} from '../models'

export type InitialStateType = {
    currentState: CurrentState,
    isFetching: boolean,
    allStates: FSMStateType[],
    allWorkshopEdges: WorkshopEdge[],
    fetchedTeamsObjects: TeamType[],
    requestedTeams: TeamType[],
    registrableWorkshops: FSMType[],
    workshop: FSMType,
    answers: Answer[],
    allWorkshops: FSMType[],
    players: PlayerType[],
    allWorkshopMentors: UserPublicInfoType[],
};

type CurrentState = {
    widgets: WidgetType[]
}