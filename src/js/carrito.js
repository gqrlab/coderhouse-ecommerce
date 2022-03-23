import { fragment } from "./index.js";
import { fetchData } from "./fetchData.js";

//Variables correspondientes a los HTML Template:
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const footer = document.getElementById("footer");

//Obtengo el carrito del menú donde se mostrará la cantidad de total de productos:
let carritoIconoCantidad = document.getElementById("carrito-icono-cantidad");

//Declaro el objeto carrito para almacenar los productos correspondientes:
let carrito = {};

//Agregar producto al carrito:
function addCarrito(e) {
    //Compruebo si estoy haciendo click en el botón de "Agregar al carrito":
    if (e.target.classList.contains("agregar-carrito")) {
        //Utilizo parentelement para acceder a todo el Div del producto:
        setCarrito(e.target.parentElement);
    }

    //Evito que se ejecuten eventos adicionales:
    e.stopPropagation();

    //Muestro una alerta que indica que el producto se agregó al carrito:
    Swal.fire({
        position: "top-end",
        toast: true,
        icon: "success",
        title: "¡Producto agregado al carrito!",
        showConfirmButton: false,
        timer: 1500,
    });
}

//Actualizar carrito:
function setCarrito(objeto) {
    const producto = {
        codLibro: objeto.querySelector(".agregar-carrito").dataset.id,
        tituloLibro: objeto.querySelector("h4").textContent,
        autorLibro: objeto.querySelector("h6").textContent,
        precioLibro: objeto.querySelector("p").textContent,
        cantidad: 1,
    };

    //Verifico si el carrito ya cuenta con el producto agregado:
    if (carrito.hasOwnProperty(producto.codLibro)) {
        producto.cantidad = carrito[producto.codLibro].cantidad + 1;
    }

    carrito[producto.codLibro] = { ...producto };
    mostrarCarrito();
}

//Mostrar carrito:
function mostrarCarrito() {
    if (items) {
        items.innerHTML = "";
    }

    //Utilizo el método values() para poder hacer uso de foreach en el objeto carrito:
    Object.values(carrito).forEach((item) => {
        templateCarrito.querySelectorAll("td")[0].textContent = item.codLibro;
        templateCarrito.querySelectorAll("td")[1].textContent = item.tituloLibro;
        templateCarrito.querySelectorAll("td")[2].textContent = item.autorLibro;
        templateCarrito.querySelectorAll("td")[3].textContent = item.cantidad;

        templateCarrito.querySelector(".btn-info").dataset.id = item.codLibro;
        templateCarrito.querySelector(".btn-danger").dataset.id = item.codLibro;
        templateCarrito.querySelector("span").textContent = item.cantidad * item.precioLibro;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    });

    if (items) {
        items.appendChild(fragment);
    }
    mostrarFooter();

    //Cada vez que se ejecute la función mostrarCarrito() guardo en LocalStorage la información que se encuentre en el objeto carrito{}:
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Mostrar footer del carrito:
function mostrarFooter() {
    //Dejo el Footer sin contenido:
    footer.innerHTML = "";

    //Compruebo si el carrito está vacío:
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `No hay productos agregados al carrito`;
        return;
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precioLibro }) => acc + cantidad * (precioLibro * 1.24), 0);

    //Muestro la cantidad de productos en el ícono del carrito del menú:
    carritoIconoCantidad.innerHTML = nCantidad;

    //Muestro la información en el Template Footer:
    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = nPrecio + " (IVA inc.)";
    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    //Agrego la funcionalidad al botón VaciarCarrito:
    const btnVaciar = document.getElementById("vaciar-carrito");
    btnVaciar.addEventListener("click", () => {
        carrito = {};
        carritoIconoCantidad.innerHTML = 0;
        mostrarCarrito();
    });

    //Agrego la funcionalidad al botón Finalizar compra:
    let btnFinalizarCompra = document.getElementById("finalizar-compra");
    btnFinalizarCompra.addEventListener("click", () => {
        //Muestro alerta simulando la finalización de la compra y vacío el carrito:
        Swal.fire({
            title: "Mensaje de confirmación",
            text: "¿Deseas confirmar tu compra?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, confirmar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                Swal.fire("Compra confirmada", "¡Agradecemos su preferencia. Regresa pronto!.", "success");
            }
        });
    });
}

//Botones de Quitar/Agregar:
function btnAccion(e) {
    //Utilizo clases de los botones para comprobar en cual estoy haciendo click:
    //Aumento una unidad:
    if (e.target.classList.contains("btn-info")) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = { ...producto };

        mostrarCarrito();

        //Muestro una alerta que indica que se sumó una unidad del producto:
        Swal.fire({
            position: "top-end",
            toast: true,
            icon: "success",
            title: "Se sumó una unidad del producto",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    //Dismunuyo una unidad:
    if (e.target.classList.contains("btn-danger")) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;

        //Muestro una alerta que indica que se restó una unidad del producto:
        Swal.fire({
            position: "top-end",
            toast: true,
            icon: "success",
            title: "Se restó una unidad del producto",
            showConfirmButton: false,
            timer: 1500,
        });

        //Elimino el producto del carrito si su cantidad es cero y también restablezco el contador del ícono del menú:
        if (producto.cantidad === 0) {
            carritoIconoCantidad.innerHTML = 0;
            delete carrito[e.target.dataset.id];
        }
        mostrarCarrito();
    }

    //Evito que se ejecuten eventos adicionales:
    e.stopPropagation();
}

//Opción Mostrar/Ocultar (ícono del menú):
const verCarrito = document.getElementById("ver-carrito");
const tablaCarrito = document.getElementById("tabla-carrito");

if (verCarrito) {
    verCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        tablaCarrito.classList.toggle("d-none");
    });
}

//Realizo la petición Fetch al cargar el DOM:
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    //Utilizo LocalStorage para mantener la información del carrito al recargar o cerrar la página:
    if (localStorage.getItem("carrito")) {
        //Si ya existe información almacenada sobre el carrito, la almaceno en el objeto carrito[]:
        carrito = JSON.parse(localStorage.getItem("carrito"));

        mostrarCarrito();
    }
});

export { carrito, addCarrito, setCarrito, mostrarCarrito, mostrarFooter, btnAccion };
