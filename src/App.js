import './App.css';
import ClientList from "./pages/client/ClientList";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import ProductList from "./pages/product/ProductList";
import {AppBar, Button, CssBaseline, Toolbar, Typography} from "@mui/material";
import {environment} from "./environments/environments";
import Discount from "./models/Discount";
import {useState} from "react";
import DiscountsList from "./pages/discount/DiscountsList";
import * as React from "react";
import Sale from "./models/Sale";
import SalesList from "./pages/sales/SalesList";

function App() {

    const [openDiscount, setOpenDiscount] = useState(false);
    const [discount, setDiscount] = useState([]);
    const [open, setOpen] = useState(false);
    const [sales, setSales] = useState([]);

    const handleListDiscount = () => {
        loadDiscount();
        setOpenDiscount(!openDiscount);
    }

    const loadDiscount = () => {
        fetch(environment.baseURL + 'descuentos')
            .then(response => response.json())
            .then(data => {
                let descuento = data.map(d => new Discount(d));
                setDiscount(descuento);
            }).catch((error) => {
            console.log("Error al obtener los descuentos...", error);
        });
    }

    const handleCloseListDiscount = () => {
        setOpenDiscount(!openDiscount);
    }

    const handleListSale = () => {
        loadSales();
        setOpen(!open);
    }

    const loadSales = () => {
        fetch(environment.baseURL + 'ventas')
            .then(response => response.json())
            .then(data => {
                let ventas = data.map(v => new Sale(v));
                setSales(ventas);
            }).catch((error) => {
            console.log(error);
        });
    }

    const handleCloseListSales = () => {
        setOpen(!open);
    }

    return (
        <>
            <Router>
                {/*<CssBaseline />*/}
                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                        position: 'relative',
                    }}
                    style={{background: "#30353f"}}
                >
                    <Toolbar style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant="h6" color="white" noWrap fontWeight={'bold'}>
                            Ventas Online
                        </Typography>
                        <div style={{width: '50%', marginLeft: 360}}>
                            <Button
                                variant={'text'}
                                onClick={() => handleListDiscount()}
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                }}
                            >
                                Descuentos
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => handleListSale()}
                                style={{fontWeight: 'bold', marginLeft: 15, fontSize: 15}}
                            >
                                Ventas
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Routes>
                    {/*<ProductList/>*/}
                    <Route path={"/"} element={<Navigate to={"/clients"}/>}/>
                    <Route path="/clients" element={<ClientList/>}/>
                    <Route path="/products/:idClient" element={<ProductList/>}/>
                </Routes>
                <DiscountsList isOpen={openDiscount} onClose={handleCloseListDiscount} discounts={discount}/>
                <SalesList isOpen={open} onClose={handleCloseListSales} sales={sales}/>
            </Router>
        </>
    );
}

export default App;
