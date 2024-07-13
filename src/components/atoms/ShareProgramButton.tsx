import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


type ShareProgramButtonPropsType = {}

const ShareProgramButton: FC<ShareProgramButtonPropsType> = ({

}) => {
  const { programId } = useParams();

  function copyToClipboard() {
    navigator.clipboard.writeText(
      `${window.location.origin}/program/${programId}/`
    ).then(function () {
      toast.success('لینک اشتراک دوره با موفقیت کپی شد');
    }, function (err) {
      toast.error('مشکلی در کپی‌کردن لینک وجود داشت');
    });
  }

  return (
    <Tooltip title='لینک اشتراک دوره' arrow>
      <IconButton onClick={copyToClipboard}>
        <ShareIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
}

export default ShareProgramButton;
