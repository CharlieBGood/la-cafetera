import { useEffect, useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import EditTintoBlocks from "../EditTintoBlocks";
import { TintoBlocksProps } from "./types";
import { 
  createTintoBlock,
  patchTintoBlockEntry, 
  deleteTintoBlockEntry, 
  switchPositionsInTintoBlockEntries,
  patchTintoBlock
} from "../../../services";
import TableDragAndDrop from "../TableDragAndDrop";

const tintoBlocksEntriesHeaders = [
  {label: '', width: '2%'},
  {label: 'Entrada', width: '30%'},
  {label: 'Compartir', width: 'auto'},
  {label: 'Calificar', width: 'auto'},
  {label: 'Tiempo de lectura', width: 'auto'},
  {label: 'Separador', width: 'auto'},
  {label: 'Editar', width: 'auto'},
  {label: 'Eliminar', width: 'auto'},
]


const TintoBlocks: React.FC<TintoBlocksProps>= ({tintoId, getTintoBlocksEntries, tintoBlocks}) => {

    const [openCreateTintoBlock, setOpenCreateTintoBlock] = useState<boolean>(false);
    const [openEditTintoBlock, setOpenEditTintoBlock] = useState<boolean>(false);
    const [defaultEditTintoBlockValues, setDefaultEditTintoBlockValues] = useState<any>({})

    const handleClickOpenCreateTintoBlock = () => {
      setOpenCreateTintoBlock(true);
    };
    
    const handleCloseCreateTintoBlock = () => {
      setOpenCreateTintoBlock(false);
    };
    
    const handleOpenEditOldTintoBlock = (data: any) => {
      setDefaultEditTintoBlockValues(data);
      setOpenEditTintoBlock(true);
    }
    
    const handleCloseEditTintoBlock = () => {
      setOpenEditTintoBlock(false);
    };

    const createNewTintoBlock = (data: any) => {
      data['tinto'] = tintoId
      createTintoBlock(data)
      .then(() => {setOpenCreateTintoBlock(false); getTintoBlocksEntries()})
      .catch(error => console.log(error))
    };

    const updateTintoBlockEntry = (data: any) => {
      const patchData = {
        show_rate_buttons: data.show_rate_buttons,
        show_reading_time: data.show_reading_time,
        show_share_buttons: data.show_share_buttons,
        break_line: data.break_line
      }
      patchTintoBlockEntry(data.id, patchData)
      .then(() => getTintoBlocksEntries())
      .catch(error => console.log(error))
    }

    const removeTintoBlockEntry = (id: string) => {
      deleteTintoBlockEntry(id)
      .then(() => getTintoBlocksEntries())
      .catch(error => console.log(error))
    }

    const changeTintoBlocksPositions = (data: any) => {
      data.tinto = parseInt(tintoId);
      switchPositionsInTintoBlockEntries(data)
      .then(() => getTintoBlocksEntries())
      .catch(error => console.log(error))
    }

    const updateOldTintoBlock = (data: any) => {
      patchTintoBlock(data.id, data)
      .then(response => {setOpenEditTintoBlock(false); getTintoBlocksEntries()})
      .catch(error => console.log(error))
    }

    useEffect(() => {
      if (tintoId){
        getTintoBlocksEntries()
      }
    // eslint-disable-next-line
    }, [tintoId])
  
    return(
        <Paper variant="outlined" sx={{padding: '20px', borderRadius: '12px', textAlign: 'center'}}>
            <Typography align='center' variant='h2' style={{margin: '0 0 40px 0', fontWeight: '700'}}>
              Bloques
            </Typography>
            <TableDragAndDrop 
              updateTintoBlock={handleOpenEditOldTintoBlock}
              onPositionUpdate={changeTintoBlocksPositions}
              removeTintoBlockEntry={removeTintoBlockEntry}
              updateTintoBlockEntry={updateTintoBlockEntry} 
              tableHeaders={tintoBlocksEntriesHeaders} 
              tableDragAndDropElements={tintoBlocks} 
            />
            <Button sx={{marginTop: '30px'}} onClick={handleClickOpenCreateTintoBlock} variant="outlined">Agregar</Button>
            <EditTintoBlocks 
              open={openCreateTintoBlock} 
              createNewTintoBlock={createNewTintoBlock} 
              handleClose={handleCloseCreateTintoBlock} 
            />
            <EditTintoBlocks 
              defaultValues={defaultEditTintoBlockValues}
              open={openEditTintoBlock} 
              editTintoBlock={updateOldTintoBlock} 
              handleClose={handleCloseEditTintoBlock} 
            />
        </Paper>
    )
  }
  
  export default TintoBlocks;