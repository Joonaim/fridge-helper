import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/system";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import EditItemModal from "./EditItemModal";
import Skeleton from "@mui/material/Skeleton";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


//SORTTAUS EI TOIMI OIKEIN T"LL" HETKELL"

const ProductsTable = ({data, manageItem}) => {
  const descending = "desc";
  const ascending = "asc";
  const [order, setOrder] = useState(ascending);
  const [orderBy, setOrderBy] = useState("expiryDate");
  const [sortedData, setSortedData] = useState();
  const columns = [
    {id:"name", numeric: false, disablePadding: true, label: "Item"},
    {id:"purchaseDate", numeric: true, disablePadding: true, label:  "Purchased"}, 
    {id:"expiryDate", numeric: true, disablePadding: true, label: "Expires"}
  ];


  useEffect(()=>{
    sortData();
  }, [data, order, orderBy]);

  const handleRequestSort = (e, property) => {
    e.preventDefault();
    if (orderBy === property){
      if( order === ascending){
        setOrder(descending);
      }
      else if (order === descending){
        setOrder(ascending);
      }
    }
    else{
      setOrderBy(property);
      setOrder(descending);
    }
  };

  const sortingFunction = (data) =>{
    const newData = data?.sort((a, b) => {
      if (a[orderBy] > b[orderBy]){
        if (order === "asc"){
          return 1;
        }
        return -1;}
      if (a[orderBy] < b[orderBy]){
        if (order === "asc"){
          return -1;
        }
        return 1;}
      
    });
    return newData;};

  const sortData = () =>{
    if (data) {
      setSortedData(sortingFunction(data));
    }};

  return(
    <div>
      {sortedData ? (
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell/>
              {columns.map(column=> 
                <LabelCell
                  key={column.id} 
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={e => handleRequestSort(e, column.id)}
                  >
                    {column.label}
                    {orderBy === column.id && (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                      </Box>)}
                  </TableSortLabel>
                </LabelCell>)}
              <TableCell/>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {sortedData.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <ColumnCell col='black'>
                  {dayjs(data.expiryDate).isBefore(dayjs()) && <ErrorOutlineIcon fontSize='small' color='error'/>}
                  {dayjs(data.expiryDate).isAfter(dayjs()) && dayjs(data.expiryDate).isBefore(dayjs().add(5, "day")) && <WarningAmberIcon fontSize='small' color='warning'/>}
                </ColumnCell>
                <ColumnCell>{data.name}</ColumnCell>
                <ColumnCell col='black'>{dayjs(data.purchaseDate).format("DD/MM/YY") }</ColumnCell>
                <ColumnCell col={dayjs(data.expiryDate).isBefore(dayjs()) ? "red": (dayjs(data.expiryDate).isAfter(dayjs()) && dayjs(data.expiryDate).isBefore(dayjs().add(5, "day")) ?"blue":"black")}>{data.expiryDate ? dayjs(data.expiryDate).format("DD/MM/YY"): "-"}</ColumnCell>
                <ColumnCell col='black'><EditItemModal item={data} manageItem={manageItem}/></ColumnCell>
              </TableRow>))}
          </TableBody>
        </Table>)
        :
        <div>
          <Skeleton variant="rectangular" animation="wave"/>
          <Skeleton variant="rectangular" animation="wave"/>
          <Skeleton variant="rectangular" animation="wave"/>
        </div>}</div>
  );
};

export default ProductsTable;


const ColumnCell = styled(TableCell)((props) => ({
  color: props.col || "black",
  fontSize: "12px",
  padding: "0 4px 0 8px",
}));

const LabelCell = styled(TableCell)({
  fontSize: "14px",
  padding: "0 4px 0 8px",
});

