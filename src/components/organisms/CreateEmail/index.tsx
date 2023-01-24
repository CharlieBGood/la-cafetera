import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTintoBlocksEntries, createMail, getTinto } from "../../../services";
import ViewTinto from "../../atoms/ViewTinto";
import EmailForm from "../../molecules/EmailForm";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';


const TintoLink = styled(Link)`
    color: black;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const CreateEmail = () => {

  const [tintoBlocks, setTintoBlocks] = useState<[]>([])

  const { tintoId } = useParams() as { tintoId: string };

  const createNewMail = (data: any) => {
    createMail(data)
    .then(() => window.location.assign(`${process.env.REACT_APP_EL_TINTO_BASE_API}/cafetera/mails/mail/`))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchTintoBlocksEntries(tintoId)
    .then(response => setTintoBlocks(response.data))
    .catch(error => console.log(error))
  }, [tintoId])
  
  return (
    <Box 
      sx={{ borderRadius: '12px', padding: '20px', textAlign: 'center'}}
    >
      <Stack direction="column" spacing={2} >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography align='center' variant='h4' style={{fontWeight: '700'}}>
              Tinto
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Stack direction="column" spacing={2}>
            <TintoLink 
              to={`/editar-tinto/${tintoId}`}
            >
              Editar Tinto <EditIcon sx={{marginLeft: '5px', position: 'absolute'}}/>
            </TintoLink>
            <ViewTinto tintoBlocks={tintoBlocks}/>
          </Stack>
          </AccordionDetails>
        </Accordion>
        <EmailForm tintoId={tintoId} createNewMail={createNewMail} />
      </Stack>
    </Box>    
  )
}

export default CreateEmail;