import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableCell, TableRow, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { DragIndicator } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DangerousIcon from '@mui/icons-material/Dangerous';

type Props = {
  item: any
  updateTintoBlockEntry: Function,
  removeTintoBlockEntry: Function,
  updateTintoBlock: Function,
}

const TintoBlockEntry = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

  const [open, setOpen] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.item[e.target.name] = !props.item[e.target.name]
    props.updateTintoBlockEntry(props.item)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteElement = () => {
    setOpen(false);
    props.removeTintoBlockEntry(props.item.id)
  }

  const updateOldTintoBlock = () => {
    props.updateTintoBlock(props.item.tinto_block)
  }

  return(
    <React.Fragment>
      <TableRow
        key={props.item.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <div ref={ref} style={{
            display: "flex",
            alignItems: "center",
            cursor: "grab",
            bottom: 0,
            left: 0,
            background: "white",
            padding: "2px 4px",
            borderRadius: 4
          }}>
            <DragIndicator sx={{fontSize: '30px'}} />
          </div>
        </TableCell>
        <TableCell align="center" sx={{maxWidth: '40px'}}>
          <Typography noWrap sx={{ textOverflow: 'ellipsis'}}>
            {props.item.position}. {props.item.tinto_block.type.label} - {props.item.tinto_block.title}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Checkbox defaultChecked={props.item.show_share_buttons} name='show_share_buttons' onChange={onChange} />
        </TableCell>
        <TableCell align="center">
          <Checkbox disabled defaultChecked={props.item.show_rate_buttons} name='show_rate_buttons' onChange={onChange} />
        </TableCell>
        <TableCell align="center">
          <Checkbox disabled defaultChecked={props.item.show_reading_time} name='show_reading_time' onChange={onChange} />
        </TableCell>
        <TableCell align="center">
          <Checkbox defaultChecked={props.item.break_line} name='break_line' onChange={onChange} />
        </TableCell>
        <TableCell align="center">
          <EditIcon onClick={updateOldTintoBlock} sx={{cursor: 'pointer'}}/>
        </TableCell>
        <TableCell align="center">
          <DeleteForeverIcon onClick={handleClickOpen} sx={{cursor: 'pointer'}}/>
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{alignItems: 'center', display: 'inherit'}}>
          <DangerousIcon fontSize="large" sx={{color: 'red', marginRight: '5px'}} />
          {`Está seguro de eliminar el bloque ${props.item.position}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.item.tinto_block.type} - {props.item.tinto_block.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={deleteElement} autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
});

export default TintoBlockEntry;