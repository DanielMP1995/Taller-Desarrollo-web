let productos = [];

const agregarProducto = (id, nombre, precio) => {
    let producto = productos.find(p => p.id === id);
    if (producto) {
        producto.cantidad++;
        enviarDatos('PUT', producto);
    } else {
        producto = { id, nombre, precio, cantidad: 1 };
        productos.push(producto);
        enviarDatos('POST', producto);
    }
    actualizarTabla();
};

const eliminarProducto = (id) => {
    console.log('Eliminando producto con id:', id);  // Log para depuración
    const index = productos.findIndex(p => p.id === id);

    if (index !== -1) {
        const producto = productos[index];
        console.log('Producto encontrado:', producto);  // Log para depuración

        // Eliminar el producto 
        productos.splice(index, 1);

        // Eliminar el producto 
        enviarDatos('DELETE', producto);

        // Actualizar la tabla
        actualizarTabla();
    } else {
        console.log('Producto no encontrado');
    }
};

const actualizarTabla = () => {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';  // Limpia la tabla
    let total = 0;

    productos.forEach(producto => {
        const fila = tbody.insertRow();
        fila.insertCell(0).textContent = producto.nombre;
        fila.insertCell(1).textContent = producto.cantidad;
        fila.insertCell(2).textContent = producto.precio;
        fila.insertCell(3).textContent = (producto.cantidad * producto.precio).toFixed(2);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        
        btnEliminar.addEventListener('click', () => eliminarProducto(producto.id));
        fila.insertCell(4).appendChild(btnEliminar);
        btnEliminar.classList.add('btn', 'btn-danger');  // Clase de Bootstrap para estilo
        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = total.toFixed(2);
};

const enviarDatos = async (metodo, data) => {
    const url = metodo === 'DELETE' ? `http://localhost:3000/productos/${data.id}` : 'http://localhost:3000/productos';

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: metodo !== 'DELETE' ? JSON.stringify(data) : null,
        });
        const result = await response.json();
        console.log(`${metodo} exitoso:`, result);
    } catch (error) {
        console.error(`${metodo} error:`, error);
    }
};

const cargarProductos = async () => {
    try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        productos = data;
        actualizarTabla();
    } catch (error) {
        console.log('Error al cargar productos', error);
    }
};

// Cargar productos cuando la página se carga
window.onload = cargarProductos;

function comprar(id) {
                    
    window.location.href = "/paginas/compras.html"; 
}

function mostrarImagen() {
    document.getElementById("descuento1").style.display = "block";
}


function ocultarImagen() {
    document.getElementById("descuento1").style.display = "none";
}