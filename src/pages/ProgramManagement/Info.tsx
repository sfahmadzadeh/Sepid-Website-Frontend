import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import ProgramContactInfoForm from 'components/template/forms/ProgramContactInfoForm';
import ProgramInfoForm from 'components/template/forms/ProgramInfoForm';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUpdateProgramMutation } from 'redux/features/ProgramSlice';

import { ProgramType } from 'types/models';
import removeBlankAttributes from 'utils/removeBlankAttributes';

type InfoTabPropsType = {
  program: ProgramType
}

const InfoTab: FC<InfoTabPropsType> = ({
  program,
}) => {
  const { programId } = useParams();
  const [properties, setProperties] = useState<ProgramType>();
  const [updateProgram, result] = useUpdateProgramMutation();

  useEffect(() => {
    if (program) {
      setProperties(program);
    }
  }, [program]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('مشخصات دوره با موفقیت به‌روز شد.')
    }
  }, [result])

  if (!properties) return null;

  const handeUpdateFSM = () => {
    if (!properties.name) {
      toast.error('لطفاً نام دوره را انتخاب کنید.');
      return;
    }
    updateProgram({ programId, ...removeBlankAttributes(properties) });
  }

  return (
    <Stack spacing={4}>
      <Stack>
        <Typography variant='h2' gutterBottom>
          {'مشخصات دوره'}
        </Typography>
        <ProgramInfoForm showCoverImage={true} data={properties} setData={setProperties} />
      </Stack>
      <Stack>
        <Typography variant='h2' gutterBottom>
          {'راه‌های ارتباطی'}
        </Typography>
        <ProgramContactInfoForm
          data={properties.program_contact_info}
          setData={(programContactInfo) => {
            setProperties(properties => ({
              ...properties,
              program_contact_info: programContactInfo,
            }));
          }} />
      </Stack>
      <Stack direction={'row'} justifyContent={'end'}>
        <Button
          variant="contained"
          color="primary"
          onClick={handeUpdateFSM}>
          {'به‌روز رسانی'}
        </Button>
      </Stack>
    </Stack>
  );
}

const mapStateToProps = (state) => ({
  program: state.events.event,
});

export default connect(mapStateToProps)(InfoTab);
