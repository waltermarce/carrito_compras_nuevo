const productos = [
  { nombre: "Gaseosa", precio: 700 },
  { nombre: "Papas", precio: 400 },
  { nombre: "Sándwich", precio: 1000 }
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  productos.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <input type="number" id="cant-${index}" value="1" min="1" />
      <button onclick="agregarAlCarrito(${index})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(index) {
  const cantidad = parseInt(document.getElementById(`cant-${index}`).value);
  const producto = productos[index];
  carrito.push({ ...producto, cantidad });
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.cantidad} x ${item.nombre} - $${item.precio * item.cantidad}`;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });
  document.getElementById("total").textContent = total;
}

function confirmarCompra() {
  const total = document.getElementById("total").textContent;
  alert("Compra confirmada por $" + total);
  guardarEnLocalStorage();
  carrito = [];
  actualizarCarrito();
  mostrarPedidosAnteriores();
}

function guardarEnLocalStorage() {
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push({ carrito, fecha: new Date().toLocaleString() });
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function mostrarPedidosAnteriores() {
  const lista = document.getElementById("pedidos-anteriores");
  lista.innerHTML = "";
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.slice().reverse().forEach(pedido => {
    const li = document.createElement("li");
    li.textContent = `${pedido.fecha} - ${pedido.carrito.length} productos`;
    lista.appendChild(li);
  });
}

mostrarProductos();
mostrarPedidosAnteriores();
