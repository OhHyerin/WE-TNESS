import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

export default function FollowerList({ followerList }) {
  return (
    <div>
      {followerList}
      <ColumnGroupingTable></ColumnGroupingTable>
    </div>
  );
}

const columns = [
  { id: 'name', label: '' },
  { id: 'user', label: 'User', minWidth: 50 },
  {
    id: 'calories',
    label: 'Calories\u00a0(kcal)',
    minWidth: 130,
    align: 'right',
    format: value => value.toLocaleString('en-US'),
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2),
  },
];

function createData(name, user, calories, state) {
  return { name, user, calories, state };
}

// const rows = useSelect(state => state.user.followerList.followerList)
const rows = [
  createData('avt', 'wdsaf', 1324171354, 'o'),
  createData('avt', 'wdsaf', 1403500365, 'o'),
  createData('avt', 'wdsaf', 60483973, 'o'),
  createData('avt aw', 'wdsaf', 327167434, 'o'),
  createData('avt', 'wdsaf', 37602103, 'o'),
  createData('avt', 'wdsaf', 25475400, 'o'),
  createData('avt', 'wdsaf', 83019200, 'o'),
];

function ColumnGroupingTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="start" colSpan={5}>
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={null}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
