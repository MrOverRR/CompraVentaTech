// Guardado de imagen subida en base64 

document.querySelector("#imagen").addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", ()=> {
        console.log("Hola"+reader.result)
        localStorage.setItem("recent-image", reader.result);
    })
reader.readAsDataURL(this.files[0]);
});


function agregarProducto(event) {
    event.preventDefault();
        // Obtener los datos del formulario
    let nombre = document.getElementById('nombre').value;
    let marca = document.getElementById('marca').value;
    let modelo = document.getElementById('modelo').value;
    let anio = document.getElementById('anio').value;
    let precio = document.getElementById('precio').value;
    let cantidad = document.getElementById('cantidad').value;
    let descripcion = document.getElementById('descripcion').value;
    let imagen = localStorage.getItem("recent-image");

    // Crear un objeto con los datos del nuevo Producto

    let nuevoProducto = {
        nombre: nombre,
        marca: marca,
        modelo: modelo,
        anio: anio,
        precio: precio,
        cantidad: cantidad,
        descripcion: descripcion,
        imagen: imagen
    };

    // Obtener los productos actuales del localStorage

    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Agregar el nuevo producto a la lista de productos

    productos.push(nuevoProducto);
    
    // Guardar la lista actualizada de productos en localStorage

    localStorage.setItem('productos', JSON.stringify(productos));

    mostrarProductos();
}


function mostrarProductos() {
    // Obtener los Productos del localStorage
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Mostrar los productos en la página
    let listaProductos = '<div class="productos-container">';

    productos.forEach(function(producto, index) {
        listaProductos += `
            <div class="producto-item">
                <h2>Producto #${index + 1}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <table class="producto-detalles">
                    <tr><th>Nombre:</th><td>${producto.nombre}</td></tr>
                    <tr><th>Marca:</th><td>${producto.marca}</td></tr>
                    <tr><th>Modelo:</th><td>${producto.modelo}</td></tr>
                    <tr><th>Año:</th><td>${producto.anio}</td></tr>
                    <tr><th>Precio:</th><td>$${producto.precio}</td></tr>
                    <tr><th>Cantidad:</th><td>${producto.cantidad}</td></tr>
                    <tr><th>Descripción:</th><td>${producto.descripcion}</td></tr>
                </table>
            </div>
        `;
    });

    listaProductos += '</div>';

    document.getElementById('ProductosList').innerHTML = listaProductos;
}