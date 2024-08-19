import {
  Button,
  IconButton,
} from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import SimpleTable from 'components/organisms/tables/SimpleTable';
import { useGetFormAnswerSheetsQuery } from 'redux/features/form/FormSlice';
import { useDeleteReceiptMutation } from 'redux/features/form/ReceiptSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AreYouSure from '../dialogs/AreYouSure';

const STATUS = {
  Waiting: 'منتظر',
  Accepted: 'مجاز به پرداخت',
  Rejected: 'رد‌شده',
}

type RegistrationReceiptsTablePropsType = {
  registrationFormId: string;
}

const RegistrationReceiptsTable: FC<RegistrationReceiptsTablePropsType> = ({
  registrationFormId,
}) => {
  const [page, setPage] = React.useState(1);
  const [selectedReceiptId, setSelectedReceiptId] = useState<string>(null);
  const { data: allRegistrationReceipts } = useGetFormAnswerSheetsQuery({
    formId: registrationFormId,
    pageNumber: page.toString()
  }, {
    skip: !registrationFormId,
  });
  const [deleteReceipt, result] = useDeleteReceiptMutation();

  return (
    <Fragment>
      <SimpleTable
        hideRowNumbersColumn={true}
        headers={[
          { name: 'id', label: 'شناسه' },
          { name: 'name', label: 'نام' },
          { name: 'status', label: 'وضعیت' },
          { name: 'operation', label: 'عملیات' },
        ]}
        rows={allRegistrationReceipts?.results?.map((registrationReceipt) => ({
          id: registrationReceipt.id,
          name:
            <Button
              href={`/receipt/${registrationReceipt.id}/`}
              component="a" target="_blank">
              {(registrationReceipt.user.first_name && registrationReceipt.user.last_name) ? `${registrationReceipt.user.first_name} ${registrationReceipt.user.last_name}` : 'بی‌نام'}
            </Button>,
          status: registrationReceipt.is_participating ? 'قطعی' : STATUS[registrationReceipt.status],
          operation:
            <IconButton onClick={() => setSelectedReceiptId(registrationReceipt.id)}>
              <DeleteIcon />
            </IconButton>,
        }))}
        itemsPerPage={100}
        count={allRegistrationReceipts?.count}
        page={page}
        setPage={setPage}
      />
      <AreYouSure
        open={Boolean(selectedReceiptId)}
        callBackFunction={() => { deleteReceipt({ receiptId: selectedReceiptId }) }}
        handleClose={() => setSelectedReceiptId(null)}
        text='در صورت پاک‌کردن این رسید ثبت‌نام، کاربر از دوره حذف و تمام دسترسی‌های آن به کارگاه‌ها قطع خواهد شد. آیا مطمئنید؟' />
    </Fragment>
  );
}

export default RegistrationReceiptsTable;