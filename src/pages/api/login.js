import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { nombre, telefono, direccion, rut, diagnostico, role } = req.body;

  // Validar que todos los datos estén presentes
  if (rut && nombre && telefono && direccion && diagnostico && role) {
    try {
      // Generar el token JWT con el rol dinámico
      const token = jwt.sign(
        { nombre, rut, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );

      // Devolver el token como respuesta
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error al generar el token JWT:', error); // Log para debugging
      return res.status(500).json({ message: 'Error al generar el token JWT' });
    }
  } else {
    return res.status(400).json({ message: 'Datos incompletos' });
  }
}
