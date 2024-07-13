import {
    FSMStateType,
    WorkshopEdge,
    TeamType,
    Widget,
    Answer,
    Player,
    UserMinimalType,
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
    allWorkshopMentors: UserMinimalType[],
};

type CurrentState = {
    widgets: Widget[]
}