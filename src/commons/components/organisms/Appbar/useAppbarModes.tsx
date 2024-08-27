import DashboardAppbarItems from './modes/DashboardAppbarItems';
import ProgramAppBarItems from './modes/ProgramAppbarItems';
import GeneralAppbarItems from './modes/GeneralAppbarItems';
import FSMAppbarItems from './modes/FSMAppbarItems';
import MentorFSMAppBar from './modes/MentorFSMAppbarItems';
import { AppbarItemsType, AppbarModes } from 'commons/types/global';
import WebsiteAppbarItems from './modes/WebsiteAppbarItems';

const mode2component = {
  DASHBOARD: DashboardAppbarItems,
  FSM: FSMAppbarItems,
  MENTOR_FSM: MentorFSMAppBar,
  PROGRAM: ProgramAppBarItems,
  GENERAL: GeneralAppbarItems,
  ARTICLE: GeneralAppbarItems,
  WEBSITE: WebsiteAppbarItems,
}

type UseAppbarItemsPropsType = {
  mode: AppbarModes;
  mentorId: string;
}

const useAppbarItems = ({
  mode,
  mentorId,
}: UseAppbarItemsPropsType): AppbarItemsType => {
  if (!mode || mode === 'None') {
    // None type appbar does not have any item
    return;
  }
  const appbarComponent = mode2component[mode];
  return appbarComponent({ mentorId })
}

export default useAppbarItems;
