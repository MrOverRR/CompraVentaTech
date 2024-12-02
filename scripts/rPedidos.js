document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pedidoForm');
    const pedidosRegistradosDiv = document.getElementById('pedidosRegistrados');

    // Cargar pedidos existentes al cargar la página
    mostrarPedidos();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const pedido = {
            cliente: document.getElementById('cliente').value,
            tipo_pedido: document.getElementById('tipo_pedido').value,
            producto: document.getElementById('producto').value,
            cantidad: document.getElementById('cantidad').value,
            fecha_pedido: document.getElementById('fecha_pedido').value,
            fecha_entrega: document.getElementById('fecha_entrega').value,
            estado: document.getElementById('estado').value,
            direccion_entrega: document.getElementById('direccion_entrega').value,
            notas: document.getElementById('notas').value
        };

        guardarPedido(pedido);
        form.reset();
        mostrarPedidos();
    });

    function guardarPedido(pedido) {
        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        pedidos.push(pedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
    }

    function mostrarPedidos() {
        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        pedidosRegistradosDiv.innerHTML = '';

        pedidos.forEach((pedido, index) => {
            const pedidoElement = document.createElement('div');
            pedidoElement.classList.add('pedido-recibo');
            
            const fechaPedido = new Date(pedido.fecha_pedido);
            const fechaEntrega = new Date(pedido.fecha_entrega);
            const fechaPedidoFormateada = fechaPedido.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            const fechaEntregaFormateada = fechaEntrega.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            
            pedidoElement.innerHTML = `
                <div class="recibo-header">
                    <h3>Confirmación de Pedido</h3>
                    <p class="recibo-numero">No. ${index + 1}</p>
                </div>
                <div class="recibo-body">
                    <div class="recibo-section">
                        <h4>Detalles del Cliente</h4>
                        <p><strong>Nombre:</strong> ${pedido.cliente}</p>
                        <p><strong>Dirección de entrega:</strong> ${pedido.direccion_entrega}</p>
                    </div>
                    <div class="recibo-section">
                        <h4>Detalles del Pedido</h4>
                        <p><strong>Tipo de pedido:</strong> ${pedido.tipo_pedido}</p>
                        <p><strong>Producto/Servicio:</strong> ${pedido.producto}</p>
                        <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
                        <p><strong>Fecha de pedido:</strong> ${fechaPedidoFormateada}</p>
                        <p><strong>Fecha estimada de entrega:</strong> ${fechaEntregaFormateada}</p>
                        <p><strong>Estado del pedido:</strong> ${pedido.estado}</p>
                    </div>
                    <div class="recibo-section">
                        <h4>Información Adicional</h4>
                        <p><strong>Notas:</strong> ${pedido.notas || 'No proporcionadas'}</p>
                    </div>
                </div>
                <div class="recibo-footer">
                    <p>Gracias por su pedido. Para cualquier consulta, por favor contáctenos.</p>
                </div>
            `;
            pedidosRegistradosDiv.appendChild(pedidoElement);
        });
    }
});

