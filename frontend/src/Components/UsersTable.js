import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import DeleteUserButton from "../Components/DeleteUserButton";
import Star from '@mui/icons-material/Star';
import { Box, TableContainer, Typography } from "@mui/material";


const UsersTable = ({userData, admin, deleteUser}) => {
  const columns = [
    {id:"admin", numeric: false, disablePadding: true, label:  ""},
    {id:"name", numeric: false, disablePadding: true, label: "Email"}
  ];

  return(
    <div>
      {userData ? (
        <>
        <Typography
          sx={{ flex: '1 1 100%', marginTop: 2, marginBottom: 3 }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Household members
        </Typography>
        <TableContainer component={Box}>
          <Table size='medium'>
          <TableHead>
            <TableRow>
              {columns.map(column=> 
                <LabelCell
                  key={column.id} 
                >
                  {column.label}
                </LabelCell>)}
            </TableRow>
          </TableHead>
            
            <TableBody>
              {userData.map((data) => (
                <TableRow
                  key={data.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, height: '54px' }}
                >
                  <IconCell 
                    col='black' 
                    align='center'>
                      {data.userFridge.admin ? <Star sx={{ color: "#FFD700"}}/> : (admin ? <DeleteUserButton data={data} deleteUser={deleteUser}/> : null)}
                  </IconCell>
                  <ColumnCell col='black'>{data.username}</ColumnCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
        </>)
        :
        <div>
          <Skeleton variant="rectangular" animation="wave"/>
          <Skeleton variant="rectangular" animation="wave"/>
          <Skeleton variant="rectangular" animation="wave"/>
        </div>}
    </div>
  );
};

export default UsersTable;


const ColumnCell = styled(TableCell)((props) => ({
  color: props.col || "black",
  fontSize: "12px",
  padding: "0 4px 0 8px",
}));

const LabelCell = styled(TableCell)({
  fontSize: "16px",
  padding: "0 4px 0 8px",
});

const IconCell = styled(TableCell)`
  padding: 0;
  width: 4rem;
  height: 100%;
`;

