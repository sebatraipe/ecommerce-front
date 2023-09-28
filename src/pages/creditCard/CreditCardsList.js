import * as React from 'react';
import {Box, Button, ListItem, ListItemText, Modal, Typography} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from "@mui/icons-material/Person";

const CreditCardsList = ({cardClient, isOpen, onClose}) => {
    if (cardClient) {
        return (
            <Modal open={isOpen}
                   onClose={onClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontWeight: 'bold'}}>
                        Tarjetas
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {cardClient.map((card) => (
                            <ListItem key={card.id}>
                                <CreditCardIcon color={"primary"} style={{margin: 10}}/>
                                <ListItemText primary={card.descripcion + ' ' + card.numero}/>
                            </ListItem>
                        ))}
                    </Typography>
                    <div style={{textAlign: 'center'}}>
                        <Button onClick={onClose} variant={'contained'} color={'error'}>Cerrar</Button>
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

export default CreditCardsList;