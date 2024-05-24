import {
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import ProgramContactInfoForm from 'components/template/forms/ProgramContactInfoForm';
import ProgramInfoForm from 'components/template/forms/ProgramInfoForm';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProgramQuery, useUpdateProgramMutation } from 'redux/features/ProgramSlice';

import { ProgramType } from 'types/models';
import removeBlankAttributes from 'utils/removeBlankAttributes';

type InfoTabPropsType = {

}

const InfoTab: FC<InfoTabPropsType> = ({

}) => {
  const { programId } = useParams();
  const [properties, setProperties] = useState<ProgramType>();
  const [updateProgram, result] = useUpdateProgramMutation();
  const { data: program } = useGetProgramQuery({ programId });

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

  const handleUpdateProgram = () => {
    if (!properties.name) {
      toast.error('لطفاً نام دوره را انتخاب کنید.');
      return;
    }
    updateProgram({ programId, ...removeBlankAttributes(properties) });
  }

  return (
    <Stack spacing={3} alignItems={'start'} justifyContent={'center'} padding={2}>
      <Stack>
        <Typography variant='h2' gutterBottom>
          {'مشخصات دوره'}
        </Typography>
        <ProgramInfoForm showCoverImage={true} data={properties} setData={setProperties} />
      </Stack>
      <Divider />
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
      <Divider />
      <Stack>
        <Typography variant='h2' gutterBottom>
          {'تنظیمات ظاهری'}
        </Typography>
        {/* دکمه‌های سوالات متداول + راهنمای سایت */}
        {'todo'}
      </Stack>
      <Stack direction={'row'} justifyContent={'end'}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProgram}>
          {'به‌روز‌رسانی'}
        </Button>
      </Stack>
    </Stack>
  );
}

export default InfoTab;
