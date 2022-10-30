import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { styled } from "@mui/system";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import EditItemModal from './EditItemModal';


//SORTTAUS EI TOIMI OIKEIN T"LL" HETKELL"

const ProductsTable = ({data, manageItem}) => {
    const descending = 'desc'
    const ascending = 'asc'
    const [order, setOrder] = useState(ascending)
    const [orderBy, setOrderBy] = useState('expiryDate');
    const [isLoading, setLoading]= useState(true)
    const [sortedData, setSortedData] = useState()
    const columns = [
      {id:'name', numeric: false, disablePadding: true, label: 'item'},
      {id:'purchaseDate', numeric: true, disablePadding: true, label:  'purchased'}, 
      {id:'expiryDate', numeric: true, disablePadding: true, label: 'expires'}]


  useEffect(()=>{
    sortData()
  }, [data, order, orderBy]);

    const handleRequestSort = (
      e,
      property
    ) => {
      e.preventDefault()
      setLoading(true)
      if (orderBy === property){
        if( order === ascending){
          setOrder(descending)
        }
        else if (order === descending){
          setOrder(ascending)
        }
      }
      else{
          setOrderBy(property)
          setOrder(descending)
        }
    };

  const sortingFunction = (data) =>{
    const newData = data?.sort((a, b) => {
      if (a[orderBy] > b[orderBy]){
        console.log('1')
        console.log(order)
        if (order === 'asc'){
            return 1
        }
        return -1;}
      if (a[orderBy] < b[orderBy]){
        console.log('2')
         if (order === 'asc'){
            return -1
        }
        return 1;}
      
      })
      console.log(newData)
    return newData}

const sortData = () =>{
  console.log('here', data)
  if (data) {
    setSortedData(sortingFunction(data))
    setLoading(false)
}}

    return(
        <div>
        {sortedData && !isLoading && (
        <Table size='small'>
        <TableHead>
          <TableRow>
            {columns.map(column=> 
              <ColumnCell 
                key={column.id} 
                sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={e => handleRequestSort(e, column.id)}
                  >
                    {column.label}
                    {orderBy === column.id && (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>)}
                  </TableSortLabel>
                  
              </ColumnCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((data) => (
            <TableRow
            key={data.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell>{data.name}</TableCell>
            
            <TableCell>{dayjs(data.purchaseDate).format('DD/MM/YY') }</TableCell>
            <TableCell>{data.expiryDate ? dayjs(data.expiryDate).format('DD/MM/YY'): '-'}</TableCell>
            <TableCell>{data.id}</TableCell><TableCell><EditItemModal item={data} manageItem={manageItem}/></TableCell>
          </TableRow>))}
        </TableBody>
        </Table>)}</div>
    )
}

export default ProductsTable


const ColumnCell = styled(TableCell)({

})