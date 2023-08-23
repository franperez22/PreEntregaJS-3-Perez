document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos');
    const carritoIcon = document.getElementById('carrito-icon');
    const itemsList = document.getElementById('items');
    const totalSpan = document.getElementById('total');
    const vaciarBoton = document.getElementById('vaciar');
  
    const productos = [
      { id: 1, nombre: 'Remera TNF', precio: 7300 },
      { id: 2, nombre: 'Campera Champion', precio: 24500 },
      { id: 3, nombre: 'Camiseta Cruzeiro', precio: 16500 },
      { id: 4, nombre: 'Camiseta Santos', precio: 16500 },
      { id: 5, nombre: 'Camiseta Sao Paulo', precio: 16500 },
    ];
  
    // Mostrar productos en la tienda
    productos.forEach(producto => {
      const productoHTML = `
        <div class="producto">
        <img src="images/${producto.imagen}" alt="${producto.nombre}">
          <h2>${producto.nombre}</h2>
          <p>Precio: $${producto.precio}</p>
          <button class="agregar" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      `;
      productosContainer.innerHTML += productoHTML;
    });
  
    // Agregar productos al carrito
    productosContainer.addEventListener('click', event => {
      if (event.target.classList.contains('agregar')) {
        const productId = parseInt(event.target.getAttribute('data-id'));
        const selectedProduct = productos.find(producto => producto.id === productId);
        if (selectedProduct) {
          agregarAlCarrito(selectedProduct);
        }
      }
    });
  
    // Funciones del carrito
    function agregarAlCarrito(producto) {
      const itemHTML = `<li>${producto.nombre} - $${producto.precio.toFixed(2)}</li>`;
      itemsList.innerHTML += itemHTML;
      actualizarTotal();
      guardarCarritoEnStorage();
    }
  
    function actualizarTotal() {
      let total = 0;
      itemsList.childNodes.forEach(item => {
        const precio = parseFloat(item.textContent.slice(item.textContent.indexOf('$') + 1));
        total += precio;
      });
      totalSpan.textContent = total.toFixed(2);
    }
  
    function vaciarCarrito() {
      itemsList.innerHTML = '';
      actualizarTotal();
      guardarCarritoEnStorage();
    }
  
    function guardarCarritoEnStorage() {
      const items = [];
      itemsList.childNodes.forEach(item => {
        items.push(item.textContent);
      });
      localStorage.setItem('carritoItems', JSON.stringify(items));
    }
  
    function cargarCarritoDesdeStorage() {
      const items = JSON.parse(localStorage.getItem('carritoItems')) || [];
      items.forEach(item => {
        itemsList.innerHTML += `<li>${item}</li>`;
      });
      actualizarTotal();
    }
  
    cargarCarritoDesdeStorage();
  
    vaciarBoton.addEventListener('click', vaciarCarrito);
    
    // Mostrar/ocultar el carrito
    carritoIcon.addEventListener('click', () => {
      document.getElementById('carrito').classList.toggle('visible');
    });
  });
  