document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('visitaForm');
    const visitasAgendadasDiv = document.getElementById('visitasAgendadas');

    // Cargar visitas existentes al cargar la página
    mostrarVisitas();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const visita = {
            cliente: document.getElementById('cliente').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            tipo_visita: document.getElementById('tipo_visita').value,
            fecha_visita: document.getElementById('fecha_visita').value,
            hora_visita: document.getElementById('hora_visita').value,
            motivo: document.getElementById('motivo').value,
            preferencias: document.getElementById('preferencias').value
        };

        guardarVisita(visita);
        form.reset();
        mostrarVisitas();
    });

    function guardarVisita(visita) {
        let visitas = JSON.parse(localStorage.getItem('visitas')) || [];
        visitas.push(visita);
        localStorage.setItem('visitas', JSON.stringify(visitas));
    }

    function mostrarVisitas() {
        let visitas = JSON.parse(localStorage.getItem('visitas')) || [];
        visitasAgendadasDiv.innerHTML = '';

        visitas.forEach((visita, index) => {
            const visitaElement = document.createElement('div');
            visitaElement.classList.add('visita-recibo');
            
            const fecha = new Date(visita.fecha_visita);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            
            visitaElement.innerHTML = `
                <div class="recibo-header">
                    <h3>Confirmación de Visita</h3>
                    <p class="recibo-numero">No. ${index + 1}</p>
                </div>
                <div class="recibo-body">
                    <div class="recibo-section">
                        <h4>Detalles del Cliente</h4>
                        <p><strong>Nombre:</strong> ${visita.cliente}</p>
                        <p><strong>Email:</strong> ${visita.email}</p>
                        <p><strong>Teléfono:</strong> ${visita.telefono}</p>
                    </div>
                    <div class="recibo-section">
                        <h4>Detalles de la Visita</h4>
                        <p><strong>Tipo de visita:</strong> ${visita.tipo_visita}</p>
                        <p><strong>Fecha:</strong> ${fechaFormateada}</p>
                        <p><strong>Hora:</strong> ${visita.hora_visita}</p>
                    </div>
                    <div class="recibo-section">
                        <h4>Información Adicional</h4>
                        <p><strong>Motivo de la visita:</strong> ${visita.motivo}</p>
                        <p><strong>Preferencias:</strong> ${visita.preferencias || 'No proporcionadas'}</p>
                    </div>
                </div>
                <div class="recibo-footer">
                    <p>Gracias por agendar su visita con nosotros.</p>
                    <p>Por favor, llegue 10 minutos antes de la hora programada.</p>
                </div>
            `;
            visitasAgendadasDiv.appendChild(visitaElement);
        });
    }
});

