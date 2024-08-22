import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

import FilmBazi from 'side-projects/FilmBaziCampaign'

type CampaignProgramPropsType = {}

const CampaignProgram: FC<CampaignProgramPropsType> = ({
}) => {
  const { programId } = useParams();
  const { data: program } = useGetProgramQuery({ programId });

  if (program.slug === 'filmbazi') {
    return <FilmBazi />
  }
}

export default CampaignProgram;
