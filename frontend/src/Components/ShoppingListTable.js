import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import { Checkbox, Grid, IconButton, TableContainer, Toolbar, Tooltip, Typography } from "@mui/material";
import EditSlistItemModal from "./EditSListItemModal";
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingListTable = ({data, manageItem, deleteSelected}) => {

  const [selected, setSelected] = useState([]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

    setSelected(newSelected);
  }

  const handleSelectAllClick = (event) => {
    if (selected.length == 0) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const deleteSelectedWrapper = () => {
    deleteSelected({itemIds: selected})
    setSelected([])
  }

  const columns = [
    {id:"name", numeric: false, disablePadding: true, label: "Item"},
    {id:"amount", numeric: true, disablePadding: true, label:  "Amount"}
  ]

  return(
    <>
      {
        data ? (
          <>

            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }} >
                  {selected.length > 0 ? (
                    <Typography
                      sx={{ flex: '1 1 100%' }}
                      color="inherit"
                      variant="subtitle1"
                      component="div"
                    >
                      {selected.length} selected
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ flex: '1 1 100%' }}
                      variant="h6"
                      id="tableTitle"
                      component="div"
                    >
                      Products
                    </Typography>
                  )}

                  {selected.length > 0 && (
                    <Tooltip title="Delete">
                      <IconButton onClick={deleteSelectedWrapper}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
            </Toolbar>

            <TableContainer component={Box}>
                <Table size='meidum'>
                    <TableHead sx={{ margin: 0 }}>
                        <TableRow>
                            <LabelCell>
                              <Checkbox
                                indeterminate={selected.length > 0 && selected.length < data.length}
                                checked={data.length > 0 && selected.length === data.length}
                                onChange={handleSelectAllClick}
                                inputProps={{
                                  'aria-label': 'select all desserts',
                                }}
                              />
                            </LabelCell>
                            {columns.map(column => 
                                <LabelCell key={column.id}>
                                    {column.label}
                                </LabelCell>
                            )}
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {data.map((data, index) => {

                          const isItemSelected = isSelected(data.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                                hover
                                key={data.id}
                                role="checkbox"
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                            >
                                <ColumnCell>
                                    <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{
                                      'aria-labelledby': labelId,
                                    }}
                                    onClick={(event) => handleClick(event, data.id)}
                                    />
                                </ColumnCell>
                                <ColumnCell>{data.name}</ColumnCell>
                                <ColumnCell>{ data.amount }</ColumnCell>
                                <ColumnCell><EditSlistItemModal item={data} manageItem={manageItem} /></ColumnCell>
                            </TableRow>)

                        })}
                    </TableBody>
                </Table>
              </TableContainer>
            </>
            )
            :
            <Grid container direction="column" spacing={1}>
                <Grid item><Skeleton variant="rectangular" animation="wave"/></Grid>
                <Grid item><Skeleton variant="rectangular" animation="wave"/></Grid>
                <Grid item><Skeleton variant="rectangular" animation="wave"/></Grid>
                <Grid item><Skeleton variant="rectangular" animation="wave"/></Grid>
            </Grid>
        }
    </>
  );
};

export default ShoppingListTable;


const ColumnCell = styled(TableCell)((props) => ({
  color: props.col || "black",
  fontSize: "12px",
  padding: "0 4px 0 8px",
}));

const LabelCell = styled(TableCell)({
  fontSize: "14px",
  padding: "0 4px 0 8px",
});

