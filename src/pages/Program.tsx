import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import EventProgram from 'components/template/program/EventProgram';
import CampaignProgram from 'components/template/program/CampaignProgram';
import ProgramPageTemplate from 'components/template/program/ProgramPageTemplate';

type ProgramPropsType = {}

const Program: FC<ProgramPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  return (
    <ProgramPageTemplate>
      {program?.type === 'Event' && <EventProgram />}
      {program?.type === 'Campaign' && <CampaignProgram />}
    </ProgramPageTemplate>
  )
}

export default Program;
