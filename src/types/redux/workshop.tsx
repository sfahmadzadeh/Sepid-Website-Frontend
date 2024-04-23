import {
    State,
    WorkshopEdge,
    Team,
    Widget,
    Answer,
    Player,
    Mentor,
    FSMType
} from '../models'

export type InitialStateType = {
    currentState: CurrentState,
    isFetching: boolean,
    allStates: State[],
    allWorkshopEdges: WorkshopEdge[],
    fetchedTeamsObjects: Team[],
    requestedTeams: Team[],
    getWorkshopsLoading: boolean,
    registrableWorkshops: FSMType[],
    workshop: FSMType,
    answers: Answer[],
    allWorkshops: FSMType[],
    players: Player,
    allWorkshopMentors: Mentor[],
};

type CurrentState = {
    widgets: Widget[]
}