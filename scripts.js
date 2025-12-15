let catalogoProductos = [];

const productosLibreria = [
    {
        id: 101,
        title: "Set de Lápices Artísticos",
        price: 15000.00,
        description: "Caja de 24 lápices de colores profesionales. Ideales para dibujo y diseños.",
        image: "./img2.jfif"
    },
    {
        id: 102,
        title: "Cuaderno Premium A4",
        price: 950.00,
        description: "Cuaderno A4 de 100 hojas de alto gramaje y tapa dura.",
        image: "./img3.jfif"
    },
    {
        id: 103,
        title: "Pack de Marcadores Fluo",
        price: 3500.50,
        description: "6 marcadores fluorescentes con punta biselada para estudio y resaltado.",
        image: "./img4.jfif"
    },
    {
        id: 104,
        title: "Goma de Borrar Miga",
        price: 150.00,
        description: "Goma blanda, no deja residuos y es ideal para grafito.",
        image: "./img5.jfif"
    },
];

function obtenerCarrito() {
    const carritoJSON = localStorage.getItem('carrito');
    return carritoJSON ? JSON.parse(carritoJSON) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContador() {
    const carrito = obtenerCarrito();
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    carrito.push(producto);
    guardarCarrito(carrito);
    actualizarContador();
    renderizarCarrito();
    alert(`"${producto.title}" agregado al carrito.`);
}

function eliminarDelCarrito(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    actualizarContador();
    renderizarCarrito();
    alert('Producto eliminado del carrito.');
}

function cargarEventosEliminarItem() {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-item');
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            eliminarDelCarrito(parseInt(index));
        });
    });
}

function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito-productos');
    const carrito = obtenerCarrito();
    
    if (!listaCarrito) return; 

    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li style="text-align: center; list-style: none; padding: 10px; background-color: #f4f4f4;">El carrito está vacío.</li>';
        return;
    }
    
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.style.borderBottom = '1px dashed #ccc';
        li.style.padding = '10px 0';
        
        li.innerHTML = `
            ${producto.title} - <strong>$${producto.price.toFixed(2)}</strong> 
            <button data-index="${index}" class="btn-eliminar-item" style="float: right; background-color: darkred; color: white; border: none; padding: 5px 8px; cursor: pointer; border-radius: 4px;">
                X Eliminar
            </button>
        `;
        listaCarrito.appendChild(li); 
    });

    cargarEventosEliminarItem();
}

function cargarProductos() {
    
    const contenedor = document.getElementById('productos-container');
    const mensajeCargando = document.getElementById('mensaje-cargando');
    
    if (mensajeCargando) {
        mensajeCargando.style.display = "none"; 
    }

    catalogoProductos = productosLibreria; 
    
    contenedor.innerHTML = ''; 

    productosLibreria.forEach(producto => {
        
        const card = document.createElement('article');
        card.className = 'producto__card'; 
        
        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" width="200">
            <h3>${producto.title}</h3>
            <p>${producto.description}</p> 
            <p><strong>Precio: $${producto.price.toFixed(2)}</strong></p>
            <button data-id="${producto.id}" class="btn-agregar-carrito">
                <i class="fas fa-shopping-cart"></i> Agregar
            </button>
        `;
        
        contenedor.appendChild(card);
    });

    cargarEventosAgregar();
}

function cargarEventosAgregar() {
    const botones = document.querySelectorAll('.producto__card button');
    
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            const productoId = parseInt(boton.getAttribute('data-id'));
            
            const productoAAgregar = catalogoProductos.find(p => p.id === productoId);
            
            if (productoAAgregar) {
                agregarAlCarrito(productoAAgregar);
            }
        });
    });
}

function validarFormulario(event) {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre === "" || correo === "" || mensaje === "") { 
        event.preventDefault(); 
        alert("Faltan completar campos obligatorios: Nombre, Correo y Mensaje.");
        console.error("Faltan completar campos obligatorios."); 
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    if (!emailRegex.test(correo)) {
        event.preventDefault();
        alert("Por favor, ingresar un formato de correo electrónico válido (por ej: usuario@dominio.com).");
        console.error("Formato de correo inválido.");
        return false;
    }
    
    alert("¡Formulario completo, listo para enviar.");
    return true; 
}

document.addEventListener('DOMContentLoaded', () => {
    
    cargarProductos(); 
    
    actualizarContador();
    renderizarCarrito(); 
    
    const formularioContacto = document.getElementById('form-contacto');
    
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', validarFormulario);
    }
    
    const botonVaciar = document.getElementById('vaciar-carrito');
    
    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            localStorage.removeItem('carrito'); 
            actualizarContador(); 
            renderizarCarrito(); 
            alert('Carrito vaciado correctamente');
        });
    }

});