// ===============================
// VARIABLES GLOBALES
// ===============================
let carrito = [];

// ===============================
// AGREGAR AL CARRITO
// ===============================
function agregarCarrito(nombre, precio){
  carrito.push({nombre, precio});
  alert("Producto agregado 🛒");
  actualizarCarrito();
}

// ===============================
// MOSTRAR CARRITO
// ===============================
function verCarrito(){
  document.getElementById("tienda").style.display="none";
  document.getElementById("carrito").style.display="block";
  actualizarCarrito();
}

// ===============================
// ACTUALIZAR LISTA CARRITO
// ===============================
function actualizarCarrito(){
  let lista = document.getElementById("listaCarrito");
  let totalTxt = document.getElementById("total");

  lista.innerHTML="";
  let total = 0;

  carrito.forEach((item, index)=>{
    total += item.precio;
    lista.innerHTML += `
      <li>
        ${item.nombre} - $${item.precio}
        <button onclick="eliminarProducto(${index})">❌</button>
      </li>
    `;
  });

  totalTxt.innerText = "Total: $" + total;
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================
function eliminarProducto(index){
  carrito.splice(index,1);
  actualizarCarrito();
}

// ===============================
// VOLVER A TIENDA
// ===============================
function volverTienda(){
  document.getElementById("carrito").style.display="none";
  document.getElementById("tienda").style.display="block";
}

// ===============================
// CONFIRMAR COMPRA
// ===============================
function confirmarCompra(){
  if(carrito.length==0){
    alert("Tu carrito está vacío 😢");
    return;
  }

  alert("Compra realizada con éxito 🎉");
  carrito = [];
  actualizarCarrito();
  volverTienda();
}

// ===============================
// CHAT FLOTANTE
// ===============================
function abrirChat(){
  document.getElementById("chat-ventana").style.display="flex";
}

function cerrarChat(){
  document.getElementById("chat-ventana").style.display="none";
}

function enviarMensaje(){
  let input = document.getElementById("chatInput");
  let msg = input.value;
  if(msg=="") return;

  let chat = document.getElementById("chat-mensajes");
  chat.innerHTML += "<p><b>Tú:</b> "+msg+"</p>";

  let respuesta="Te contactaremos pronto 😊";
  if(msg.toLowerCase().includes("precio")) respuesta="Los precios están en cada producto 🛍️";
  if(msg.toLowerCase().includes("envio")) respuesta="Envíos en 24h 🚚";
  if(msg.toLowerCase().includes("hola")) respuesta="Hola 👋 ¿En qué puedo ayudarte?";

  chat.innerHTML += "<p><b>Bot:</b> "+respuesta+"</p>";
  input.value="";
}
function volverTienda(){
  document.getElementById("carrito").style.display="none";
  document.getElementById("tienda").style.display="block";
}
function confirmarCompra(){
  if(carrito.length==0){
    alert("Tu carrito está vacío 😢");
    return;
  }

  alert("Compra realizada con éxito 🎉");

  carrito = [];
  actualizarCarrito();

  document.getElementById("carrito").style.display="none";
  document.getElementById("tienda").style.display="block";
}