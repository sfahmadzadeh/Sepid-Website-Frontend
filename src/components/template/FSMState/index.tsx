import React, { FC } from 'react';
import WorkshopFSMState, { WorkshopFSMStatePropsType } from './WorkshopFSMState';

type FSMStatePropsType = WorkshopFSMStatePropsType;

const FSMState: FC<FSMStatePropsType> = (props) => {
  if (props.type === 'workshop') {
    return <WorkshopFSMState {...props} />
  }
}

export default FSMState;
