import {
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Modal,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {environment} from "../../environments/environments";

function CloseIcon(props: { fontSize: string }) {
    return null;
}

const FormClient = ({isOpen, onClose, loadData}) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleNombreChange = (event) => {
        console.log("Nombre: ", event.target.value);
        setNombre(event.target.value);
    }

    const handleApellidoChange = (event) => {
        console.log("Apellido: ", event.target.value);
        setApellido(event.target.value);
    }

    const handleDniChange = (event) => {
        console.log("Dni: ", event.target.value);
        setDni(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleAddClient = () => {
        const cliente = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            email: email,
        };
        fetch(environment.baseURL + 'clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente)
        })
            .then(response => {
                if (response.ok) {
                    clearTextField();
                    loadData();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || "Error al registrar al cliente.");
                    });
                }
            })
            .catch((error) => {
                setOpenSnackbar(true);
                setSnackbarMessage(error.message);
            });
    }

    // if (loading) {
    //     return (
    //         <div className={"App"}>
    //             <header className={"App-header"}>
    //                 <CircularProgress color="inherit" size={70}/>
    //             </header>
    //         </div>
    //     );
    // }

    const clearTextField = () => {
        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={() => handleCloseSnackbar()}>
                Cerrar
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleCloseSnackbar()}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    const snackbar = openSnackbar && (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => handleCloseSnackbar()}
            message={snackbarMessage}
            action={action}
        />
    );

    return (
        <div>
            <Modal open={isOpen}
                   onClose={onClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                style={{textAlign: 'center', fontWeight: 'bold'}}>
                        Agregar cliente
                    </Typography>
                    <Divider style={{marginTop: 8, width: '100%'}}/>
                    <div style={{padding: 10, textAlign: 'center'}}>
                        <TextField
                            style={{marginBottom: 8}}
                            id="nombre"
                            label="Nombre"
                            variant="standard"
                            value={nombre}
                            onChange={handleNombreChange}
                        />
                        <TextField
                            style={{marginBottom: 8}}
                            id="apellido"
                            label="Apellido"
                            variant="standard"
                            value={apellido}
                            onChange={handleApellidoChange}
                        />
                        <TextField
                            style={{marginBottom: 8}}
                            id="dni"
                            label="Dni"
                            variant="standard"
                            value={dni}
                            onChange={handleDniChange}
                        />
                        <TextField
                            style={{marginBottom: 8}}
                            id="email"
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div style={{textAlign: 'center', padding: 30}}>
                        <Button
                            style={{marginRight: 10}}
                            onClick={onClose}
                            variant={'outlined'}
                            color="error"
                        >
                            Cancelar
                        </Button>
                        <Button style={{marginLeft: 10}} onClick={handleAddClient} variant={'outlined'}>Aceptar</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
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

export default FormClient;