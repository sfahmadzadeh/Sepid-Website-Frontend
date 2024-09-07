import {
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { useUploadFileMutation } from 'apps/website-display/redux/features/FileSlice';
import { useSelector } from 'react-redux';

type UploadFilePropsType = {
  setFileLink: any;
  id?: string;
  acceptableFileFormats?: string;
}

const UploadFile: FC<UploadFilePropsType> = ({
  setFileLink,
  id = Math.ceil(Math.random() * 1000),
  acceptableFileFormats = "video/* ,image/*, audio/mp3, application/pdf",
}) => {
  const [uploadFile, result] = useUploadFileMutation();
  const { uploadProgress } = useSelector((state) => (state as any).global);

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.name.length > 100) {
      toast.error('حداکثر طول نام فایل حداکثر ۱۰۰ کاراکتر است.');
      return;
    }
    if (file.size >= 50e6) {
      toast.error('حداکثر حجم فایل ۵۰ مگابایت است.');
      return;
    }
    uploadFile({ file });
  };

  useEffect(() => {
    if (result.data) {
      setFileLink(result.data.file);
    }
  }, [result])

  return (
    <Fragment>
      <Button
        startIcon={<CloudUploadIcon />}
        endIcon={
          uploadProgress &&
          <CircularProgress color='secondary' thickness={4} size={24} variant="determinate" value={uploadProgress} />
        }
        disabled={result.isLoading}
        component="label"
        htmlFor={`upload-widget-file-${id}`}
        variant="contained"
        color="primary"
        size="small"
        sx={{ whiteSpace: 'nowrap' }}>
        {'بارگذاری فایل'}
      </Button>
      <input
        accept={acceptableFileFormats}
        style={{ display: 'none' }}
        id={`upload-widget-file-${id}`}
        type="file"
        onChange={handleUploadFile}
      />
    </Fragment>
  );
}

export default UploadFile;