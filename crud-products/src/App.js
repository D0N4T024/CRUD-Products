import { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { productoReducer } from './components/ProductoReducer';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const API_URL = 'http://localhost:3001/productos';

export default function TablaProductos() {
  const [productos, dispatch] = useReducer(productoReducer, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoActual, setProductoActual] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      dispatch({ type: 'SET', payload: res.data });
    } catch (error) {
      toast.error('Error al cargar los productos');
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (modoEdicion) {
        const res = await axios.put(`${API_URL}/${productoActual.id}`, data);
        dispatch({ type: 'UPDATE', payload: res.data });
        toast.success('Producto actualizado');
      } else {
        const res = await axios.post(API_URL, data);
        dispatch({ type: 'ADD', payload: res.data });
        toast.success('Producto creado');
      }
      setModalOpen(false);
      reset();
    } catch (error) {
      toast.error('Error al guardar el producto');
    }
  };

  const abrirModalCrear = () => {
    setModoEdicion(false);
    reset();
    setModalOpen(true);
  };

  const abrirModalEditar = (producto) => {
    setModoEdicion(true);
    setProductoActual(producto);
    reset(producto);
    setModalOpen(true);
  };

  const confirmarEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        dispatch({ type: 'DELETE', payload: id });
        toast.success('Producto eliminado');
      } catch {
        toast.error('Error al eliminar el producto');
      }
    }
  };

  return (
    <div className="table-container">
      <ToastContainer />
      <h2 className="title">Lista de Productos</h2>
      <button className="btn add" onClick={abrirModalCrear}>Agregar Producto</button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio ($)</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, idx) => (
            <tr key={producto.id} className={idx % 2 ? 'alt-row' : ''}>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.cantidad}</td>
              <td>
                <button className="btn edit" onClick={() => abrirModalEditar(producto)}>Editar</button>
                <button className="btn delete" onClick={() => confirmarEliminar(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Formulario Producto"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>{modoEdicion ? 'Editar' : 'Crear'} Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Nombre"
            {...register('nombre', { required: 'El nombre es obligatorio' })}
          />
          {errors.nombre && <p className="error">{errors.nombre.message}</p>}

          <input
            type="number"
            placeholder="Precio"
            {...register('precio', { required: 'Precio requerido', min: 1 })}
          />
          {errors.precio && <p className="error">{errors.precio.message}</p>}

          <input
            type="number"
            placeholder="Cantidad"
            {...register('cantidad', { required: 'Cantidad requerida', min: 1 })}
          />
          {errors.cantidad && <p className="error">{errors.cantidad.message}</p>}

          <button type="submit" className="btn save">Guardar</button>
        </form>
      </Modal>
    </div>
  );
}
