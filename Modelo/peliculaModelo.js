//MODELO DATOS DE APP

export function crearPeliculaModelo({ titulo, anio, actores, actorPrincipal, poster, biografiaActor = '' }) {

    return {
        titulo: titulo || 'Sin titulo',
        anio: anio || 'N/A',
        actores: actores || 'Sin informacion',
        actorPrincipal: actorPrincipal || 'Desconocido',
        poster: poster !== 'N/A' ? poster : null,
        biografiaActor: biografiaActor
    };
    }
    