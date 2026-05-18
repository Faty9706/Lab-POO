// ========= LOGIN =========
function login(){
  const usuario = document.getElementById("usuario")?.value;
  const password = document.getElementById("password")?.value;

  if(usuario === "admin" && password === "1234"){
    window.location = "dashboard.html";
    return;
  }

  if(usuario && password){
    window.location = "tienda.html";
    return;
  }

  alert("Ingresa usuario y contraseña");
}

// ========= PRODUCTOS =========
const productos = [
 {nombre:"Afinación",precio:900,img:"img/afinacion.jpg"},
 {nombre:"Amortiguadores",precio:2500,img:"img/amortiguadores.jpg"},
 {nombre:"Banda distribución",precio:3200,img:"img/banda.jpg"},
 {nombre:"Cambio aceite",precio:650,img:"img/aceite.jpg"},
 {nombre:"Suspensión",precio:2800,img:"img/suspension.jpg"},
 {nombre:"Luces",precio:250,img:"img/luces.jpg"},
 {nombre:"Frenos",precio:1500,img:"img/frenos.jpg" },
 {nombre:"Mtto Preventivo",precio:2000,img:"img/preventivo.jpg" },
 {nombre:"Limpiaparabrisas",precio:300,img:"img/limpiaparabrisas.jpg" },
 {nombre:"Batería",precio:3500,img:"img/bateria.jpg" }

];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ===== CARGAR TIENDA =====
const contenedorProductos = document.getElementById("productos");

if(contenedorProductos){
  productos.forEach((p,i)=>{
    contenedorProductos.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <button onclick="agregarCarrito(${i})">Agregar</button>
      </div>
    `;
  });
}

function agregarCarrito(i){
  carrito.push(productos[i]);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Servicio agregado al carrito 🛒");
}

// ========= CARRITO =========
const listaCarrito = document.getElementById("listaCarrito");
const totalHTML = document.getElementById("total");

if(listaCarrito){
  let total = 0;
  carrito.forEach(p=>{
    listaCarrito.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`;
    total += p.precio;
  });
  totalHTML.innerHTML = "Total: $" + total;
}

function confirmarCompra(){
  document.getElementById("datosCliente").style.display="block";
}

function finalizarCompra(){
  alert("Compra realizada 🚗, te estaremos contactando pronto");
  localStorage.removeItem("carrito");
  window.location="tienda.html";
}

// ========= ADMIN =========
function guardarOrden(){
  const orden={
    nombre:document.getElementById("nombreOrden").value,
    servicio:document.getElementById("servicioOrden").value,
    costo:document.getElementById("costoOrden").value,
    telefono:document.getElementById("telefonoOrden").value
  };

  let ordenes=JSON.parse(localStorage.getItem("ordenes"))||[];
  ordenes.push(orden);
  localStorage.setItem("ordenes",JSON.stringify(ordenes));
  alert("Orden guardada");
}

const listaOrdenes = document.getElementById("listaOrdenes");

if(listaOrdenes){
  let ordenes=JSON.parse(localStorage.getItem("ordenes"))||[];
  ordenes.forEach((o,i)=>{
    listaOrdenes.innerHTML += `
      <li>${o.nombre} - ${o.servicio} - $${o.costo}
      <button onclick="eliminarOrden(${i})">Eliminar</button></li>
    `;
  });
}

function eliminarOrden(i){
  let ordenes=JSON.parse(localStorage.getItem("ordenes"));
  ordenes.splice(i,1);
  localStorage.setItem("ordenes",JSON.stringify(ordenes));
  location.reload();
}

// ========= CHAT =========
function toggleChat(){
  const chat = document.getElementById("chatBox");
  chat.style.display = chat.style.display==="block"?"none":"block";
}

function enviarMensaje(){
  const input = document.getElementById("mensajeInput");
  const chat = document.getElementById("chatMensajes");

  const mensaje = input.value.toLowerCase();
  let respuesta="No entendí tu mensaje 😅";

  if(mensaje.includes("hola")) respuesta="Hola 👋 ¿En qué te ayudo?";
  else if(mensaje.includes("horario")) respuesta="Lunes a sábado 9am - 6pm";
  else if(mensaje.includes("precio")) respuesta="Los precios están en cada servicio 😉";
  else if(mensaje.includes("servicios")) respuesta="Tenemos afinación, suspensión, aceite y más 🔧";

  chat.innerHTML += `<p><b>Tú:</b> ${mensaje}</p>`;
  chat.innerHTML += `<p><b>Bot:</b> ${respuesta}</p>`;

  input.value="";
}