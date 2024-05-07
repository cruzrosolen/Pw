
const addToCartButtons = document.querySelectorAll('.añadir-carro');
const cartCounter = document.createElement('div');
cartCounter.id = 'cuenta-carrito';
let itemCount = 0; 
let totalPrice = 0; 
const carritoDesplegable = document.getElementById('carrito-desplegable');
const carritoProductos = document.getElementById('carrito-productos');
const totalCompra = document.getElementById('total-compra');


function updateCartCounter() {
    cartCounter.textContent = itemCount;
    document.querySelector('.carro').appendChild(cartCounter);
}

function mostrarCarrito() {
    carritoDesplegable.classList.toggle('activo');
}

function agregarProductoAlCarrito(nombre, precio) {
    let productoExistente = false;

    
    const productosEnCarrito = carritoProductos.querySelectorAll('.producto-carrito');
    productosEnCarrito.forEach(producto => {
        if (producto.dataset.nombre === nombre) {
            
            const cantidadElemento = producto.querySelector('.cantidad');
            let cantidad = parseInt(cantidadElemento.textContent);
            cantidad++;
            cantidadElemento.textContent = cantidad;
            productoExistente = true;
            
            itemCount++;
            updateCartCounter();
        }
    });

    if (!productoExistente) {
        
        itemCount++;
        updateCartCounter();

        
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('producto-carrito');
        productoElemento.dataset.nombre = nombre;
        productoElemento.dataset.precio = precio; 

        productoElemento.innerHTML = `
            <img src="../images/${nombre}.png" alt="${nombre}" style="width: 80px; height: 80px; margin-top:10px;">
            <div>
                <p style="font-size:14px;">${nombre}</p>
                <p>Precio: $${precio.toFixed(2)}</p>
                <p>Cantidad: <span class="cantidad">1</span></p>
            </div>
            <button class="eliminar-producto">Eliminar</button>
        `;
        
        
        carritoProductos.appendChild(productoElemento);
    }

    
    totalPrice += precio;
    totalCompra.textContent = `$${totalPrice.toFixed(2)}`;
}



addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const producto = button.dataset.producto;
        let nombreProducto, precioProducto;

        
        switch (producto) {
            case 'mate1':
                nombreProducto = 'MATE CON LOGO Y BASE';
                precioProducto = 12000;
                break;
            case 'mate2':
                nombreProducto = 'MATE Y BASE CON LOGO';
                precioProducto = 12000;
                break;
            case 'bombilla1':
                nombreProducto = 'BOMBILLA CON LOGO';
                precioProducto = 10000;
                break;
            case 'bombilla2':
                nombreProducto = 'BOMBILLA SIN LOGO';
                precioProducto = 8000;
                break;
            case 'combo1':
                nombreProducto = 'COMBO GUARÚ';
                precioProducto = 16000;
                break;
            case 'combo2':
                nombreProducto = 'COMBO SIRANO';
                precioProducto = 16000;
                break;
            case 'combo3':
                nombreProducto = 'COMBO CHAROL';
                precioProducto = 17000;
                break;
            case 'combo4':
                nombreProducto = 'COMBO BUCANERO';
                precioProducto = 17000;
                break;
            
            default:
                break;
        }

        agregarProductoAlCarrito(nombreProducto, precioProducto);
    });
});


carritoProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-producto')) {
        const producto = e.target.parentElement;
        const cantidadElemento = producto.querySelector('.cantidad');
        let cantidad = parseInt(cantidadElemento.textContent);
        const precio = parseFloat(producto.dataset.precio); 

        if (cantidad > 1) {
            
            cantidad--;
            cantidadElemento.textContent = cantidad;
            totalPrice -= precio;
        } else {
            
            producto.remove();
            itemCount--; 
            updateCartCounter(); 
            totalPrice -= precio; 
        }

        if (isNaN(totalPrice)) {
            totalPrice = 0; 
        }

        
        totalCompra.textContent = `$${totalPrice.toFixed(2)}`;
        
        
        if (itemCount === 0) {
            document.getElementById('carrito-vacio').style.display = 'block';
        }

        
        updateCartCounter();
    }
});



const carroBtn = document.querySelector('.carro button'); 
carroBtn.addEventListener('click', mostrarCarrito);

const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


vaciarCarritoBtn.addEventListener('click', () => {
    
    carritoProductos.innerHTML = '';
    
    itemCount = 0;
    updateCartCounter();
    
    totalPrice = 0;
    totalCompra.textContent = '$0.00';

    
    document.getElementById('carrito-vacio').style.display = 'block';
});


const cerrarCarritoBtn = document.getElementById('cerrar-carrito');

cerrarCarritoBtn.addEventListener('click', () => {
    carritoDesplegable.classList.remove('activo'); 
});


function mostrarCarrito() {
    carritoDesplegable.classList.toggle('activo');
}
