import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import SoftDeleteFSMButton from 'components/atoms/SoftDeleteFSMButton';
import FSMInfoForm from 'components/template/forms/FSMInfoForm';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetFSMQuery, useUpdateFSMMutation } from 'redux/features/fsm/FSMSlice';
import { FSMType } from 'types/models';
import removeBlankAttributes from 'utils/removeBlankAttributes';

type InfoPropsType = {}

const Info: FC<InfoPropsType> = ({ }) => {
  const [properties, setProperties] = useState<FSMType>();
  const { fsmId, programId } = useParams();
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const [updateFSM, result] = useUpdateFSMMutation();

  useEffect(() => {
    if (fsm) {
      setProperties(fsm);
    }
  }, [fsm]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('مشخصات کارگاه با موفقیت به‌روز شد.')
    }
  }, [result])

  const handleUpdateFSM = () => {
    if (!properties.name) {
      toast.error('لطفاً نام کارگاه را انتخاب کنید.');
      return;
    }
    if (!properties.fsm_learning_type) {
      toast.error('لطفاً نوع آموزش کارگاه را انتخاب کنید.');
      return;
    }
    if (!properties.fsm_p_type) {
      toast.error('لطفاً وضعیت گروه کارگاه را انتخاب کنید.');
      return;
    }
    updateFSM({ fsmId, ...removeBlankAttributes(properties) });
  }

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2}>
        <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'مشخصات کارگاه'}
          </Typography>
          <SoftDeleteFSMButton fsmId={fsmId} programId={programId} />
        </Stack>
        <Stack>
          {properties &&
            <FSMInfoForm showCoverImage={true} data={properties} setData={setProperties} />
          }
        </Stack>
      </Stack>

      <Stack padding={2} alignItems={'end'}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateFSM}>
          {'به‌روز رسانی'}
        </Button>
      </Stack>
    </Stack>
  );
}


export default Info;