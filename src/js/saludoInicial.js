//Declaro un Array con los mensaje de bienvenida que se mostrarán de manera aleatoria:
let Saludos = ["¡Libros para programadores!", "¡Bienvenido a nuestra tienda!", "¡Gracias por elegir nuestra tienda!"];

let saludoInicialAleatorio = () => {
    //Obtengo un elemento del Array de manera aleatoria:
    var random = Math.floor(Math.random() * Saludos.length);
    var saludo = Saludos[random];

    //Agrego el saludo en la etiqueta H1 correspondiente del Index:
    let h1Saludo = document.getElementById("mensaje_saludo");
    h1Saludo.innerHTML = saludo;
};

//Ejecuto la función "saludoInicialAleatorio" al cargar el DOM:
if (Saludos) {
    window.addEventListener("DOMContentLoaded", saludoInicialAleatorio);
}
