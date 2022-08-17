import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { useSelector, useDispatch } from 'react-redux';
import { addFollow } from '../../features/user/UserSlice';

export default function FollowerList({ followerList }) {
  return (
    <div>
      {/* {followerList} */}
      <ColumnGroupingTable></ColumnGroupingTable>
    </div>
  );
}

const columns = [
  { id: 'nickname', label: '닉네임' },
  {
    id: 'loginState',
    label: '상태',
    format: value => {
      if (value) return '온라인';
      return '오프라인';
    },
  },
  {
    id: 'followState',
    label: '팔로우',
  },
];

function ColumnGroupingTable() {
  const rows = useSelector(state => state.user.followerList);

  const dispatch = useDispatch();

  const handler = e => {
    const payload = { nickname: e };
    console.log(payload);
    dispatch(addFollow(payload));
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right" colSpan={5}>
                Follower
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'followState' ? (
                        <button
                          onClick={() => {
                            handler(row['nickname']);
                          }}>
                          팔로우
                        </button>
                      ) : column.id === 'loginState' ? (
                        column.format(value)
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
