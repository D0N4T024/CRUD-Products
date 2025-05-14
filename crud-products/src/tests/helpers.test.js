import { calcularTotalStock, calcularValorInventario } from '../utils/helpers';

const productosMock = [
  { id: 1, nombre: 'Laptop', precio: 1000, cantidad: 2 },
  { id: 2, nombre: 'Mouse', precio: 50, cantidad: 5 },
];

test('calcula correctamente el total de stock', () => {
  expect(calcularTotalStock(productosMock)).toBe(7);
});

test('calcula correctamente el valor total del inventario', () => {
  expect(calcularValorInventario(productosMock)).toBe(1000 * 2 + 50 * 5); // 2250
});
