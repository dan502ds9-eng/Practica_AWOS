import { buscarPelicula } from '../Servicio/omdbCliente.js';
import { buscarBiografiaActor } from '../Servicio/wikipediaCliente.js';

export async function obtenerInformacionCompleta(titulo) {
    // 1. Obtenemos los datos de la película desde OMDb
    const pelicula = await buscarPelicula(titulo);

    // 2. Extraemos el primer actor de la lista
    const listaActores = pelicula.actores || pelicula.Actors || "";
    const actorPrincipal = listaActores.split(',')[0].trim();

    // 3. Consultamos Wikipedia de forma totalmente segura
    const bioResultado = await buscarBiografiaActor(actorPrincipal);

    // 4. Retornamos el modelo unificado listo para la interfaz
    return {
        titulo: pelicula.titulo || pelicula.Title,
        anio: pelicula.anio || pelicula.Year,
        poster: pelicula.poster || pelicula.Poster,
        actores: listaActores,
        actorPrincipal: actorPrincipal,
        biografiaActor: bioResultado.biografia
    };
}