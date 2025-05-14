/**
 * Calcula la cantidad total de productos en inventario.
 * @param {Array} productos - Lista de productos con { cantidad }
 * @returns {number}
 */
export const calcularTotalStock = (productos) => {
  return productos.reduce((total, producto) => total + producto.cantidad, 0);
};

/**
 * Calcula el valor total del inventario.
 * @param {Array} productos - Lista de productos con { precio, cantidad }
 * @returns {number}
 */
export const calcularValorInventario = (productos) => {
  return productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
};
