import * as React from "react";
import {Box, Button, Divider, Modal, TextField, Typography} from "@mui/material";
import {useState} from "react";


const FormCreditCard = ({idClient, isOpen, onClose}) => {

    const [numberCard, setNumberCard] = useState('');
    const [descriptionCard, setDescriptionCard] = useState('');


    if (idClient !== null) {
        return (
            <Modal open={isOpen}
                   onClose={onClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                style={{textAlign: 'center', fontWeight: 'bold'}}>
                        Agregar tarjeta
                    </Typography>
                    <Divider style={{marginTop: 8, width: '100%'}}/>
                    <div style={{padding: 10, textAlign: 'center'}}>
                        <TextField style={{marginBottom: 15}} id="standard-basic" label="Numero" variant="standard"/>
                        <TextField id="standard-basic" label="Descripción" variant="standard"/>
                    </div>
                    <div style={{textAlign: 'center', padding: 30}}>
                        <Button style={{marginRight: 10}} onClick={onClose} variant={'outlined'}
                                color="error">Cancelar</Button>
                        <Button style={{marginLeft: 10}} onClick={onClose} variant={'outlined'}>Aceptar</Button>
                    </div>
                </Box>
            </Modal>
        );
    }
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    // boxShadow: 3,
    p: 4,
    borderRadius: 2
};

export default FormCreditCard;