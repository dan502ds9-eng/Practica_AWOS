export async function buscarBiografiaActor(actor) {
    try {
        if (!actor) {
            return { biografia: "Biografía no disponible por el momento." };
        }

        const url = `https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext=1&redirects=1&titles=${encodeURIComponent(actor)}&format=json&origin=*`;
        
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            return { biografia: "Biografía no disponible por el momento." };
        }

        const datos = await respuesta.json();
        
        if (!datos.query || !datos.query.pages) {
            return { biografia: "Biografía no disponible por el momento." };
        }

        const paginas = datos.query.pages;
        const pageId = Object.keys(paginas)[0];

        if (pageId === "-1" || !paginas[pageId].extract) {
            return { biografia: "Biografía no disponible por el momento." };
        }

        return {
            biografia: paginas[pageId].extract
        };

    } catch (error) {
        // Capturamos cualquier error internamente para que la búsqueda NUNCA se rompa
        return { biografia: "Biografía no disponible por el momento." };
    }
}