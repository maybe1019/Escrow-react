import React, { useState } from 'react'
import { shortenAddress } from '@usedapp/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import { toEther, shortenText, calcTime } from './../utils/utils';
import ItemDialog from './ItemDialog';

const status = [
  'OPEN',
  'PENDING',
  'DELIVERY',
  'CONFIRMED',
  'DISPUTTED',
  'REFUNDED',
  'WITHDRAWED',
]

const cols = [
  {
    id: 'itemId',
    label: 'Id',
    style: {
      textAlign: 'center',
      width: 40,
      fontWeight: 'bold'
    }
  },
  {
    id: 'purpose',
    label: 'Purpose',
    style: {
      textAlign: 'center',
      minWidth: 140,
      fontWeight: 'bold'
    }
  },
  {
    id: 'amount',
    label: 'Amount',
    style: {
      textAlign: 'center',
      minWidth: 60,
      fontWeight: 'bold'
    }
  },
  {
    id: 'timestamp',
    label: 'Time',
    style: {
      textAlign: 'center',
      minWidth: 130,
      fontWeight: 'bold'
    }
  },
  {
    id: 'provider',
    label: 'Provider',
    style: {
      textAlign: 'center',
      minWidth: 80,
      fontWeight: 'bold'
    }
  },
  {
    id: 'status',
    label: 'Status',
    style: {
      textAlign: 'center',
      minWidth: 80,
      fontWeight: 'bold'
    }
  }
]

export default function ItemTable({ items }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = id => {
    setSelectedId(id)
    setDialogOpen(true)
  }

  return (
    <TableContainer
      style={{
        borderRadius: 10,
        border: '1px solid #aba'
      }}
      className='shadow'
    >
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
            {cols.map(col => (
              <TableCell style={col.style} key={col.id}>{col.label}</TableCell>
            ))}
            <TableCell style={{textAlign:'center', fontWeight: 'bold'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor: 'white'}}>
          {
            items
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((item, id) => (
                <TableRow tabIndex={-1} key={item.itemId}>
                  <TableCell style={{textAlign:'center'}}>{item.itemId}</TableCell>
                  <TableCell style={{textAlign:'center'}}>{shortenText(item.purpose)}</TableCell>
                  <TableCell style={{textAlign:'center'}}>{toEther(item.amount)}</TableCell>
                  <TableCell style={{textAlign:'center'}}>{calcTime(item.timestamp * 1000)}</TableCell>
                  <TableCell style={{textAlign:'center'}}>{shortenAddress(item.provider)}</TableCell>
                  <TableCell style={{textAlign:'center'}}>
                    <div className='flex-center'>
                      <div className={`badge ${status[item.status]}`}>{status[item.status]}</div>
                    </div>
                  </TableCell>
                  <TableCell style={{textAlign:'center'}}>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => handleView(id + page * rowsPerPage)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{
          backgroundColor: '#e0ebdd'
        }}
      />
      {
        items.length ? 
          <ItemDialog
            handleClose={() => setDialogOpen(false)}
            open={dialogOpen}
            item={items[selectedId]}
          />
        : ''
      }
    </TableContainer>
  )
}
