const logger = (req, res, next) => {
    console.log(`Ruta consultada: ${req.path}`); // Registra la ruta consultada en la consola
    next(); // Llama a la siguiente función middleware
  };
  
  module.exports = logger; // Exporta el middleware para poder usarlo en app.js