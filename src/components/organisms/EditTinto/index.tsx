import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import TintoBlocks from '../../molecules/TintoBlocks';
import ViewTinto from '../../atoms/ViewTinto';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { fetchTintoBlocksEntries, getTintoMail } from '../../../services';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const EditTinto = () => {

  let navigate = useNavigate();

  const [tintoBlocks, setTintoBlocks] = useState<[]>([])

  const { id } = useParams() as { id: string };

  const getTintoBlocksEntries = () => {
    fetchTintoBlocksEntries(id)
      .then(response => setTintoBlocks(response.data))
      .catch(error => console.log(error))
  }

  const routeChange = () => {
    getTintoMail(id)
    .then(() => window.location.assign(`${process.env.REACT_APP_EL_TINTO_BASE_API}/cafetera/mails/mail/`))
    .catch(error => {
      if (error.response.status === 404){
        navigate(`/crear-correo/${id}`)
      }
    })
  }


  return(
    <Box 
      sx={{ borderRadius: '12px', padding: '20px', textAlign: 'center'}}
    >
      <Stack direction="column" spacing={2} >
        <TintoBlocks tintoId={id} getTintoBlocksEntries={getTintoBlocksEntries} tintoBlocks={tintoBlocks} />
        <ViewTinto tintoBlocks={tintoBlocks}/>
        <Button 
          variant="contained" 
          endIcon={<NavigateNextIcon />} 
          sx={{width: '30%', alignSelf: 'center'}}
          onClick={routeChange} 
        >
          Armar correo
        </Button>
      </Stack>
    </Box>
  )
}

export default EditTinto;