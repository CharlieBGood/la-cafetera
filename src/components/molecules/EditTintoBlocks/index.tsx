import { Button, Dialog, DialogActions, DialogContent, Stack } from "@mui/material"
import { useEffect, useState } from "react";
import {FormContainer, TextFieldElement, SelectElement} from 'react-hook-form-mui'
import WYSIWYGEditor from "../../atoms/WYSIWYGEditor";
import { EditTintoBlocksProps, TintoBlockEntryTypeProps, NewsTypeProps, DefaultValues, EditTintoBlockValues } from "./types";
import { getTintoBlockEntryTypes, getNewsTypes } from "../../../services";
import { Toaster, toast } from "react-hot-toast";


const EditTintoBlocks: React.FC<EditTintoBlocksProps> = ({
  open, handleClose, createNewTintoBlock, editTintoBlock, defaultValues
}) => {

  const [tintoBlockEntryTypesOptions, setTintoBlockEntryTypesOptions] = useState<Array<TintoBlockEntryTypeProps>>([])
  const [newsTypesOptions, setNewsTypesOptions] = useState<Array<NewsTypeProps>>([])
  const [displayNewsTypesOptions, setDisplayNewsTypesOptions] = useState<string>('none')

  const onSubmit = (data: DefaultValues) => {
    if (displayNewsTypesOptions === 'none'){
      data.news_type = undefined
    }
    if (typeof data.type === 'number' && data.type === 1 && (data.news_type === undefined || null)){
      toast.error('Debes seleccionar un tipo de historia.')
    }
    else if (createNewTintoBlock){
      createNewTintoBlock(data)
    }
    else if (editTintoBlock){
      const editTintoData: EditTintoBlockValues = {
        id: data.id,
        html: data.html,
        title: data.title,
        type: typeof data.type === 'object' ? data.type.id : data.type,
        news_type: typeof data.news_type === 'object' ? data.news_type.id : data.news_type
      }
      editTintoBlock(editTintoData)
    }
  }

  const onTypeChange = (value: number) => {
    if (tintoBlockEntryTypesOptions.filter(type => type.id === value && type.name === 'News').length > 0){
      getNewsTypes()
      .then(response => setNewsTypesOptions(response.data.results))
      .catch(error => console.log(error))
      setDisplayNewsTypesOptions('')
    }
    else {
      setDisplayNewsTypesOptions('none')
    }
  } ; // Evente handler

  useEffect(() => {
    getTintoBlockEntryTypes()
    .then(response => setTintoBlockEntryTypesOptions(response.data.results))
    .catch(error => console.log(error))
  }, [])  

  useEffect(() => {
    if(
      open 
      && defaultValues 
      && tintoBlockEntryTypesOptions.filter(
        type => type.id === defaultValues.type.id && type.name === 'News').length > 0
    ) {
      getNewsTypes()
      .then(response => setNewsTypesOptions(response.data.results))
      .catch(error => console.log(error))
      setDisplayNewsTypesOptions('')
    }
    else if (
      open 
      && defaultValues 
      && tintoBlockEntryTypesOptions.filter(
        type => type.id === defaultValues.type.id && type.name === 'News').length === 0
    ){
      setNewsTypesOptions([])
      setDisplayNewsTypesOptions('none')
    }
  }, [open, defaultValues, tintoBlockEntryTypesOptions])

  const handleNullDefaultValues = (values: any) => {
    for (var key of Object.keys(values)) {
      if (values[key] === null){
        values[key] = undefined;
      }  
    }
    return values
  }

  return(
    <div>
      <Dialog
        maxWidth='md'
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEnforceFocus={true}
      >
        <FormContainer
          defaultValues={defaultValues ? handleNullDefaultValues(defaultValues) : {}}
          onSuccess={onSubmit}
        >
          <DialogContent>
              <Stack direction={'column'} spacing={2}>
                <TextFieldElement name="title" label="Título" required/>
                <WYSIWYGEditor name="html" />
                <SelectElement
                  name="type"
                  label="Tipo"
                  options={tintoBlockEntryTypesOptions}
                  onChange={onTypeChange}
                  required
                />
                <SelectElement
                  name="news_type"
                  label="Tipo de historia"
                  options={newsTypesOptions}
                  sx={{display: displayNewsTypesOptions}}
                />
              </Stack>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type={'submit'}>
              {createNewTintoBlock ? 'Crear' : 'Actualizar'}
            </Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default EditTintoBlocks;