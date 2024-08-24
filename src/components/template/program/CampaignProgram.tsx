import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';

import FilmBazi from 'side-projects/FilmBazi'

type CampaignProgramPropsType = {}

const CampaignProgram: FC<CampaignProgramPropsType> = ({
}) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  if (program.slug === 'filmbazi') {
    return <FilmBazi />
  }
}

export default CampaignProgram;
