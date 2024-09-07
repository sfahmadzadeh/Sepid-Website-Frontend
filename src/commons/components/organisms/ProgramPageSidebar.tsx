import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import downloadFile from 'commons/utils/downloadFile';
import {
  getCertificateAction,
} from 'apps/website-display/redux/slices/programs';
import ProgramPageDashboardButton from 'commons/components/molecules/ProgramPageDashboardButton';
import ProgramContactInfo from 'commons/components/molecules/ProgramContactInfo';
import { useGetProgramQuery, useGetProgramUserPermissionsQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import ShareProgramButton from 'commons/components/atoms/ShareProgramButton';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';

type ProgramPageSidebarPropsType = {
  getCertificate: any;
  otherButtons?: any[];
}

const ProgramPageSidebar: FC<ProgramPageSidebarPropsType> = ({
  getCertificate,
  otherButtons = [],
}) => {
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: programPermissions } = useGetProgramUserPermissionsQuery({ programSlug });

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
            onClick={() => navigate(`/program/${programSlug}/team-setting/`)}>
            {'تیم‌بندی'}
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
        {programPermissions?.is_manager &&
          <Button
            variant="contained"
            color='info'
            fullWidth
            onClick={() => navigate(`/program/${programSlug}/manage/`)}>
            {'مدیریت دوره'}
          </Button>
        }
        {otherButtons.map((button, index) => <Fragment key={index}>{button}</Fragment>)}
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
