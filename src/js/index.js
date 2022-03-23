import { addCarrito, btnAccion } from "./carrito.js";

//Declaro las constantes necesarias para mostar las los productos:
const cards = document.getElementById("cards");
const items = document.getElementById("items");

//Declaro las constantes correspondientes a los HTMLTemplates:
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

//Capturo el click de cada item y ejecuto la función addCarrito():
if (cards) {
    cards.addEventListener("click", (e) => {
        addCarrito(e);
    });
}

//Capturo el click en los botones de Quitar/Agregar producto:
if (items) {
    items.addEventListener("click", (e) => {
        btnAccion(e);
    });
}

//Mostrar productos en la sección Libros:
function mostrarCards(data) {
    data.forEach((producto) => {
        //Asigno información de los productos al templateCard:
        templateCard.querySelector("img").setAttribute("src", producto.urlPortada);
        templateCard.querySelector("h6").textContent = producto.autorLibro;
        templateCard.querySelector("h4").textContent = producto.tituloLibro;
        templateCard.querySelector("p").textContent = producto.precioLibro;
        templateCard.querySelector("button").dataset.id = producto.codLibro;

        //Agrego los productos al template:
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    if (cards) {
        cards.appendChild(fragment);
    }
}

export { mostrarCards, fragment };
