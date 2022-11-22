import * as React from "react";
import {useState, useEffect} from "react";
import { alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import EditItemModal from "./EditItemModal";
import MassActionModal from "./MassActionModal";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import breakpoint from '../Components/breakpoints';
//import { theme } from "../App";


const descendingComparator = (a, b, orderBy)=> {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = ( order, orderBy,) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const headCells = [
  {id:"name", numeric: false, disablePadding: true, label: "Item"},
  {id:"purchaseDate", numeric: true, disablePadding: true, label:  "Purchased"}, 
  {id:"expiryDate", numeric: true, disablePadding: true, label: "Expires"},
];

const EnhancedTableHead = (props)=> {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <Header>
      <TableRow>
        <IconCell />
        {headCells.map((headCell) => (
          <HeaderCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </HeaderCell>
        ))}
        <TableCell/>
      </TableRow>
    </Header>
  );
};


const EnhancedTableToolbar = ({numSelected, deleteItem, selected, massMode, changeMassMode})=> {
  return (
    <Toolbar
      sx={{
        ...(massMode && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <ToolBarContainer>
        <ActionButton onClick={changeMassMode}>Mass mode</ActionButton>
        {massMode && numSelected > 0 && <MassModal deleteItem={deleteItem} selected = {selected}/> } 
        {numSelected > 0 && <SelectedText>{numSelected} items selected</SelectedText>}
      </ToolBarContainer>    
    </Toolbar>
  );
};



const ExpandingRow = ({ row, handleClick, isSelected, manageItem, deleteItem, massMode }) => {
  const [open, setOpen] = useState(false);
  const isExpired = dayjs(row.expiryDate).isBefore(dayjs());
  const isExpiring = dayjs(row.expiryDate).isAfter(dayjs()) && dayjs(row.expiryDate).isBefore(dayjs().add(5, "day"));
  const col = isExpired ? "red" : isExpiring ? "orange" : "black";

  return (
    <>
      <ExpandRow col={open?"#D8DFD7":"white"}>
        <IconCell>
          <ExpandButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ExpandButton>
        </IconCell>
        <Cell
          component="th"         
          scope="row"
          id={row.id}
          padding="none"
          col={col}
        >
          {row.name}{" "}{`(${row.items.length})`}
        </Cell>
        <Cell align="left">{row.purchaseDate ? dayjs(row.purchaseDate).format("DD/MM/YY"): "-"}</Cell>
        <Cell align="left" col={col}>{row.expiryDate ? dayjs(row.expiryDate).format("DD/MM/YY"): "-"}</Cell>
        <Cell/>
      </ExpandRow>

      <TableRow>
        <HiddenCell colSpan={6} >             
          <Collapse in={open} timeout="auto" unmountOnExit> 
            <Table> 
              <TableBody padding={0}>
                {row.items.map((subRow) => {
                  const isExpired = dayjs(subRow.expiryDate).isBefore(dayjs());
                  const isExpiring = dayjs(subRow.expiryDate).isAfter(dayjs()) && dayjs(row.expiryDate).isBefore(dayjs().add(5, "day"));
                  const col = isExpired ? "red" : isExpiring ? "orange" : "black";
                  return(
                    <ExpandedRow
                      hover={massMode ? true: false}
                      onClick={(event) => handleClick(event, subRow.id)}
                      role="checkbox"
                      aria-checked={isSelected(subRow.id)}
                      tabIndex={-1}
                      key={subRow.id}
                      selected={isSelected(subRow.id)}
                    >
                    
                      <IconCell>
                        {massMode && <Checkbox
                          color="primary"
                          checked={isSelected(subRow.id)}
                        />}
                      </IconCell>
                  
                      <Cell component="th"
                        align="left"
                        id={subRow.id}
                        scope="row"
                        padding="none"
                        col={col}>
                        {subRow.name}
                      </Cell>

                      <Cell align="left">{subRow.purchaseDate ? dayjs(subRow.purchaseDate).format("DD/MM/YY"): "-"}</Cell>

                      <Cell align="left" col={col}>{subRow.expiryDate ? dayjs(subRow.expiryDate).format("DD/MM/YY"): "-"}</Cell>

                      {!massMode && 
                        <IconCell col='black' align="left">
                          <EditItemModal item={subRow} manageItem={manageItem} deleteItem={deleteItem}/>
                        </IconCell>
                      }
                    </ExpandedRow>
                  );
                } )}
              
              </TableBody>
            </Table>
          </Collapse>
        </HiddenCell>
      </TableRow>

      
    </>
  );
};


const ItemTable = ({data, manageItem, deleteItem}) => {

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [massMode, setMassMode] = useState(false);

  useEffect(()=> {
    setSelected([]);
    setMassMode(false);
  }, [data]);

  const handleRequestSort = (
    event,
    property,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleClick = (event, id) => {
    if (massMode){
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }

      setSelected(newSelected);}
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const changeMassMode = (e) => {
    e.preventDefault();
    if (massMode) {
      setSelected([]);
    }
    setMassMode(!massMode);
  };

  return (<>
    {data ?
      <>
        <TableContainer>        
          <EnhancedTableToolbar numSelected={selected.length} massMode={massMode} changeMassMode={changeMassMode} deleteItem = {deleteItem} selected={selected} />
          <Table
            aria-labelledby="tableTitle"
            size='small'
            padding='none'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.sort(getComparator(order, orderBy)).slice()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  const isExpired = dayjs(row.expiryDate).isBefore(dayjs());
                  const isExpiring = dayjs(row.expiryDate).isAfter(dayjs()) && dayjs(row.expiryDate).isBefore(dayjs().add(5, "day"));
                  const col = isExpired ? "red" : isExpiring ? "orange" : "black";
                  return (<React.Fragment key={index}>
                    {row.items.length < 2 ?
                      <Row
                        hover={massMode ? true: false}
                        onClick={(event) => handleClick(event, row.items[0].id)}
                        role="checkbox"
                        aria-checked={isSelected(row.items[0].id)}
                        tabIndex={-1}
                        key={row.items[0].id}
                        selected={isSelected(row.items[0].id)}
                      >
                        
                        <IconCell>
                          {massMode && 
                           <Checkbox
                             color="primary"
                             checked={isSelected(row.items[0].id)}
                           />}
                        </IconCell>
                        <Cell
                          component="th"
                          id={row.items[0].id}
                          scope="row"
                          padding="none"
                          align="left"
                          col={col}
                        >
                          {row.name}
                        </Cell>
                        <Cell align="left">{row.purchaseDate ? dayjs(row.purchaseDate).format("DD/MM/YY"): "-"}</Cell>
                        <Cell align="left" col={col}>{row.expiryDate ? dayjs(row.expiryDate).format("DD/MM/YY"): "-"}</Cell>
                        {!massMode &&
                        <Cell col='black'
                          align="left">
                          <EditItemModal item={row.items[0]} manageItem={manageItem} deleteItem={deleteItem}/>
                        </Cell>
                        }
                      </Row> :
                      <ExpandingRow key={row.items[0].id} row={row} isSelected={isSelected} handleClick={handleClick} manageItem={manageItem} deleteItem={deleteItem} massMode={massMode}/>}
                  </React.Fragment>
                  );
                })}
              {emptyRows > 0 && (
                <Row
                
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </Row>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
      :
      <Skeleton variant="rectangular" width={210} height={60} />}
  </>
  );
};

export default ItemTable;

const TableContainer = styled.div`
@media only screen and ${breakpoint.device.sm}{
  margin: 16px 32px;
  border: 1px solid #D2D2D2;
}`


const Header = styled(TableHead)`

margin: 1rem;
`
;

const HeaderCell = styled(TableCell)`
padding: 8px 0;
@media only screen and ${breakpoint.device.sm}{
font-size: 20px;

}
`
;

const ExpandButton = styled(IconButton)`
margin: 10px 0 10px 0`;

const IconCell = styled(TableCell)`
  padding: 0;
  width: 4rem;
  height: 10px
`;

const Row = styled(TableRow)`
height: 40px`;

const Cell = styled(TableCell)((props) => ({
  color: props.col || "black",
  padding: "0",
  height:"60px",
}));


const ExpandRow = styled(TableRow)((props) => ({
  backgroundColor: props.col || "white",
  fontSize: "12px",
  padding: "0 4px 0 8px",
}));

const ExpandedRow = styled(TableRow)`
...Row;
background-color: #EFEFEF;
border-bottom: none;
`;
 
const HiddenCell = styled(TableCell)`
border-bottom: none
`;

const ToolBarContainer = styled.div`
width:100%;

display: flex;
flex-direction: row-reverse;
padding: 0.5rem 1rem;

@media only screen and ${breakpoint.device.sm}{
font-size: 20px;
margin: 16px 0;
}
`;

const SelectedText = styled.div`
flex-grow: 3;
padding:0;
`;

const MassModal = styled(MassActionModal)`
`;

const ActionButton = styled(Button)`
color: #626E60;
fontSize: 16px;
&:hover: {
  color: #384036;

}
`
