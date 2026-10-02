export async function buscarBiografiaActor(actor) {
    try {
        if (!actor) {
            return { biografia: "Biografía no disponible." };
        }

        // ¡Sustitución! Ahora consultamos a DuckDuckGo en lugar de Wikipedia
        const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(actor)}&format=json&no_html=1`;
        
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            return { biografia: "Servicio de proveedor alternativo no disponible." };
        }

        const datos = await respuesta.json();
        
        // DuckDuckGo devuelve el resumen en una propiedad llamada "Abstract"
        if (!datos.Abstract) {
            return { biografia: "Biografía no encontrada en el nuevo proveedor." };
        }

        // Devolvemos la variable "biografia" igual que antes, para que el Orquestador no note el cambio
        return {
            biografia: datos.Abstract
        };

    } catch (error) {
        return { biografia: "Biografía no disponible por el momento." };
    }
}