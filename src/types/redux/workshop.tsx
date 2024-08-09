import {
    FSMStateType,
    WorkshopEdge,
    TeamType,
    Widget,
    Answer,
    Player,
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
    players: Player,
    allWorkshopMentors: UserPublicInfoType[],
};

type CurrentState = {
    widgets: Widget[]
}