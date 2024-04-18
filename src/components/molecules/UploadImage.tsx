import {
  Button,
  Typography,
} from '@mui/material';
import React, { FC, Fragment, useEffect } from 'react';
import { toast } from 'react-toastify'
import { useCreateFileMutation } from 'redux/features/FileSlice';

type UploadImagePropsType = {
  file?: any;
  setFile?: any;
}

const UploadImage: FC<UploadImagePropsType> = ({
  setFile,
  file,
}) => {

  const validateFile = (file) => {
    if (file.name.length > 100) {
      toast.error('حداکثر طول نام فایل حداکثر ۱۰۰ کاراکتر است.');
      return false;
    }
    if (file.size >= 4e6) {
      toast.error('حداکثر حجم فایل ۳ مگابایت است.');
      return false;
    }
    return true;
  };

  const [createFile, result] = useCreateFileMutation();
  const handleUploadFile = (event) => {
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];
    if (!validateFile(file)) return;
    createFile({ file });
  };

  useEffect(() => {
    if (result.data) {
      setFile(result.data.file);
    }
  }, [result])

  return (
    <Fragment>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => document.getElementById('userProfilePicture').click()}>
        انتخاب تصویر
      </Button>
      <input
        accept="image/*"
        id="userProfilePicture"
        style={{ display: 'none' }}
        type="file"
        onChange={handleUploadFile}
      />
    </Fragment>
  );
}

export default UploadImage;