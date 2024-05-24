import {
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState, FC, Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import { addMentorToWorkshopAction } from 'redux/slices/programs';
import { getAllWorkshopMentorsAction, removeMentorFromWorkshopAction } from 'redux/slices/workshop';
import { Mentor } from 'types/models';
import { toEnglishNumber } from 'utils/translateNumber';
import InfoIcon from '@mui/icons-material/Info';

type MentorsPropsType = {
  addMentorToWorkshop: Function,
  getAllWorkshopMentors: Function,
  removeMentorFromWorkshop: Function,
  fsmId: number,
  workshopMentors: Mentor[],
}

const Mentors: FC<MentorsPropsType> = ({
  addMentorToWorkshop,
  getAllWorkshopMentors,
  removeMentorFromWorkshop,
  fsmId,
  workshopMentors = []
}) => {
  const { programId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [properties, setProperties] = useState({
    username: '',
    fsmId: fsmId,
  });
  useEffect(() => {
    if (fsmId) {
      getAllWorkshopMentors({ fsmId })
    }
  }, [fsmId])

  const putData = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: toEnglishNumber(e.target.value),
    });
  };

  const addMentor = async () => {
    await addMentorToWorkshop(properties);
    setProperties(prevProps => ({ ...prevProps, username: '' }))
    getAllWorkshopMentors({ fsmId })
  };

  return (
    <Stack>
      <Grid
        padding={2}
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">

        <Grid item xs={12} spacing={2}>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant='h2'>
              {'همیاران کارگاه'}
            </Typography>
            <Tooltip title='همیار کارگاه تنها به تنظیمات یک کارگاه دسترسی دارد؛ از جمله می‌تواند محتوای کارگاه را ویرایش کند، پاسخ‌های شرکت‌کنندگان را تصحیح کند یا به درخواست آن‌ها پاسخ دهد.'>
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>

        <Grid item container spacing={1} justifyContent="space-evenly">
          <Grid item xs={12} sm={6}>
            <TextField
              value={properties.username}
              size="small"
              fullWidth
              variant="outlined"
              label="نام کاربری"
              name="username"
              inputProps={{ className: 'ltr-input' }}
              onChange={putData}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={!properties.username || !properties.fsmId}
              fullWidth
              variant="contained"
              color="primary"
              onClick={addMentor}>
              {'افزودن همیار جدید'}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Divider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ردیف</TableCell>
              <TableCell align='center'>نام</TableCell>
              <TableCell align='center'>نام خانوادگی</TableCell>
              <TableCell align='center'>شماره تماس</TableCell>
              <TableCell align='center'>ایمیل</TableCell>
              <TableCell align='center'>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshopMentors.map((mentor, index) =>
              <TableRow key={index}>
                <TableCell align='center'>
                  {index + 1}
                </TableCell>
                <TableCell align='center'>
                  {mentor.first_name || '-'}
                </TableCell>
                <TableCell align='center'>
                  {mentor.last_name || '-'}
                </TableCell>
                <TableCell align='center'>
                  {mentor.phone_number || '-'}
                </TableCell>
                <TableCell align='center'>
                  {mentor.email || '-'}
                </TableCell>
                <TableCell align='center'>
                  <Tooltip title='حذف همیار' arrow>
                    <IconButton size='small'
                      onClick={async () => {
                        // TODO: Hashem
                        await removeMentorFromWorkshop({ fsmId, mentor: { username: mentor.phone_number } })
                        getAllWorkshopMentors({ fsmId })
                      }}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

const mapStateToProps = (state) => ({
  fsmId: state.workshop.workshop?.id,
  workshopMentors: state.workshop.allWorkshopMentors,
});

export default connect(mapStateToProps, {
  addMentorToWorkshop: addMentorToWorkshopAction,
  getAllWorkshopMentors: getAllWorkshopMentorsAction,
  removeMentorFromWorkshop: removeMentorFromWorkshopAction,
})(Mentors);
