//Ejecuto la función "buscarporCodigo" al momento de ejecutar el evento submit del formulario correspondiente:
const formulario_busqueda = document.getElementById("formulario_busqueda");

if (formulario_busqueda) {
    formulario_busqueda.addEventListener("submit", buscarporCodigo);    
}
//Declaro la función "buscarporCodigo" que se encargará de realizar la búsqueda según el código ingresado:
function buscarporCodigo(e) {
    e.preventDefault();

    //Obtengo la cantidad de productos de la Base de datos y los almaceno en localStore (almacenados en la función fetchData()):
    let cantidadProductosBd = localStorage.getItem("cantidad_productos");

    let productosBdArray = JSON.parse(localStorage.getItem("productosBd"));
    console.log(productosBdArray);

    //Accedo al valor del input del formulario:
    //Utilizo dos veces "children" ya que el primero corresponde a una columna de Bootstrap, y el segundo al INPUT:
    let valor_input = e.target.children[0].children[0].value;

    //Realizo la validación del código ingresado por el usuario utilizando un OPERADOR TERNARIO:
    isNaN(valor_input) || valor_input > cantidadProductosBd || valor_input <= 0 ? resultadoBusquedaLibro(false) : resultadoBusquedaLibro(true);

    function resultadoBusquedaLibro(resultado) {
        if (resultado === false) {
            Swal.fire("¡Error!", "El código ingresado no pertenece a un libro ingresado al Stock o no es un código numérico");
        } else if (resultado === true) {
            //Declaro la variable "resultadoBusqueda" que almacenará el resultado del método filter en el Array productosBdArray[]:
            let resultadoBusqueda = productosBdArray.filter((x) => x.codLibro == valor_input);

            //Muestro el resultado de la búsqueda en una alerta:
            resultadoBusqueda.forEach((element) =>
                Swal.fire({
                    title: `Titulo: ${element.tituloLibro}`,
                    text: `Autor: ${element.autorLibro}`,
                    imageUrl: element.urlPortada,
                    imageWidth: 400,
                    imageHeight: 200,
                })
            );

            //Muestro el resultado de la búsqueda en consola:
        } else {
            Swal.fire("Ha ocurrido un error interno. Por favor intente mas tarde");
        }
    }
}
