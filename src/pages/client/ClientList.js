import * as React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader, CircularProgress,
    Divider,
    IconButton,
    ListItem,
    ListItemText,
    Tooltip
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import CreditCard from "../../models/CreditCard";
import {useEffect, useState} from "react";
import CreditCardsList from "../creditCard/CreditCardsList";
import {useNavigate} from "react-router-dom";
import FormCreditCard from "../creditCard/FormCreditCard";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import FormClient from "./FormClient";
import {environment} from "../../environments/environments";
import Client from "../../models/Client";

const ClientList = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openFormCard, setOpenFormCard] = useState(false);
    const [openFormClient, setOpenFormClient] = useState(false);
    const [cards, setCards] = useState([]);
    const [idClient, setIdClient] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [clients, setClients] = useState([null]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        fetch(environment.baseURL + 'clientes')
            .then(response => response.json())
            .then(data => {
                let clientes = data.map(c => new Client(c));
                setClients(clientes);
                setLoading(false);
            }).catch((error) => {
            console.log("Error al obtener los datos...", error);
            setLoading(false);
        });
    }

    if (loading) {
        return (
            <div className={"App"}>
                <header className={"App-header"}>
                    <CircularProgress color="inherit" size={70}/>
                </header>
            </div>
        );
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    function handleSelectClient(client: Client) {
        //Redireccionamos a los productos
        navigate('/products/' + client.id);
    }

    function handleListCard(card: CreditCard[]) {
        setOpen(!open);
        setCards(card);
    }

    const handleCloseListCard = () => {
        setCards(null);
        setOpen(!open);
    }

    const handleCloseFormCard = () => {
        setOpenFormCard(!openFormCard);
    }

    const handleFormCard = (client: Client) => {
        setOpenFormCard(!openFormCard);
        setIdClient(client.id);
    }

    const handleFormClient = () => {
        setOpenFormClient(!openFormClient);
    }

    const handleCloseFormClient = () => {
        setOpenFormClient(!openFormClient);
    }

    const viewList = () => {
        if (clients) {
            return (
                clients.map((client) => (
                    <ListItem key={client.id}>
                        <PersonIcon fontSize={'large'} color={'primary'} style={{ margin: 10 }} />
                        <ListItemText disableTypography style={{ fontSize: 19, fontWeight: 'bold' }}
                                      primary={client.nombre + ' ' + client.apellido} />
                        <Button variant={'contained'} style={{ margin: 15 }}
                                onClick={() => handleSelectClient(client)}>
                            Seleccionar
                        </Button>
                        <Button variant={'contained'} style={{ margin: 15 }}
                                onClick={() => handleListCard(client.tarjetasCredito)}>
                            Ver tarjetas
                        </Button>
                        <Button variant={'contained'} style={{ margin: 15 }}
                                onClick={() => handleFormCard(client)}>
                            Agregar tarjeta
                        </Button>
                    </ListItem>
                ))
            );
        } else {
            // Manejar el caso en que clients es nulo o vacío, por ejemplo, mostrando un mensaje o retornando null.
            return "No hay clientes disponibles"; // O muestra un mensaje de "No hay clientes disponibles"
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <Card style={{height: 400}}>
                    <CardHeader disableTypography style={{fontWeight: 'bold'}} title='Clientes'/>
                    <Divider style={{width: '100%'}}/>
                    <div style={{width: "10%", height: 50, textAlign: 'left', marginLeft: 18}}>
                        <Tooltip title={'Agregar cliente'}>
                            <IconButton
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                color={isHovered ? 'primary' : 'default'}
                                style={{marginLeft: 20}}
                                onClick={() => handleFormClient()}
                            >
                                {isHovered ? <PersonAddAlt1Icon fontSize={'large'} /> :
                                    <PersonAddAltIcon fontSize={"large"}/>}
                            </IconButton>
                        </Tooltip>
                    </div>
                    <CardContent style={{ maxHeight: "calc(100% - 150px)", overflowY: "auto" }}>
                        {viewList()}
                        <CreditCardsList cardClient={cards} isOpen={open} onClose={handleCloseListCard}/>
                        <FormCreditCard idCliente={idClient} isOpen={openFormCard} onClose={handleCloseFormCard} />
                        <FormClient isOpen={openFormClient} onClose={handleCloseFormClient} loadData={loadData}/>
                    </CardContent>
                </Card>
            </header>
        </div>
    );
}

export default ClientList;