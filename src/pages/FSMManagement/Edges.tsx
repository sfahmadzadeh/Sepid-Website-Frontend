import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, FC } from 'react';
import { useParams } from 'react-router';
import { useGetFSMEdgesQuery, useGetFSMStatesQuery } from 'redux/features/fsm/FSMSlice';
import { useCreateFSMEdgeMutation, useDeleteFSMEdgeMutation, useUpdateFSMEdgeMutation } from 'redux/features/fsm/EdgeSlice';

type IndexPropsType = {}

const Edges: FC<IndexPropsType> = ({ }) => {
  const { fsmId } = useParams()
  const newEdgeInitialValue = {
    tail: '',
    head: '',
    is_visible: false,
    is_back_enabled: true,
  }
  const [newEdge, setNewEdge] = useState(newEdgeInitialValue);
  const { data: fsmStates = [] } = useGetFSMStatesQuery({ fsmId });
  const { data: fsmEdges = [] } = useGetFSMEdgesQuery({ fsmId });
  const [createFSMEdge] = useCreateFSMEdgeMutation();
  const [updateFSMEdge] = useUpdateFSMEdgeMutation();
  const [deleteFSMEdge] = useDeleteFSMEdgeMutation();

  return (
    <Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' className='my-other-step'>شروع</TableCell>
              <TableCell align='center'>پایان</TableCell>
              <TableCell align='center'>قابل مشاهده</TableCell>
              <TableCell align='center'>قابل بازگشت</TableCell>
              <TableCell align='center' className='my-first-step'>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center'>
                <FormControl fullWidth size='small' variant="outlined">
                  <InputLabel>شروع</InputLabel>
                  <Select
                    value={newEdge.tail}
                    onChange={(e) => {
                      setNewEdge({
                        ...newEdge,
                        tail: e.target.value,
                      })
                    }}
                    label='شروع'>
                    {fsmStates.map((state) => (
                      <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl >
              </TableCell>
              <TableCell align='center'>
                <FormControl fullWidth size='small' variant="outlined">
                  <InputLabel>پایان</InputLabel>
                  <Select
                    value={newEdge.head}
                    onChange={(e) => {
                      setNewEdge({
                        ...newEdge,
                        head: e.target.value,
                      })
                    }}
                    label='پایان'>
                    {fsmStates.map((state) => (
                      <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl >
              </TableCell>
              <TableCell align='center'>
                <Checkbox
                  checked={newEdge.is_visible}
                  onChange={() => {
                    setNewEdge({
                      ...newEdge,
                      is_visible: !newEdge.is_visible,
                    })
                  }}
                  color="primary"
                />
              </TableCell>
              <TableCell align='center'>
                <Checkbox
                  checked={newEdge.is_back_enabled}
                  onChange={() => {
                    setNewEdge({
                      ...newEdge,
                      is_back_enabled: !newEdge.is_back_enabled,
                    })
                  }}
                  color="primary"
                />
              </TableCell>
              <TableCell align='center'>
                <Button
                  onClick={() => {
                    createFSMEdge(newEdge);
                  }}
                  variant='contained' color='primary'>
                  {'ایجاد'}
                </Button>
              </TableCell>
            </TableRow>
            {fsmEdges?.map((edge, index) =>
              <TableRow key={index}>
                <TableCell align='center'>
                  {edge.tail?.name}
                </TableCell>
                <TableCell align='center'>
                  {edge.head?.name}
                </TableCell>
                <TableCell align='center'>
                  <Checkbox
                    checked={edge.is_visible}
                    onChange={() => {
                      updateFSMEdge({
                        fsmEdgeId: edge.id,
                        is_visible: !edge.is_visible,
                        is_back_enabled: edge.is_back_enabled,
                        head: edge.head?.id,
                        tail: edge.tail?.id,
                      }) // todo: fix 
                    }}
                    color="primary"
                  />
                </TableCell>
                <TableCell align='center'>
                  <Checkbox
                    checked={edge.is_back_enabled}
                    onChange={() => {
                      updateFSMEdge({
                        fsmEdgeId: edge.id,
                        is_visible: edge.is_visible,
                        is_back_enabled: !edge.is_back_enabled,
                        head: edge.head?.id,
                        tail: edge.tail?.id,
                      }) // todo: fix 
                    }}
                    color="primary"
                  />
                </TableCell>
                <TableCell align='center'>
                  <IconButton size='small'
                    onClick={() => {
                      deleteFSMEdge({ fsmEdgeId: edge.id })
                    }}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default Edges;
