import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import EventProgram from 'commons/components/template/program/EventProgram';
import CampaignProgram from 'commons/components/template/program/CampaignProgram';
import ProgramPageTemplate from 'commons/components/template/program/ProgramPageTemplate';

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
