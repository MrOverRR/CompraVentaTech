// Guardado de imagen subida en base64 

document.querySelector("#imagen").addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", ()=> {
        console.log("Hola"+reader.result)
        localStorage.setItem("recent-image", reader.result);
    })
reader.readAsDataURL(this.files[0]);
});


function agregarCliente(event) {
    event.preventDefault();
    // Obtener los datos del formulario
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById("email").value;
    let telefono=document.getElementById("telefono").value;
    let direccion=document.getElementById("direccion").value;
    let tipo_cliente=document.getElementById("tipo_cliente").value;
    let interes=document.getElementById("interes").value;
    let comentarios=document.getElementById("comentarios").value;
    let imagen = localStorage.getItem("recent-image");

    // Crear un objeto con los datos del nuevo Producto

    let nuevoCliente = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        direccion: direccion,
        tipo_cliente: tipo_cliente,
        interes: interes,
        comentarios: comentarios,
        imagen: imagen
    };

    // Obtener los productos actuales del localStorage
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    // Agregar el nuevo producto a la lista de productos

    clientes.push(nuevoCliente);
    
    // Guardar la lista actualizada de productos en localStorage

    localStorage.setItem('clientes', JSON.stringify(clientes));

    mostrarClientes();
}


function mostrarClientes() {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    let listaClientes = '<div class="clientes-container">';

    clientes.forEach(function(cliente, index) {
        listaClientes += `
            <div class="cliente-item">
                <div class="cliente-header">
                    <div class="cliente-imagen-container">
                        <img src="${cliente.imagen}" alt="${cliente.nombre}" class="cliente-imagen">
                    </div>
                    <h2>${cliente.nombre}</h2>
                </div>
                <table class="cliente-detalles">
                    <tr><th>Email:</th><td>${cliente.email}</td></tr>
                    <tr><th>Teléfono:</th><td>${cliente.telefono}</td></tr>
                    <tr><th>Dirección:</th><td>${cliente.direccion}</td></tr>
                    <tr><th>Tipo de Cliente:</th><td>${cliente.tipo_cliente}</td></tr>
                    <tr><th>Interés:</th><td>${cliente.interes}</td></tr>
                    <tr><th>Comentarios:</th><td>${cliente.comentarios}</td></tr>
                </table>
            </div>
        `;
    });

    listaClientes += '</div>';
    document.getElementById('ClientesList').innerHTML = listaClientes;
}