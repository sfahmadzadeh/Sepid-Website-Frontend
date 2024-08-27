import { IconButton, Tooltip } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import React, { FC, useState } from 'react';
import useWidth from 'commons/utils/UseWidth';
import { connect } from 'react-redux';
import { changeOpenChatRoomAction } from 'apps/website-display/redux/slices/currentState'

type ChatRoomButtonPropsType = {
  changeOpenChatRoom: any;
}

const ChatRoomButton: FC<ChatRoomButtonPropsType> = ({
  changeOpenChatRoom,
}) => {
  const width = useWidth();

  return (
    <Tooltip arrow title='اتاق گفتگو'>
      <IconButton size={width == 'xs' ? 'small' : 'medium'} onClick={() => changeOpenChatRoom()}>
        <ForumIcon />
      </IconButton>
    </Tooltip>
  );
}

export default connect(null, { changeOpenChatRoom: changeOpenChatRoomAction })(ChatRoomButton);