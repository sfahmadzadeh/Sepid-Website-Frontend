import { Dialog, IconButton, Tooltip } from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import UserCurrentScores from 'components/organisms/lists/UserCurrentScores';
import { useGetCurrenciesQuery } from 'redux/features/attributes/AttributesSlice';
import { useGetWebsiteQuery } from 'redux/features/WebsiteSlice';

type ScoresDialogButtonPropsType = {
}

const ScoresDialogButton: FC<ScoresDialogButtonPropsType> = ({
}) => {
  const [openScoresDialog, setOpenScoresDialog] = useState(false);
  const { programId } = useParams();
  const { data: website } = useGetWebsiteQuery();
  const { data: currencies } = useGetCurrenciesQuery({ website: website.name }, { skip: !Boolean(website) });

  return (
    <Fragment>
      <Tooltip arrow title='امتیازات'>
        <IconButton onClick={() => setOpenScoresDialog(openScoresDialog => !openScoresDialog)}>
          <SportsScoreIcon />
        </IconButton>
      </Tooltip>
      <Dialog disableScrollLock maxWidth='xs' fullWidth open={openScoresDialog} onClose={() => setOpenScoresDialog(openScoresDialog => !openScoresDialog)}>
        <UserCurrentScores />
      </Dialog>
      {openScoresDialog}
    </Fragment>
  );
}

export default ScoresDialogButton;