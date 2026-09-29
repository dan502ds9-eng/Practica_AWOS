
import { crearPeliculaModelo } from '../modelos/peliculaModelo.js';
const API_KEY = '523e799a';

export async function buscarPelicula(titulo) {
    try {

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${API_KEY}`;
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
        throw new Error(`Servidor OMDb no disponible (Código: ${respuesta.status})`);
    }
    
    const datos = await respuesta.json();

    if (datos.Response === 'False') {
    throw new Error("No se encontro esta pelicula con este titulo");   
    }

   const actorPrincipal = datos.Actors ? datos.Actors.split(',')[0].trim() : 'Desconocido';

    return crearPeliculaModelo({
        titulo: datos.Title,
        anio: datos.Year,
        actores: datos.Actors,  
        actorPrincipal: actorPrincipal,
        poster: datos.Poster
    });

} catch (error) {
    throw new Error(`[omdbCliente] ${error.message}`);
}
}

    
