import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import cookie from 'react-cookies';
import { JWT_TOKEN_COOKIE } from '../constants';

export default function CourseTable(props) {
  const token = cookie.load(JWT_TOKEN_COOKIE);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Course ID</TableCell>
            <TableCell align="right">Course Name</TableCell>
            <TableCell align="right">Course Location</TableCell>
            <TableCell align="right">Course Content</TableCell>
            <TableCell align="right">Teacher ID</TableCell>
            {/* render the last column only is token exist */
              token && <TableCell align="right">Action</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableCells()}
        </TableBody>
      </Table>
    </TableContainer>
  );
  function renderTableCells(){
    return props.courses.map((row, index) => (
        <TableRow
          key={row.courseName}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {/* <TableCell component="th" scope="row">
            {index +1}
          </TableCell> */}
          <TableCell align="right">{row.id}</TableCell>
          <TableCell align="right">{row.course_name}</TableCell>
          <TableCell align="right">{row.course_location}</TableCell>
          <TableCell align="right">{row.course_content}</TableCell>
          <TableCell align="right">{row.teacher_id}</TableCell>
          {
            token && (
              <TableCell align="right">
                <Button
                  color = "primary" 
                  variant = "contained"
                  onClick={()=>{props.onActionButtonClick(row.course_name)}}
                >
                  {props.actionLabel}
                </Button>
              </TableCell>
            )
          }
        </TableRow>
      ));
  }
}
