import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import downloadFile from 'utils/downloadFile';
import {
  getCertificateAction,
} from 'redux/slices/programs';
import ProgramPageDashboardButton from 'components/molecules/ProgramPageDashboardButton';
import ProgramContactInfo from 'components/molecules/ProgramContactInfo';
import { useGetProgramQuery } from 'redux/features/program/ProgramSlice';
import ShareProgramButton from 'components/atoms/ShareProgramButton';
import { useGetMyReceiptQuery } from 'redux/features/form/ReceiptSlice';

type ProgramPageSidebarPropsType = {
  getCertificate: any;
}

const ProgramPageSidebar: FC<ProgramPageSidebarPropsType> = ({
  getCertificate,
}) => {
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });

  if (!program) return null;

  const doGetCertificate = () => {
    getCertificate({ receiptId: registrationReceipt.id }).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        downloadFile(action.payload.response.certificate, `گواهی حضور ${program.name}`, 'image/jpeg');
      }
    });
  };

  return (
    <Stack justifyContent={'space-between'} spacing={2}>
      <Stack spacing={1} sx={{ userSelect: 'none' }}>
        <img src={program.cover_page} alt='program-cover-page' width={'100%'} style={{ borderRadius: 8 }} />
        <Typography textAlign={'center'} component="h1" fontWeight={700} fontSize={32} gutterBottom>
          {program.name}
        </Typography>
      </Stack>
      <ProgramContactInfo programContactInfo={program.program_contact_info} />
      <Stack spacing={2} justifyContent={'space-between'}>
        {program.participation_type === 'Team' &&
          <Button
            size='large'
            variant="contained"
            color='info'
            fullWidth
            onClick={() => navigate(`/program/${program.id}/team-selection/`)}>
            {'گروه‌بندی'}
          </Button>
        }
        {program.has_certificate &&
          <Button
            size='large'
            disabled={!program.certificates_ready}
            onClick={doGetCertificate}
            color='info'
            variant="contained"
            fullWidth>
            {'گواهی حضور'}
          </Button>
        }
        {program.site_help_paper_id &&
          <ProgramPageDashboardButton paperId={program.site_help_paper_id} buttonLabel='راهنمای سایت' />
        }
        {program.FAQs_paper_id &&
          <ProgramPageDashboardButton paperId={program.FAQs_paper_id} buttonLabel='سوالات متداول' />
        }
        {program.is_manager &&
          <Button
            variant="contained"
            color='info'
            fullWidth
            onClick={() => navigate(`/program/${program.id}/manage/`)}>
            {'مدیریت دوره'}
          </Button>
        }
      </Stack>
      <Stack alignItems={'center'}>
        <ShareProgramButton />
      </Stack>
    </Stack>
  );
}

export default connect(null, {
  getCertificate: getCertificateAction,
})(ProgramPageSidebar);
