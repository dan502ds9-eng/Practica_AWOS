
export async function buscarBiografiaActor(actor) {
    try {

const url = `https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${encodeURIComponent(nombreActor)}&format=json&origin=*`;
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`Servidor de Wikipedia no disponible (Código: ${respuesta.status})`);
    }

    const datos = await respuesta.json();
    const paginas = datos.query.pages;
    const pageId = Object.keys(paginas)[0];

    // Si pageId es "-1", Wikipedia no encontró el artículo
    if (pageId === "-1") {
      throw new Error(`No se encontró la biografía para: ${nombreActor}`);
    }

    // DESACOPLAMIENTO: Entregamos únicamente lo que la app necesita
    return {
      biografia: paginas[pageId].extract
    };

  } catch (error) {
    throw new Error(`[wikipediaCliente] ${error.message}`);
  }
}