import { render, screen, fireEvent } from '@testing-library/react';
import TablaProductos from '../App.js';
import '@testing-library/jest-dom';

test('renderiza título correctamente', () => {
  render(<TablaProductos />);
  const titulo = screen.getByText(/lista de productos/i);
  expect(titulo).toBeInTheDocument();
});

test('valida que el formulario muestre error si no se completa', async () => {
  render(<TablaProductos />);
  fireEvent.click(screen.getByText(/agregar producto/i));
  fireEvent.click(screen.getByText(/guardar/i));
  expect(await screen.findByText(/el nombre es obligatorio/i)).toBeInTheDocument();
});
