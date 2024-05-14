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
} from 'redux/slices/events';
import ProgramPageDashboardButton from 'components/molecules/ProgramPageDashboardButton';
import ProgramContactInfo from 'components/molecules/ProgramContactInfo';
import { useGetProgramQuery } from 'redux/features/ProgramSlice';
import ShareProgramButton from 'components/atoms/ShareProgramButton';

type ProgramPageSidebarPropsType = {
  getCertificate: any;
}

const ProgramPageSidebar: FC<ProgramPageSidebarPropsType> = ({
  getCertificate,
}) => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { data: program } = useGetProgramQuery({ programId });

  if (!program) return null;

  const doGetCertificate = () => {
    getCertificate({ registrationReceiptId: program.registration_receipt }).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        downloadFile(action.payload.response.certificate, `گواهی حضور ${program.name}`, 'image/jpeg');
      }
    });
  };

  return (
    <Stack justifyContent={'space-between'} spacing={2}>
      <Stack spacing={1} sx={{ userSelect: 'none' }}>
        <img src={program.cover_page} alt='program-cover-page' width={'100%'} style={{ borderRadius: 8 }} />
        <Typography textAlign={'center'} variant='h1'>
          {program.name}
        </Typography>
      </Stack>
      <ProgramContactInfo programContactInfo={program.program_contact_info} />
      <Stack spacing={2} justifyContent={'space-between'}>
        {program.event_type === 'Team' &&
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
