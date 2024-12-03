document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quejaForm');
    const quejasRegistradasDiv = document.getElementById('quejasRegistradas');

    // Cargar quejas existentes al cargar la página
    mostrarQuejas();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const queja = {
            cliente: document.getElementById('cliente').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            tipo_queja: document.getElementById('tipo_queja').value,
            producto: document.getElementById('producto').value,
            fecha_incidente: document.getElementById('fecha_incidente').value,
            descripcion: document.getElementById('descripcion').value,
            solucion_propuesta: document.getElementById('solucion_propuesta').value
        };

        guardarQueja(queja);
        form.reset();
        mostrarQuejas();
    });

    function guardarQueja(queja) {
        let quejas = JSON.parse(localStorage.getItem('quejas')) || [];
        quejas.push(queja);
        localStorage.setItem('quejas', JSON.stringify(quejas));
    }

    function mostrarQuejas() {
        let quejas = JSON.parse(localStorage.getItem('quejas')) || [];
        quejasRegistradasDiv.innerHTML = '';

        quejas.forEach((queja, index) => {
            const quejaElement = document.createElement('div');
            quejaElement.classList.add('queja-item');
            quejaElement.innerHTML = `
                <h3>Queja #${index + 1}</h3>
                <p><strong>Cliente:</strong> ${queja.cliente}</p>
                <p><strong>Email:</strong> ${queja.email}</p>
                <p><strong>Teléfono:</strong> ${queja.telefono}</p>
                <p><strong>Tipo de queja:</strong> ${queja.tipo_queja}</p>
                <p><strong>Producto/Servicio:</strong> ${queja.producto}</p>
                <p><strong>Fecha del incidente:</strong> ${queja.fecha_incidente}</p>
                <p><strong>Descripción:</strong> ${queja.descripcion}</p>
                <p><strong>Solución propuesta:</strong> ${queja.solucion_propuesta || 'No proporcionada'}</p>
            `;
            quejasRegistradasDiv.appendChild(quejaElement);
        });
    }
});

