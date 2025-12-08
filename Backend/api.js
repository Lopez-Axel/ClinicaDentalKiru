const express = require('express');
const cors = require('cors');
const app = express();

// Permitir todo (desarrollo)
// NOTA: en producción especifica el origen en lugar de '*'
app.use(cors({
    origin: 'http://localhost:9000',  
    credentials: true
})); 
// permite cualquier origen
app.use(express.json());

// Tus rutas
app.use('/pacientes', require('./routes/pacientes'));
app.use('/usuarios', require('./routes/usuarioRoutes'));
app.use('/anuncios', require('./routes/anuncioRoutes'));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`API corriendo en ${PORT}`));
