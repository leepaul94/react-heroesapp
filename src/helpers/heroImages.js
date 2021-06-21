
export const heroImages = require.context('../assets/heroes', true ); // es del webpack con esto puedo extraer las imagenes poniendo el directorio y que se fije en los subdirectorios
// el directorio es relativo a donde se encuentre el archivo por eso es un poco diferente a cuando lo ecribi en HeroScreen o HeroCard