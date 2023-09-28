import {
    Box,
    Button, Checkbox, Divider, IconButton,
    ListItem,
    ListItemText,
    Modal,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow, Tooltip,
    Typography
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import * as React from "react";
import Paper from "@mui/material/Paper";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";

const DiscountsList = ({isOpen, onClose, discounts}) => {
    return (
        <Modal open={isOpen}
               onClose={onClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">

            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" style={{fontWeight: 'bold', textAlign: 'center'}}>
                    Descuentos
                </Typography>
                <Divider style={{width: '50%', marginLeft: 200, marginTop: 5}}/>
                <TableContainer style={{width: '100%', height: 250, marginTop: 30}} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Fecha Inicio</TableCell>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Fecha Fin</TableCell>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Descuento</TableCell>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Tipo de Descuento</TableCell>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Marca Producto</TableCell>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Tarjeta</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {discounts.map((discount) => (
                                <TableRow key={discount.id}>
                                    <TableCell style={{textAlign: 'center'}} >{discount.fechaInicio}</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>{discount.fechaFin}</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>{discount.porcentaje}</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>
                                        {discount.marcaProducto ? 'Descuento de Compra' : discount.tarjeta ? 'Descuento de Producto' : '-'}
                                    </TableCell>
                                    <TableCell style={{textAlign: 'center'}}>{discount.marcaProducto ? discount.marcaProducto : '-'}</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>{discount.tarjeta ? discount.tarjeta : '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 300,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    // boxShadow: 3,
    p: 4,
    borderRadius: 2
};

export default DiscountsList;