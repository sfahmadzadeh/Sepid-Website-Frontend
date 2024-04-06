import React from 'react';
import { useParams } from 'react-router-dom';
import MetabaseDashboard from 'components/template/MetabaseDashboard';

const Statistics = () => {
  const { fsmId } = useParams();

  return (
    <MetabaseDashboard dashboard_id={4} params={{ "fsm_id": fsmId }} />
  )
}

export default Statistics;