import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Button, Divider, InputLabel, List,
    ListItem,
    ListItemText, MenuItem,
    Modal, OutlinedInput, Select,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import * as React from "react";
import Paper from "@mui/material/Paper";
import {useState} from "react";

function ExpandMoreIcon() {
    return null;
}

const SalesList = ({isOpen, onClose, sales}) => {

    const [expandedRow, setExpandedRow] = useState(null);

    const getDate = (fechaHora: Date) => {

        let fecha = new Date(fechaHora);

        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Nota: los meses van de 0 a 11
        const anio = fecha.getFullYear();
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');

        return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
    }

    return (
        <Modal open={isOpen}
               onClose={onClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">

            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2"
                            style={{fontWeight: 'bold', textAlign: 'center'}}>
                    Ventas
                </Typography>
                <Divider style={{width: '30%', marginLeft: 250, marginTop: 5}}/>
                <TableContainer style={{width: '100%', height: 250, marginTop: 20}} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Fecha y Hora</TableCell>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Cliente</TableCell>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Productos</TableCell>
                                <TableCell style={{fontWeight: 'bold', textAlign: 'center'}}>Monto total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sales.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell
                                        style={{textAlign: 'center'}}>{getDate(sale.fechaHora)}</TableCell>
                                    <TableCell
                                        style={{textAlign: 'center'}}>{sale.cliente.nombre} {sale.cliente.apellido}</TableCell>
                                    <TableCell style={{ textAlign: 'center', width: '32%'}}>
                                        <Accordion  style={{ width: '100%'}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>Productos</Typography>
                                            </AccordionSummary>
                                            <Divider/>
                                            <AccordionDetails>
                                                {
                                                    sale.productoVendidos &&
                                                        sale.productoVendidos.map((product) => (
                                                            <Typography fontWeight={'bold'}>
                                                                {product.descripcion} - {'$ '}{product.precio}
                                                                <Divider />
                                                            </Typography>
                                                        ))
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                    </TableCell>
                                    <TableCell
                                        style={{textAlign: 'center'}}>{'$'} {sale.montoTotal.toFixed(2)}</TableCell>
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
    width: 700,
    height: 300,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    // boxShadow: 3,
    p: 4,
    borderRadius: 2
};

export default SalesList;