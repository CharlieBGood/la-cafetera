import { Button, Paper } from "@mui/material";
import { FormContainer, TextFieldElement, SelectElement, DateTimePickerElement } from "react-hook-form-mui";
import DateFnsProvider from "../../atoms/DateFnsProvider";
import { EmailFormProps } from "./types";


const emailTypeOptions = [
    {id: 'Daily', label: 'Diario'},
    {id: 'Test', label: 'Prueba'},
    {id: 'Promotion', label: 'Promoción'},
    {id: 'Welcome', label: 'Bienvenida'}
]

const emailVersionOptions = [
    {id: 'A', label: 'A'},
    {id: 'B', label: 'B'},
    {id: 'DEFAULT', label: 'Testeo en blanco'}
]

const EmailForm: React.FC<EmailFormProps> = ({tintoId, createNewMail}) => {

    const onSubmit = (data: any) => {
        createNewMail(data);
    }

    return (
        <Paper variant="outlined" sx={{borderRadius: '12px', padding: '20px', textAlign: 'center'}}>
            <DateFnsProvider>
            <FormContainer
                onSuccess={onSubmit}
                defaultValues={{tinto: tintoId}}
            >
                <TextFieldElement 
                    name="tinto"
                    label="Tinto"
                    sx={{display: 'none'}}
                    required
                />
                <TextFieldElement 
                    name="subject"
                    label="Asunto"
                    sx={{width: '100%', margin: '0 0 20px 0'}}
                    required
                />
                <SelectElement 
                    name="type"
                    label="Tipo de correo"
                    options={emailTypeOptions}
                    sx={{width: '100%', margin: '0 0 20px 0', textAlign: 'left'}}
                    required
                />
                <TextFieldElement 
                    name="test_email"
                    label="Correo de prueba"
                    sx={{width: '100%', margin: '0 0 20px 0'}}
                />
                <SelectElement 
                    name="version"
                    label="Versión del correo"
                    options={emailVersionOptions}
                    sx={{width: '100%', margin: '0 0 20px 0', textAlign: 'left'}}
                />
                <DateTimePickerElement
                    label="Fecha de despacho"
                    name="dispatch_date"
                    required
                    inputProps={{sx: {width: '100%', margin: '0 0 20px 0'}}}
                />
                <TextFieldElement 
                    name="tweet"
                    label="Tweet"
                    sx={{width: '100%', margin: '0 0 20px 0'}}
                    required
                />
                <TextFieldElement 
                    name="subject_message"
                    label="Mesaje del asunto"
                    sx={{width: '100%', margin: '0 0 20px 0'}}
                    required
                />
                <Button autoFocus variant="contained" type={'submit'}>
                    Crear
                </Button>
            </FormContainer>
            </DateFnsProvider>
        </Paper>
    )
}

export default EmailForm;