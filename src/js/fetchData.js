import { mostrarCards } from "./index.js";

//Realizo una petición Fetch para obtener todos los productos:
async function fetchData() {
    try {
        //Compruebo si estoy en la página de Inicio para no tener errores con la ruta en Fetch:
        let path = window.location.href
        let urlBd = path.includes('index') ? 'bd.json' : '../bd.json'

        const res = await fetch(urlBd);
        const data = await res.json();

        //Agrego los productos al DIV principal de la sección Libros:
        if (items) {
            mostrarCards(data);
        }

        //Obtengo la cantidad de productos de la BD y los almaceno en localStorage (siempre y cuando no se hayan almacenados previamente):
        let cantidadProductos = Object.keys(data).length;
        if (!localStorage.getItem("cantidad_productos")) {
            localStorage.setItem("cantidad_productos", cantidadProductos);
        }

        //Almaceno el resultado de la petición Fetch en localStorage (siempre y cuando no se hayan almacenados previamente) para poder utilizarlo en la función buscarporCodigo():
        if (!localStorage.getItem("productosBd")) {
            localStorage.setItem("productosBd", JSON.stringify(data));
        }
    } catch (error) {
        //Muestro una alerta que indica que ocurrió un error:
        Swal.fire({
            position: "top-end",
            toast: true,
            icon: "error",
            title: "Ocurrió un error en la conexión",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}

export { fetchData };
