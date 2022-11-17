import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { styled } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import DeleteUserButton from "../Components/DeleteUserButton";
import Star from '@mui/icons-material/Star';


const UsersTable = ({userData, admin, deleteUser}) => {
  const columns = [
    {id:"admin", numeric: false, disablePadding: true, label:  ""},
    {id:"name", numeric: false, disablePadding: true, label: "Email"}
  ];

  return(
    <div>
      {userData ? (
        <Table size='small'>
        <TableHead>
          <TableRow>
            {columns.map(column=> 
              <LabelCell
                key={column.id} 
              >
                <TableSortLabel>
                  {column.label}
                </TableSortLabel>
              </LabelCell>)}
            <TableCell/>
          </TableRow>
        </TableHead>
          
          <TableBody>
            {userData.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <IconCell 
                  col='black' 
                  align='center'>
                    {data.userFridge.admin ? <Star sx={{ color: "#FFD700", margin: "0.5rem 0 1rem 0"}}/> : (admin ? <DeleteUserButton data={data} deleteUser={deleteUser}/> : null)}
                </IconCell>
                <ColumnCell col='black'>{data.username}</ColumnCell>
              </TableRow>))}
          </TableBody>
        </Table>)
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
  fontSize: "14px",
  padding: "0 4px 0 8px",
});

const IconCell = styled(TableCell)`
  padding: 0;
  width: 4rem;
  height: 10px;
`;

