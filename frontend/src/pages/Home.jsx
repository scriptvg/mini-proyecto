import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from '@mui/material';
import { CheckCircle, Error, Edit, Delete, NoteAdd } from '@mui/icons-material'; // Importamos los iconos
import { DataGridPro } from '@mui/x-data-grid-pro'; // Importamos DataGridPro
import * as Tooltip from '@radix-ui/react-tooltip'; // Importamos Tooltip de Radix UI

function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false); // Para el modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para editar
  const [productData, setProductData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para mostrar la notificación
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success | error

  // Abrir el modal de creación o edición
  const handleOpen = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setProductData({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        cantidad: product.cantidad,
      });
    } else {
      setProductData({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: '',
      });
      setSelectedProduct(null);
    }
    setOpen(true);
  };

  // Cerrar el modal
  const handleClose = () => setOpen(false);

  // Llamada a la API para obtener productos
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(response => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  // Crear o actualizar producto
  const handleSubmit = () => {
    const apiCall = selectedProduct
      ? axios.put(`http://127.0.0.1:8000/api/productos/${selectedProduct.id}/actualizar/`, productData)
      : axios.post('http://127.0.0.1:8000/api/productos/crear/', productData);

    apiCall
      .then(response => {
        setProductos(prev => {
          if (selectedProduct) {
            return prev.map(p => p.id === selectedProduct.id ? response.data : p);
          } else {
            return [...prev, response.data];
          }
        });
        setSnackbarMessage('Producto creado/actualizado con éxito');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        handleClose();
      })
      .catch(error => {
        console.error(error);
        setSnackbarMessage('Hubo un error al crear/actualizar el producto');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  // Eliminar producto
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/productos/${id}/eliminar/`)
      .then(() => {
        setProductos(prev => prev.filter(product => product.id !== id));
        setSnackbarMessage('Producto eliminado con éxito');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch(error => {
        console.error(error);
        setSnackbarMessage('Hubo un error al eliminar el producto');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 200 },
    { field: 'precio', headerName: 'Precio', width: 120 },
    { field: 'cantidad', headerName: 'Cantidad', width: 120 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 180,
      renderCell: (params) => (
        <div className="flex space-x-2 gap-1 mt-2">
          {/* Tooltip Provider (envuelve todo el componente que usará Tooltip) */}
          <Tooltip.Provider>
            {/* Tooltip para editar */}
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(params.row)}
                  size="small"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  <Edit />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-black text-white p-2 rounded-md">
                Editar
              </Tooltip.Content>
            </Tooltip.Root>

            {/* Tooltip para eliminar */}
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(params.row.id)}
                  size="small"
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md transition-all duration-300 transform hover:scale-105"
                >
                  <Delete />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-black text-white p-2 rounded-md z-50">
                Eliminar
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Lista de Productos</h2>

      {/* Botón para crear un nuevo producto */}
      <Button
        onClick={() => handleOpen()}
        variant="contained"
        color="primary"
        className="mb-5 bg-green-500 hover:bg-green-600 text-white rounded-md transition-all duration-300 transform hover:scale-105"
      >
        <NoteAdd />
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <div className="w-[855px] mx-auto shadow-lg rounded-lg">
          <DataGridPro
            rows={productos}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      )}

      {/* Modal de Crear/Actualizar Producto */}
      <Dialog open={open} onClose={handleClose} className="transition-all duration-300 transform scale-95 hover:scale-100">
        <DialogTitle>{selectedProduct ? 'Actualizar Producto' : 'Crear Producto'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            name="nombre"
            value={productData.nombre}
            onChange={(e) => setProductData({ ...productData, nombre: e.target.value })}
            className="mb-4"
          />
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            margin="normal"
            name="descripcion"
            value={productData.descripcion}
            onChange={(e) => setProductData({ ...productData, descripcion: e.target.value })}
            className="mb-4"
          />
          <TextField
            label="Precio"
            variant="outlined"
            fullWidth
            margin="normal"
            name="precio"
            type="number"
            value={productData.precio}
            onChange={(e) => setProductData({ ...productData, precio: e.target.value })}
            className="mb-4"
          />
          <TextField
            label="Cantidad"
            variant="outlined"
            fullWidth
            margin="normal"
            name="cantidad"
            type="number"
            value={productData.cantidad}
            onChange={(e) => setProductData({ ...productData, cantidad: e.target.value })}
            className="mb-4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" className="hover:bg-red-600 transition-all duration-300">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" className="hover:bg-blue-600 transition-all duration-300">
            {selectedProduct ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          snackbarSeverity === 'success' ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Error className="text-red-500" />
          )
        }
      />
    </div>
  );
}

export default Home;
