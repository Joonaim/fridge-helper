import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";


const UsersTable = ({userData}) => {
  const columns = [
    {id:"name", numeric: false, disablePadding: true, label: "Name"},
    {id:"admin", numeric: false, disablePadding: true, label:  "Admin"}
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
                <ColumnCell col='black'>{data.username}</ColumnCell>
                <ColumnCell col='black'>{String(data.userFridge.admin)}</ColumnCell>
                { /* <ColumnCell col='black'><RemoveUserModal userId={data.userId} manageItem={manageItem}/></ColumnCell> */ }
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

