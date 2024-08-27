import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

import FilmBazi from 'apps/film-bazi'

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
