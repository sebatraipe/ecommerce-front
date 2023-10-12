import {
    Box,
    Button,
    Divider, Fade,
    FormControl, Grow, IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select, Slide, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {environment} from "../../environments/environments";
import Category from "../../models/Category";
import CloseIcon from '@mui/icons-material/Close';

const ProductDetail = ({isOpen, onClose, product, loadProduct, message, openSnackbar}) => {

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        descripcion: '',
        marca: '',
        precio: '',
        categoria: '',
    });

    useEffect(() => {
        // Cuando se cargan los datos del producto, actualiza el estado de formData con esos datos
        if (product) {
            setFormData({
                descripcion: product.descripcion,
                marca: product.marca.nombre,
                precio: product.precio,
                categoria: product.categoria.id,
            });
        }
    }, [product]);

    useEffect(() => {
        // console.log("Producto: ", product);
        loadCategories();
    }, []);

    const loadCategories = () => {
        fetch(environment.baseURL + 'categorias')
            .then(response => response.json())
            .then(data => {
                let category = data.map(c => new Category(c));
                setCategories(category);
            }).catch((error) => {
            console.log("Error...", error);
        });
    }

    const updateProduct = () => {
        const producto = {
            descripcion: formData.descripcion,
            precio: parseFloat(formData.precio),
            version: product.version,
            categoria: {
                id: formData.categoria
            },
            marca: {
                nombre: formData.marca
            }
        }

        console.log("Producto: ", producto);
        fetch(environment.baseURL + 'productos/' + product.id, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(producto)
        })
            .then(response => {
                if (response.ok) {
                    loadProduct();
                    return response.json().then(data => {
                        if (data.message) {
                            openSnackbar(true);
                            message(data.message);

                        }
                    });
                } else {
                    return response.json().then(data => {
                        if (data.error) {
                            throw new Error(data.error);
                        } else {
                            throw new Error("Error al actualizar el producto.....");
                        }
                    });
                }
            })
            .catch((error) => {
                openSnackbar(true);
                message(error.message);
            });
    }

    return (
        <Modal open={isOpen}
               onClose={onClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">

            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2"
                            style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Editar producto
                </Typography>
                <Divider style={{marginTop: 8, width: '100%'}}/>
                <div style={{padding: 10, textAlign: 'center'}}>
                    <TextField style={{marginBottom: 15}}
                               id="standard-basic"
                               label="Nombre"
                               variant="standard"
                               value={formData.descripcion}
                               onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    />
                    <TextField style={{marginBottom: 15}}
                               id="standard-basic"
                               label="Marca"
                               variant="standard"
                               value={formData.marca}
                               onChange={(e) => setFormData({...formData, marca: e.target.value})}
                    />
                    <TextField style={{marginBottom: 15}}
                               id="standard-basic"
                               label="Precio"
                               variant="standard"
                               value={formData.precio}
                               onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    />
                    <Box sx={{width: '60%', marginLeft: 10, marginTop: 2}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                abelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Categoria"
                                value={formData.categoria}
                                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                                sx={{textAlign: 'start'}}
                            >
                                {categories.map(c => (
                                    <MenuItem value={c.id}>
                                        {c.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div style={{textAlign: 'center', padding: 30}}>
                    <Button style={{marginRight: 10}} onClick={onClose} variant={'outlined'}
                            color="error">Cancelar</Button>
                    <Button style={{marginLeft: 10}} onClick={() => updateProduct()}
                            variant={'outlined'}>Aceptar</Button>
                </div>
            </Box>
        </Modal>
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

export default ProductDetail;