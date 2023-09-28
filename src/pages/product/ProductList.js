import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Radio,
    RadioGroup,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import Paper from '@mui/material/Paper';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import * as React from "react";
import {environment} from "../../environments/environments";
import Product from "../../models/Product";
import SalesList from "../sales/SalesList";
import Sale from "../../models/Sale";
import DiscountsList from "../discount/DiscountsList";
import Discount from "../../models/Discount";
import CreditCard from "../../models/CreditCard";

function MuiAlert(props: { elevation: number, severity: string, onClose: handleCloseSnackbar, variant: string, children: ReactNode }) {
    return null;
}

function CloseIcon(props: { fontSize: string }) {
    return null;
}

function ProductList() {

    const params = useParams();
    const {idClient} = params;
    const [idProducts, setIdProducts] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingCalculate, setLoadingCalculate] = useState(false);
    const [idCard, setIdCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [isCardSelected, setIsCardSelected] = useState(false);
    const [montoTotal, setMontoTotal] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const calculateMount = () => {
        if (idCard && idProducts) {
            setLoadingCalculate(true);
            fetch(`${environment.baseURL}ventas/montoTotal/${idCard}?productoIds=${idProducts.join(',')}&clienteId=${idClient}`)
                .then(response => response.json())
                .then(data => {
                    setLoadingCalculate(false);
                    if (data.error) {
                        console.log("error...", data.error);
                    } else {
                        console.log(data);
                        setMontoTotal(data);
                    }
                }).catch((error) => {
                setLoadingCalculate(false);
                console.log("Error al calcular el monto total...", error);
            });
        }
    }

    useEffect(() => {
        loadProducts();
        loadCards();
    }, []);

    useEffect(() => {
        calculateMount();
    }, [idCard, idProducts]);

    const loadProducts = () => {
        fetch(environment.baseURL + 'productos')
            .then(response => response.json())
            .then(data => {
                let productos = data.map(p => new Product(p));
                setProducts(productos);
                setLoading(false);
            }).catch((error) => {
            console.log("Error al obtener los datos...", error);
            setLoading(false);
        });
    }

    const loadCards = () => {
        fetch(environment.baseURL + 'clientes/' + idClient)
            .then(response => response.json())
            .then(data => {
                let tarjetas = data.map(t => new CreditCard(t));
                setCards(tarjetas);
            }).catch((error) => {
            console.log("Error al obtener las tarjetas...", error);
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

    const checkedCheckBox = (idProduct: any) => {
        const updatedProduct = [...idProducts];
        const index = idProducts.findIndex(id => id === idProduct);
        if (isCardSelected) {
            if (index !== -1) {
                updatedProduct.splice(index, 1);
            } else {
                updatedProduct.push(idProduct);
            }
            setIdProducts(updatedProduct);
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCardSelect = (value) => {
        setIdCard(value);
        setIsCardSelected(true);// Establece el estado en verdadero
        //setIdProducts([]); // Limpia los productos seleccionados
    };

    const getMontoTotal = () => {
        if (loadingCalculate) {
            // Muestra el componente de carga mientras se realiza la consulta fetch
            return <CircularProgress style={{marginLeft: 7, marginTop: 3}} color="secondary" size={25}/>;
        } else {
            // Muestra el monto total si loadingCalculate es falso y montoTotal es mayor que 0
            if (montoTotal > 0) {
                return '$ ' + montoTotal.toFixed(2);
            } else {
                return '$ 0.00'; // Puedes mostrar "$ 0.00" si montoTotal no es mayor que 0
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleMakeSale = () => {
        fetch(`${environment.baseURL}ventas/${idCard}?productoIds=${idProducts.join(',')}&clienteId=${idClient}`, {})
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((data) => {
                        if (data.error) {
                            throw new Error(data.error); // Lanza una excepción con el mensaje de error del servidor
                        } else {
                            throw new Error("Error al realizar la venta.");
                        }
                    });
                }
            })
            .then((data) => {
                setLoadingCalculate(false);
                if (data.message) {
                    setOpenSnackbar(true);
                    setSnackbarMessage(data.message);
                }
            })
            .catch((error) => {
                setLoadingCalculate(false);
                setOpenSnackbar(true);
                setSnackbarMessage(error.message);
            });
    }

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
                <CloseIcon fontSize="small" />
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
        <div className="App">
            <header className="App-header">
                <div style={{display: 'flex', width: '90%'}}>
                    <div style={{flex: '1'}}>
                        <Card style={{width: '115%'}}>
                            <CardHeader
                                disableTypography
                                style={{fontWeight: 'bold'}}
                                title="Productos disponibles"
                            />
                            <Divider style={{width: '70%', marginLeft: 100}}/>
                            <TableContainer style={{height: 350}} component={Paper}>
                                <Table>
                                    <CardContent style={{width: '100%'}}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell
                                                    style={{fontWeight: 'bold', textAlign: 'center'}}>Código</TableCell>
                                                <TableCell
                                                    style={{fontWeight: 'bold', textAlign: 'center'}}>Nombre</TableCell>
                                                <TableCell
                                                    style={{fontWeight: 'bold', textAlign: 'center'}}>Marca</TableCell>
                                                <TableCell style={{
                                                    fontWeight: 'bold',
                                                    textAlign: 'center'
                                                }}>Categoria</TableCell>
                                                <TableCell
                                                    style={{fontWeight: 'bold', textAlign: 'center'}}>Precio</TableCell>
                                                <TableCell
                                                    style={{fontWeight: 'bold', textAlign: 'center'}}>Accion</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {products.map((data) => (
                                                <TableRow key={data.id}>
                                                    <TableCell style={{textAlign: 'center'}}>{data.codigo}</TableCell>
                                                    <TableCell
                                                        style={{textAlign: 'center'}}>{data.descripcion}</TableCell>
                                                    <TableCell
                                                        style={{textAlign: 'center'}}>{data.marca.nombre}</TableCell>
                                                    <TableCell
                                                        style={{textAlign: 'center'}}>{data.categoria.nombre}</TableCell>
                                                    <TableCell style={{textAlign: 'center'}}>{'$ '}{data.precio}</TableCell>
                                                    <TableCell style={{textAlign: 'center'}}>
                                                        <Tooltip title={'Editar'}>
                                                            <IconButton
                                                                onMouseEnter={handleMouseEnter}
                                                                onMouseLeave={handleMouseLeave}
                                                                color={isHovered ? 'primary' : 'default'}
                                                                style={{marginLeft: 20}}
                                                                onClick={() => console.log("Se presiono...")}
                                                            >
                                                                {isHovered ? <ModeOutlinedIcon fontSize={'medium'}/> :
                                                                    <ModeOutlinedIcon fontSize={"medium"}/>}
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Checkbox onChange={() => checkedCheckBox(data.id)}
                                                                  disabled={!isCardSelected}
                                                                  checked={idProducts.includes(data.id)}/>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </CardContent>
                                </Table>
                            </TableContainer>
                        </Card>
                    </div>
                    <div
                        style={{
                            flex: '1',
                            marginLeft: '150px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column', // Añade esta propiedad para cambiar la dirección del flexbox a columna
                        }}
                    >
                        <Card style={{width: '100%', margin: 'auto', height: 200}}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                style={{fontSize: 15, fontWeight: 'bold', marginTop: 8}}
                            >
                                Seleccione una tarjeta para realizar la compra
                            </Typography>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                style={{marginLeft: 20, marginTop: 15}}
                            >
                                {cards.map((card) => (
                                    <FormControlLabel
                                        key={card.id}
                                        value={card.numero} // Usar el número de tarjeta como valor
                                        control={<Radio/>}
                                        label={card.descripcion + ' ' + card.numero}
                                        onClick={() => handleCardSelect(card.id)}
                                    />
                                ))}
                            </RadioGroup>
                        </Card>
                        <Card style={{width: '100%', margin: 'auto', height: 200}}>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                style={{fontWeight: 'bold', marginTop: 50}}
                            >
                                Monto total<br/>{getMontoTotal()}
                            </Typography>
                            <Button style={{width: '50%', marginTop: 1}} onClick={() => handleMakeSale()}>
                                Realizar compra
                            </Button>
                        </Card>
                    </div>
                </div>
                {snackbar}
            </header>
        </div>
    );
}

export default ProductList;