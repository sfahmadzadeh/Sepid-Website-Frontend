import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import isNumber from 'utils/validators/isNumber';

const GoToAnswer = () => {
  const navigate = useNavigate();
  const { programId, fsmId } = useParams();
  const [answerId, setAnswerId] = useState<string>('');

  return (
    <Stack>
      <Grid
        padding={2}
        container
        justifyContent='center'
        alignItems='center'>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Grid item container>
              <Grid container item justifyContent='center' spacing={2}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h2' align='center'>
                    {'شناسه پاسخ خود را وارد کنید'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='شناسه' value={answerId} onChange={(e) => isNumber(e.target.value) && setAnswerId(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' fullWidth onClick={() => { navigate(`/program/${programId}/fsm/${fsmId}/manage/correction/${answerId}/`) }}>
                    {'ثبت'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default GoToAnswer;