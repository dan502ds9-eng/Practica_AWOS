//acceso app.js
import { obtenerInformacionCompleta } from '/Proceso/orquestador.js';

const inputPelicula = document.getElementById("inputPelicula");
const btnBuscar = document.getElementById("btnBuscar");
const cargando = document.getElementById("cargando");
const mensajeError = document.getElementById("MensajeError");
const resultadoContenedor = document.getElementById("resultadoContenedor");


btnBuscar.addEventListener("click", async () => {
    const titulo = inputPelicula.value.trim();

    //Limpiamos los errores y los resultados previos

    mensajeError.style.display = 'none';
    mensajeError.textContent = '';

    resultadoContenedor.innerHTML = '';

    if(!titulo){
        mensajeError.textContent = "Favor de ingresar un título de película.";
        mensajeError.style.display = "block";
        return;
    }   
    // activamos el indicador de carga
    cargando.style.display = "block";
    
    try { 
        //invocamos al orquestador para obtener la información completa de la película
        const resultado = await obtenerInformacionCompleta(titulo);

        //pintamos el resultado en el contenedor de resultados
        resultadoContenedor.innerHTML = `
            <div>
            ${resultado.poster ? `<img src="${resultado.poster}" alt="Poster de la película">` : ""}
            <h3>${resultado.titulo} (${resultado.anio})</h3>
            <p><strong>Elenco Principal:</strong> ${resultado.actores}</p>
            <div class="limpiar"></div>
            <hr style="border: 0; border-top: 1px solid #eee; marging: 15px 0;">
            <h4>Biografía del Actor Principal(${resultado.actorPrincipal}):</h4>  
            <p>${resultado.biografiaActor}</p>
            </div>
        `;
    } catch (error) {
        //MOSTRAMOS MENSAJE DE ERROR AL USUARIO
        mensajeError.textContent = error.message;
        mensajeError.style.display = "block";
    } finally {
        //SE DESACTIVA EL INDICADOR DE CARGA EN CASO DE EXITO O ERROR
        cargando.style.display = "none";
    }
});

















