function nameProducts(){
    // Obtener los Productos del localStorage
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    // Mostrar los productos en la página
    let selectElement = document.getElementById('producto');
    productos.forEach(function(producto) {
        let option = document.createElement('option');
        option.value = producto.nombre;
        option.text = producto.nombre;
        selectElement.appendChild(option);
    });
}

function nameClients(){
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let selectElement = document.getElementById('cliente');
    clientes.forEach(function(cliente) {
        let option = document.createElement('option');
        option.value = cliente.nombre;
        option.text = cliente.nombre;
        selectElement.appendChild(option);
    });
}

function mostrarImagen() {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let productoSeleccionado = document.getElementById('producto').value;
    let producto = productos.find(p => p.nombre === productoSeleccionado);
    let imagenProductoDiv = document.getElementById('imagenProducto');
    let precioUnitarioInput = document.getElementById('precio_unitario');
    let cantidadInput = document.getElementById('cantidad');
    let totalInput = document.getElementById('total');

    if (producto && producto.imagen) {
        imagenProductoDiv.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">`;
        precioUnitarioInput.value = producto.precio;
    } else {
        imagenProductoDiv.innerHTML = '';
        precioUnitarioInput.value = '';
    }
    calcularTotal();
}

function calcularTotal() {
    let precioUnitario = parseFloat(document.getElementById('precio_unitario').value) || 0;
    let cantidad = parseInt(document.getElementById('cantidad').value) || 0;
    document.getElementById('total').value = (precioUnitario * cantidad).toFixed(2);
}

function registrarVenta(event) {
    event.preventDefault();
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let productoSeleccionado = document.getElementById('producto').value;
    let cantidadVendida = parseInt(document.getElementById('cantidad').value);
    let precioUnitario = parseFloat(document.getElementById('precio_unitario').value);
    let cliente = document.getElementById('cliente').value;
    let metodoPago = document.getElementById('metodo_pago').value;
    let fechaVenta = document.getElementById('fecha_venta').value;
    let notas = document.getElementById('notas').value;
    let total = parseFloat(document.getElementById('total').value);

    let productoIndex = productos.findIndex(p => p.nombre === productoSeleccionado);
    if (productoIndex !== -1) {
        if (cantidadVendida > productos[productoIndex].cantidad) {
            alert("No hay suficiente stock de este producto. Stock disponible: " + productos[productoIndex].cantidad);
            return;
        }
        productos[productoIndex].cantidad -= cantidadVendida;
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    let nuevaVenta = {
        cliente: cliente,
        producto: productoSeleccionado,
        cantidad: cantidadVendida,
        precioUnitario: precioUnitario,
        metodoPago: metodoPago,
        fechaVenta: fechaVenta,
        notas: notas,
        total: total
    };

    let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventas.push(nuevaVenta);
    localStorage.setItem('ventas', JSON.stringify(ventas));
    alert("Venta registrada correctamente.");
    mostrarVentas();
}

function mostrarVentas() {
    let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    let listaVentas = '<div class="ventas-container">';

    ventas.forEach(function(venta, index) {
        const fecha = new Date(venta.fechaVenta);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

        listaVentas += `
            <div class="venta-item">
                <div class="venta-header">
                    <h2>Recibo de Venta #${index + 1}</h2>
                    <p class="fecha-venta">Fecha: ${fechaFormateada}</p>
                </div>
                <div class="venta-detalles">
                    <div class="venta-cliente">
                        <h3>Cliente</h3>
                        <p>${venta.cliente}</p>
                    </div>
                    <div class="venta-producto">
                        <h3>Detalles del Producto</h3>
                        <p><strong>Producto:</strong> ${venta.producto}</p>
                        <p><strong>Cantidad:</strong> ${venta.cantidad}</p>
                        <p><strong>Precio Unitario:</strong> $${venta.precioUnitario.toFixed(2)}</p>
                    </div>
                    <div class="venta-pago">
                        <h3>Detalles del Pago</h3>
                        <p><strong>Total:</strong> $${venta.total.toFixed(2)}</p>
                        <p><strong>Método de Pago:</strong> ${venta.metodoPago}</p>
                    </div>
                    <div class="venta-notas">
                        <h3>Notas Adicionales</h3>
                        <p>${venta.notas || 'Sin notas adicionales'}</p>
                    </div>
                </div>
                <div class="venta-footer">
                    <p>Gracias por su compra</p>
                </div>
            </div>
        `;
    });

    listaVentas += '</div>';
    document.getElementById('VentasList').innerHTML = listaVentas;
}

var e = document.getElementById("producto");
e.onchange = function() {
  var strUser = e.options[e.selectedIndex].value; 
  console.log('You selected: ', strUser);
  mostrarImagen();
};

let cantidadInput = document.getElementById('cantidad');
cantidadInput.addEventListener('input', calcularTotal);
let precioUnitarioInput = document.getElementById('precio_unitario');
precioUnitarioInput.addEventListener('input', calcularTotal);

window.onload = function() {
    nameProducts();
    nameClients();
    mostrarVentas();
};