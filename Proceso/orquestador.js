
import {buscarPelicula} from '../Servicio/omdbCliente.js';
import { buscarBiografia }from '../Servicio/wikipediaCliente.js';


/**
 * Orquesta la llamada a los servicios y encadena sus resultados
 * @param {string} tituloPelicula - Nombre de la película ingresado por el usuario
 */
    export async function obtenerInformacionCompleta(tituloPelicula) {

    //primer servicio(Pelicula
    const pelicula = await buscarPelicula(tituloPelicula);

    //segundo servicio(Actor devueltro por el primer servicio)
    try{
    if(pelicula.actorPrincipal && pelicula.actorPrincipal !== 'Desconocido'){ 
    const datosBio = await buscarBiografia(pelicula.actorPrincipal);
    }else{
    pelicula.biografiaActor = 'No se encontró información sobre el actor principal.';    
    }
    }catch(error){
    //Manejo de falla parcial: Si Wikipedia falla, la película no se rompe y se entrega el resto del resultado
    pelicula.biografiaActor = 'Biografia no disponible por el momento.';
    }
    return pelicula;
    }
    